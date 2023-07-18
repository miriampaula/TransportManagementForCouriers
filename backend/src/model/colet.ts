import * as Koa from "koa";
import { sql } from "./../sql";

export async function getColet(ctx: Koa.Context) {
  let { idDosar } = ctx.request.query;
  let query = `select c.* from dbo.DosarTransport as d 
  join dbo.DosarTransport_Facturi as f on d.Id = f.IdDosarTransport and d.Id = @idDosar
  join dbo.DosarTransport_Colete as c on f.IdFactura = c.IdFactura`;
  let { recordset } = await sql(query, { idDosar } as any);
  ctx.body = recordset;
}


export async function updateColet(ctx: Koa.Context) {
  let { idColet } = ctx.request.body;
  const query = `
    UPDATE dbo.DosarTransport_Colete
    SET ScanatIncarcare = GETDATE()
    WHERE IdColet = @idColet;
  `;
  await sql(query, { idColet } as any);
  
  // Return the updated colet data by calling the getColet function
  const updatedColet = await getColet(ctx);
  return updatedColet;
}
