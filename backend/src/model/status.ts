import * as Koa from "koa";

import { sql } from "./../sql";

export async function getStatus(ctx: Koa.Context) {
  ctx.body = await sql("select * from dbo.Status");
}

export async function putStatus(ctx: Koa.Context) {
  const { nume, tipStatus, statusDesign } = ctx.request.body;

  if (!nume) {
    return ctx.throw(
      400,
      "Proprietatea <nume> este obligatorie pentru tabela <status>"
    );
  } else if (typeof nume !== "string")
    return ctx.throw(400, "Proprietatea <nume> trebuie sa fie de tip text");
  if (!tipStatus) {
    return ctx.throw(
      400,
      "Proprietatea <tipStatus> este obligatorie pentru tabela <status>"
    );
  } else if (typeof nume !== "string")
    return ctx.throw(400, "Proprietatea <nume> trebuie sa fie de tip text");
  if (!statusDesign) {
    return ctx.throw(
      400,
      "Proprietatea <statusDesign> este obligatorie pentru tabela <status>"
    );
  } else if (typeof nume !== "string")
    return ctx.throw(400, "Proprietatea <nume> trebuie sa fie de tip text");
  ctx.body = await sql(
    "insert into dbo.Status(nume, TipStatus, StatusDesign) values (@nume, @tipStatus, @statusDesign)",
    ctx.request.body
  );
}
