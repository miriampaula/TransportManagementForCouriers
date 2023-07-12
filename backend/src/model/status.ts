// import * as Koa from "koa";
import { sql } from "./../sql";

export async function getStatus(ctx) {
    const { recordset } = await sql("select * from dbo.Status");
    ctx.body = recordset;
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
    await sql("insert into dbo.Status(Nume, TipStatus, StatusDesign) values(@nume, @tipStatus, @statusDesign)", ctx.request.body);
    await getStatus(ctx);
}

export async function deleteStatus(ctx) {
    const { id } = ctx.request.query;
    await sql(`delete from status where id=@id`, { id });
    await getStatus(ctx);
}

export async function updateStatus(ctx) {
    let { Id } = ctx.request.body;
    if (!Id) {
        return ctx.throw(400, "Coloana <id> este obligatorie pentru update !");
    }
    let { recordset: [idExists] } = await sql('select id from status where id=@id', { id: Id });

    if (!idExists) {
        return ctx.throw(400, `Id-ul ${Id} nu exista in tabela status!`);
    }

    let columns = Object.keys(ctx.request.body).filter(e => e !== 'Id');

    columns = columns.map(e => `${e} = @${e}`);
    
    console.log({ columns });

    let query = `update  dbo.Status 
                        set ${columns.join(',\n')} 
                where id = @id`
    await sql(query, ctx.request.body);
    await getStatus(ctx);
}







