import { createReadStream } from "fs";
import * as Router from "@koa/router";
import * as Koa from "koa";
import { HttpMethodEnum, koaBody } from "koa-body";
import { deleteEntity, query, saveEntity } from "./sql";
import { deleteUploadedFile, download, preview, upload } from "./upload";
import {
  decode,
  loginUser,
  passwordRecover,
  registerUser,
  passwordReset,
  logoutUser,
  validateToken,
} from "./user";
import { deleteStatus, getStatus, updateStatus } from "./model/status";
import { putStatus } from "./model/status";
import {
  deletedosar,
  getDosar,
  putDosar,
  updateDosar,
} from "./model/dosartransport";
import { getFacturiDosar, putFacturiDosar } from "./model/facturi";
import { getColet, updateColet } from "./model/colet";

const bodyParser = koaBody({
  jsonLimit: 50 * 1024 * 1025,
  formLimit: 50 * 1024 * 1025,
});

const multipartBody = koaBody({
  multipart: true,
  parsedMethods: [
    HttpMethodEnum.POST,
    HttpMethodEnum.PUT,
    HttpMethodEnum.PATCH,
    HttpMethodEnum.DELETE,
  ],
  formidable: {
    multiples: true,
    uploadDir: "./../upload",
    keepExtensions: true,
  },
});

const router = new Router({ prefix: "/api" });

router
  .get("/data/status", getStatus)
  .put("/data/status", bodyParser, putStatus)
  .post("/data/status", bodyParser, updateStatus)
  .delete("/data/status", bodyParser, deleteStatus)

  .get("/data/facturidosar", getFacturiDosar)
  .put("/data/facturidosar", bodyParser, putFacturiDosar)

  .get("/data/dosartransport", getDosar)
  .get("/data/colet", getColet)
  .put("/data/colet",bodyParser, updateColet)

  .put("/data/dosartransport", bodyParser, putDosar)
  .post("/data/dosartransport", bodyParser, updateDosar)
  .delete("/data/dosartransport", bodyParser, deletedosar)

  .post("/loginUser", bodyParser, loginUser)
  .get("/logoutUser", logoutUser)
  .post("/registerUser", bodyParser, registerUser)
  .post("/validateToken", bodyParser, validateToken)
  .post("/passwordRecover", bodyParser, passwordRecover)
  .post("/passwordReset", bodyParser, passwordReset)
  .delete("/entity", decode, deleteEntity)
  .post("/entity", decode, bodyParser, saveEntity)
  .post("/query", bodyParser, query)
  .delete("/upload", decode, deleteUploadedFile)
  .post("/upload/:idWork", decode, multipartBody, upload)
  .post("/upload", decode, multipartBody, upload)
  .get("/preview", decode, preview)
  .get("/download", decode, download);

let index = (ctx: Koa.Context) => {
  ctx.type = "html";
  ctx.body = createReadStream(`../frontend/public/index.html`);
};

export { router, index };
