"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const promises_1 = require("fs/promises");
const Koa = require("koa");
const serve = require("koa-static");
const router_1 = require("./src/router");
const cors = require("@koa/cors");
process.env["PORT"] = process.env["PORT"] || "80";
process.chdir(__dirname);
// create folder upload if not exists
(async () => {
    if (!(await (0, promises_1.stat)(`../upload`).catch(() => false)))
        await (0, promises_1.mkdir)(`../upload`);
})();
const app = new Koa({ proxy: true });
app
    .use(cors())
    .use(serve(`../frontend/build`))
    .use(serve(`../upload`))
    .use(router_1.router.routes())
    .use(router_1.router.allowedMethods())
    .use(router_1.index)
    .listen(process.env["PORT"], () => console.log(`http://localhost:${process.env["PORT"]}`));
