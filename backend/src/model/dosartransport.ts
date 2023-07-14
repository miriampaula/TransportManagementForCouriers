import * as Koa from "koa";
import { sql } from "./../sql";

export async function getDosar(ctx: Koa.Context) {
  let query = "select * from dbo.DosarTransport";
  let params: any = { id: undefined };
  if (ctx.request.query.id) {
    query += " where id = @id";
    params.id = ctx.request.query.id;
  }
  let { recordset } = await sql(query, params);
  ctx.body = recordset;
}

export async function putDosar(ctx: Koa.Context) {
  const { nume, descriere, paletare, qr, creatDe, creatLa, sofer, auto, scanatIncarcare } = ctx.request.body;
  if (!nume) {
    return ctx.throw(400, "Coloana <nume> este obligatorie pentru tabela <DosarTransport>!");
  }
  if (!descriere) {
    return ctx.throw(400, "Coloana <descriere> este obligatorie pentru tabela <DosarTransport>!");
  }
//   if (!paletare) {
//     return ctx.throw(400, "Coloana <paletare> este obligatorie pentru tabela <DosarTransport>!");
//   }
  if (!qr) {
    return ctx.throw(400, "Coloana <qr> este obligatorie pentru tabela <DosarTransport>!");
  }
  if (!creatDe) {
    return ctx.throw(400, "Coloana <creatDe> este obligatorie pentru tabela <DosarTransport>!");
  }
//   if (!creatLa) {
//     return ctx.throw(400, "Coloana <creatLa> este obligatorie pentru tabela <DosarTransport>!");
//   }
  if (!sofer) {
    return ctx.throw(400, "Coloana <sofer> este obligatorie pentru tabela <DosarTransport>!");
  }
//   if (!auto) {
//     return ctx.throw(400, "Coloana <auto> este obligatorie pentru tabela <DosarTransport>!");
//   }
//   if (!scanatIncarcare) {
//     return ctx.throw(400, "Coloana <scanatIncarcare> este obligatorie pentru tabela <DosarTransport>!");
//   }
  
  await sql(
    "insert into dbo.DosarTransport(Nume, Descriere, Paletare, QR, CreatDe, CreatLa, Sofer, Auto, ScanatIncarcare) values(@nume, @descriere, @paletare, @qr, @creatDe, @creatLa, @sofer, @auto, @scanatIncarcare)",
    ctx.request.body
  );
  await getDosar(ctx);
}

export async function deletedosar(ctx: Koa.Context) {
    let id = ctx.request.query.id;
    if (Array.isArray(id)) {
      id = id[0]; // Accesează prima valoare din array
    }
    await sql(`delete from dbo.DosarTransport where id = @id`, { id });
    await getDosar(ctx);
  }
  

export async function updateDosar(ctx: Koa.Context) {
  let { id } = ctx.request.body;
  id = id || ctx.request.query.id;
  if (!id) {
    return ctx.throw(400, "Coloana <id> este obligatorie pentru update!");
  }
  let { recordset: [idExists] } = await sql('select id from dbo.DosarTransport where id = @id', { id });

  if (!idExists) {
    return ctx.throw(400, `Id-ul ${id} nu există în tabela DosarTransport!`);
  }

  let columns = Object.keys(ctx.request.body).filter(e => e !== 'id');

  columns = columns.map(e => `${e} = @${e}`);

  console.log({ columns });

  let query = `update dbo.DosarTransport 
               set ${columns.join(',\n')} 
               where id = @id`;
  await sql(query, { ...ctx.request.body, id });
  await getDosar(ctx);
}
