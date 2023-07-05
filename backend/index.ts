require("dotenv").config();
import { mkdir, stat } from "fs/promises";
import * as Koa from "koa";
import * as serve from "koa-static";
import { index, router } from "./src/router";
import * as cors from '@koa/cors';

process.env["PORT"] = process.env["PORT"] || "80";

process.chdir(__dirname);

// create folder upload if not exists
(async () => {
  if (!(await stat(`../upload`).catch(() => false))) await mkdir(`../upload`);
})();

const app = new Koa({ proxy: true });

app
  .use(cors())
  .use(serve(`../frontend/build`))
  .use(serve(`../upload`))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(index)
  .listen(process.env["PORT"], () =>
    console.log(`http://localhost:${process.env["PORT"]}`)
  );
