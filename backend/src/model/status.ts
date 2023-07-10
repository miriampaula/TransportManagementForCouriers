// import * as Koa from "koa";
import { sql } from "./../sql";

export async function getStatus(ctx) {
    ctx.body = await sql("select * from dbo.Status");
}

export async function putStatus(ctx) {
    const { nume, tipStatus, statusDesign } = ctx.request.body;
    if (!nume) {
        return ctx.throw(400, "Coloana <nume> este obligatorie pentru tabela <status>!");
    }
    if (!tipStatus) {
        return ctx.throw(400, "Coloana <tipStatus> este obligatorie pentru tabela <status>!");
    }
    if (!statusDesign) {
        return ctx.throw(400, "Coloana <statusDesign> este obligatorie pentru tabela <status>!");
    }
    ctx.body = await sql("insert into dbo.Status(nume, TipStatus, StatusDesign) values(@nume, @tipStatus, @statusDesign)", ctx.request.body);
}