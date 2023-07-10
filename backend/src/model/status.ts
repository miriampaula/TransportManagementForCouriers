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

export async function deleteStatus(ctx) {
    const { id } = ctx.params;
    if (!id) {
        return ctx.throw(400, "ID-ul este obligatoriu pentru ștergerea unui status!");
    }
    ctx.body = await sql("delete from dbo.Status where id = @id", { id });
}

export async function updateStatus(ctx) {
    const { id } = ctx.params;
    const { nume, tipStatus, statusDesign } = ctx.request.body;
  
    if (!id) {
      ctx.throw(400, "ID-ul este obligatoriu pentru actualizarea unui status!");
    }
  
    if (!nume && !tipStatus && !statusDesign) {
      ctx.throw(
        400,
        "Cel puțin una dintre coloanele <nume>, <tipStatus>, <statusDesign> trebuie completată pentru actualizarea unui status!"
      );
    }
  
    let updates: any = {};
  
    if (nume) {
      updates.nume = nume;
    }
  
    if (tipStatus) {
      updates.tipStatus = tipStatus;
    }
  
    if (statusDesign) {
      updates.statusDesign = statusDesign;
    }
  
    const query = `
      UPDATE dbo.Status
      SET ${Object.keys(updates)
        .map((key) => `${key} = @${key}`)
        .join(", ")}
      WHERE id = @id
    `;
  
    const params = {
      id,
      ...updates,
    };
  
    ctx.body = await sql(query, params);
  }
  
