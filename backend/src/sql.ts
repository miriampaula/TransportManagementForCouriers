import * as mssql from 'mssql';
import * as dayjs from "dayjs";
import { } from "dayjs/locale/ro"; // set locale to ro
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import * as Koa from 'koa';
import config from './config';
import * as queries from './query';

export const __ctx = (ctx: Koa.Context | string) => `DECLARE @__ctx varchar(128) = '${typeof ctx == 'string' ? ctx : ctx.cookies?.get("email")}'; DECLARE @ctx varbinary(128) = CAST(@__ctx+';' AS varbinary(128)); SET CONTEXT_INFO @ctx;\n`

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ro");

const pool = new mssql.ConnectionPool(config.sql);
pool.connect().catch(console.error);

const sqlUpdatePrep = (table: string, params: SqlParams) => {
    let sqlcmd = `UPDATE ${table} SET `;
    for (let p in params) {
        if (~['Id', 'id', 'code', 'Code'].indexOf(p)) continue;
        sqlcmd += `\n\t"${p}"=@${p},`;
    }
    return sqlcmd.substr(0, sqlcmd.length - 1) + `\n WHERE Id=@Id; select * from ${table} WHERE Id=@Id`;
}
const sqlInsertPrep = (table: string, params: SqlParams) => {
    let sqlcmd = '';
    for (let p in params) {
        if (~['Id', 'id', 'code', 'Code'].indexOf(p)) continue;
        sqlcmd += `, ${p}`;
    }
    return `
    INSERT INTO ${table}(${sqlcmd.split(', ').filter(c => c).map(c => `"${c}"`)}) 
    VALUES (${sqlcmd.replace(/, /g, ', @').substr(2)})
    select * from ${table} where id = scope_identity()
    `;
}

// function sqlFormat(name) { return "[" + name.replace('.', '].[') + "]"; }
// function sqlValue(val) {
//     if (val && val.match && val.match(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ/)) {
//         //return "'" + moment(moment(val).toDate()).format('YYYY-MM-DDTHH:mm:ss') + "'";
//         return `'${dayjs(val).tz('Europe/Bucharest').format('YYYY-MM-DDTHH:mm:ss')}'`;
//     }
//     return "N'" + val + "'";
// }

/**
 * Ruleaza comanda sqlcmd și întorce rezultatul
 * @param sqlcmd comanda sql poate contine parametrii in formatul `@numeParam`
 * @param params valoarea parametrilor object key/value pair ( ex: {id: 1, nume: 'test'} ) 
 * @param levelPool nivelul de acces la baza de date 'read' | 'write' | 'backup'
 */
export async function sql(sqlcmd: string, params?: SqlParams) {
    try {
        const request = await (await pool.connect()).request();
        for (const param in params) {
            let val = params[param];
            // all data will be in UTC
            // if (typeof val === 'string' && val.length <= 25 && val.match(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ/)) {
            //     val = dayjs(val).tz('Europe/Bucharest').format('YYYY-MM-DDTHH:mm:ss');
            // }
            request.input(param, val);
        }
        sqlcmd = (~sqlcmd.indexOf('DECLARE @__ctx')) ? sqlcmd : `${__ctx("CyberTM@sevice.online")}\n ${sqlcmd}`;
        return await request.query(sqlcmd);
    } catch (e) {
        console.error({ sqlError: e.message || e, sqlcmd, params });
        throw e;
    }
}

export async function query(ctx: Koa.Context) {
    let { query, params } = ctx.request.body;
    query = `${__ctx(ctx)} ${queries[query]}`;
    try {
        let { recordset } = await sql(query, params);
        ctx.body = recordset;
        ctx.type = 'application/json;charset=UTF-8';
    } catch (e) {
        console.error({ query, body: ctx.request.body }, e);
        ctx.throw(400, e);
    }
}


/**
 * Delete row from table: {table: string, params: KeyPair<colName, sqlValue>}
 * @param ctx
 */
export async function deleteEntity(ctx: Koa.Context) {
    console.log({ delete: ctx.request.query });
    let { table, id } = ctx.request.query;
    let sqlcmd = `delete from ${table} where id = @id`;

    // if (typeof data === 'string') data = JSON.parse(data);
    // if (typeof data.params === 'string') data.params = JSON.parse(data.params);

    if (!table) return ctx.throw(400, 'param <table> is missing!');
    if (!id) return ctx.throw(400, 'param <id> is missing!');
    ctx.body = await sql(`${__ctx(ctx)} ${sqlcmd}`, { id: id.toString() });
}

/**
 * Salvare JSON bundle, format body: {table: string, params: KeyPair<colName, sqlValue>}
 * @param ctx
 */
export async function saveEntity(ctx: Koa.Context) {
    let { table, params } = ctx.request.body;
    let sqlcmd = '';
    // if (typeof data === 'string') data = JSON.parse(data);
    // if (typeof data.params === 'string') data.params = JSON.parse(data.params);
    if (params.sessionsUnused) delete params.sessionsUnused;
    if (!table) return ctx.throw(400, 'param <table> is missing!');
    if (params.id || params.Id) {
        sqlcmd = sqlUpdatePrep(table, params);
    } else {
        sqlcmd = sqlInsertPrep(table, params);
    }
    const { recordset } = (await sql(`${__ctx(ctx)} ${sqlcmd}`, params));
    ctx.body = recordset;
    ctx.type = 'application/json;charset=UTF-8';
}

type SqlParams = { [key: string]: number | string | Date }