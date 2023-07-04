import * as fs from 'fs';
import * as queries from './index';

let excluded = ['cybertrainer', '__ctx', 'tbNew'];
let fileDef = `
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class SqlService {
  public isBusy: Subject<boolean> = new Subject<boolean>();
  private count = 0;
  private get queue() { return this.count; }
  private set queue(count) {
    if (count + this.count === 1) setTimeout(() => this.isBusy.next(!!count));
    this.count = count;
  }
  
  constructor(private http: HttpClient, private router: Router, private app: AppService) { }
  
  error(next: (reason: any) => void, e: HttpErrorResponse) {
    this.queue--;
    if (e.status === 401) {
      if (!~this.router.url.indexOf('user-login')) {
        alert('Your session has expired, please reconnect !');
        this.router.navigate([\`/user-login/\${encodeURIComponent(this.router.url)}\`]);
      }
    } else {
      // toast error message
      // this.app.toast.next({ icon: "error", title: "Database error", body: e.error });
      alert(e.error);
    }
    next(e); // pass error to the next error handler
  }
  
  deleteEntity(table: string, id: string | number) {
    this.queue++;
    return new Promise((next, reject) => {
      let error = this.error.bind(this, reject);
      let complete = () => this.queue--;
      this.http.delete("/api/entity",
        {
          params: { table, id }
        }
      ).subscribe(
        {
          next,
          error,
          complete
        }
      );
    });
  }
  
  saveEntity(table: string, params: { [key: string]: string | number | Date | boolean | undefined | null }) {
    this.queue++;
    return new Promise((next, reject) => {
      let error = this.error.bind(this, reject);
      let complete = () => this.queue--;
      this.http.post("/api/entity",
        {
          table,
          params
        }
      ).subscribe(
        {
          next,
          error,
          complete
        }
      );
    });
  }
  `;

let queryDef =
  `@query(@params) {
    this.queue++;
    return new Promise((next, reject) => {
      let error = this.error.bind(this, reject);
      let complete = () => this.queue--;
      this.http.post("api/query",
        {
          query: "@query",
          params: params
        }
      ).subscribe(
        {
          next,
          error,
          complete
        }
      );
    });
  }
  `;

(function () {
  for (var q in queries) {
    if (queries.hasOwnProperty(q) && typeof queries[q] === 'string') {
      console.log(`\t${q}`);
      var params = '';
      let str = queryDef
        .replace('@query', q)
        .replace('@query', q);
      q = queries[q].replace(/@tb/g, '$tb'); // declare @tb... table ...
      while (~q.indexOf('@')) {
        q = q.substr(q.indexOf('@'));
        for (let i = 2; i <= q.length; i++) {
          if (~q.substring(i, i + 3).indexOf('=') && ~q.substring(i, i + 5).indexOf('@')) {
            q = q.substr(i + 1); // la proceduri stocate parametrii pot 
            break;               // să fie de forma @id = @id
          }
          if (i === q.length || !q[i].match(/^[0-9a-zA-Z_]+$/)) {
            let param = q.substr(1, i - 1);
            if (!~excluded.indexOf(param) && !~params.indexOf(`, ${param}:`)) {
              if (param == 'idSession') param = 'idSession?';
              params += `, ${param}: string | number | Date | boolean | undefined | null`;// + (param.startsWith('id') ? 'number' : 'string | number');
            }
            q = q.substr(i + 1);
            break;
          }
        }
      }
      if (params) {
        params = `params: { ${params.substr(2)} }`; //paramList.replace(/;/g, '')
      } else {
        str = str.replace('params: params', 'params: {}')
      }
      fileDef += str
        .replace('@params', params)
    }
  }
})();

fs.writeFileSync('src/app/sql.service.ts', fileDef.substr(0, fileDef.length - 1) + '\n}', 'utf-8');
