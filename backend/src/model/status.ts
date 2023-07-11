// import * as Koa from "koa";
import { sql } from "./../sql";

export async function getStatus(ctx) {
    console.log("getStatus");
    ctx.body = await sql("select * from dbo.Status");
}

export async function putStatus(ctx) {
    const { nume, tipStatus, statusDesign } = ctx.request.body;
    if (!nume) {
        return ctx.throw(400, "Coloana <nume> este obligatorie pentru tabela <status>!");
    } else if (typeof nume !== "string") {
        return ctx.throw(400, "Coloana <nume> pentru tabela <status> trebuie sa contina type string!");
    }
    if (!tipStatus) {
        return ctx.throw(400, "Coloana <tipStatus> este obligatorie pentru tabela <status>!");
    } else if (typeof tipStatus !== "string") {
        return ctx.throw(400, "Coloana <tipStatus> pentru tabela <status> trebuie sa contina type string!");
    }

    if (!statusDesign) {
        return ctx.throw(400, "Coloana <statusDesign> este obligatorie pentru tabela <status>!");
    } else if (typeof statusDesign !== "string") {
        return ctx.throw(400, "Coloana <statusDesign> pentru tabela <status> trebuie sa contina type string!");
    }
    ctx.body = await sql("insert into dbo.Status(nume, TipStatus, StatusDesign) values(@nume, @tipStatus, @statusDesign)", ctx.request.body);
}


export async function postStatus(ctx) {
    const { nume, tipStatus, statusDesign } = ctx.request.body;

    if (nume) {
        if (typeof nume !== "string") {
            return ctx.throw(400, "Coloana <nume> pentru tabela <status> trebuie sa contina type string!");
        } else {
            ctx.body = await sql("update dbo.Status set nume = @nume,", ctx.request.body);
        }

    }
    if (tipStatus) {
        if (typeof tipStatus !== "string") {
            return ctx.throw(400, "Coloana <tipStatus> pentru tabela <status> trebuie sa contina type string!");
        } else {
            ctx.body = await sql("update dbo.Status set TipStatus = @tipStatus,", ctx.request.body);
        }
    }
    if (statusDesign) {
        if (typeof statusDesign !== "string") {
            return ctx.throw(400, "Coloana <statusDesign> pentru tabela <status> trebuie sa contina type string!");
        } else {
            ctx.body = await sql("update dbo.Status set StatusDesign = @statusDesign,", ctx.request.body);
        }
    }
}


export async function deleteStatus(ctx) {
    const { id } = ctx.request.body;

    ctx.body = await sql("delete from dbo.Status where Id = @id)", ctx.request.body);

}