import * as Koa from "koa";
import { sql } from "./../sql";


export async function getFacturiDosar(ctx: Koa.Context) {
    let { idDosar, codbare } = ctx.request.query;
    ctx.body = await getFacturiDosarResponse({ idDosar, codbare });
}

async function getFacturiDosarResponse({ idDosar, codbare }) {
    console.log({ idDosar, codbare });
    let query = `
        select * from DosarTransport where id = @idDosar;
        select IdFactura, Valoare_ROL as Valoare, CONCAT(note.Serie_Document_Primar, note.Numar_Document_Primar) as SerieNumar 
        from DosarTransport_Facturi df 
        JOIN C_H_Note_Contabile note ON df.IdFactura = note.H_Id
            and IdDosarTransport = @idDosar;
            
        select IdColet, IdFactura, ct.Explicatii as Colet, ct.DenumireArticol as Articol from DosarTransport_Colete dc
        join extensions.CT_ColeteDocument ct ON dc.IdColet = ct.Id
        WHERE IdFactura
        IN (SELECT IdFactura FROM DosarTransport_Facturi WHERE IdDosarTransport = @idDosar);        
    `;
    let params: any = { idDosar, codbare };
    let { recordsets } = await sql(query, params);
    return recordsets;
}

export async function putFacturiDosar(ctx: Koa.Context) {
    let { idDosar, codbare } = ctx.request.body;
    codbare = codbare.toString().replace('FC', '');
    console.log('putFacturiDosar', ctx.request.body);
    if (!idDosar) {
        return ctx.throw(400, `ID-ul de dosar este obligatoriu !`);
    }
    if (!codbare) {
        return ctx.throw(400, `Valoarea pentru <codbare> este obligatorie !`);
    }

    let { recordset: [dosarExista] } = await sql('select * from DosarTransport where ID = @idDosar', { idDosar });
    if (!dosarExista) {
        return ctx.throw(400, `Dosarul cu ID-ul <${idDosar}> nu exista în baza de date !`);
    }
    let { recordset: [factura] } = await sql('select * from C_H_Note_Contabile where h_id = @codbare', { codbare });
    if (!factura) {
        return ctx.throw(400, `Factura cu ID-ul <${codbare}> nu exista în baza de date !`);
    }
    let { recordset: [dosar] } = await sql('select * from DosarTransport_Facturi where IDFactura = @codbare AND IdDosarTransport != @idDosar', { codbare, idDosar });
    if (dosar) {
        return ctx.throw(400, `Factura cu ID-ul <${codbare}> a fost atasată unui alt dosar !`);
    }

    let params = { codbare, idDosar };

    let { recordset: [facturaAdaugataDeja] } = await sql('select * from DosarTransport_Facturi where IDFactura = @codbare AND IdDosarTransport = @idDosar', { codbare, idDosar });
    if (facturaAdaugataDeja) {
        return ctx.body = await getFacturiDosarResponse(params);
    }

    let query = `
    insert into DosarTransport_Facturi(IdDosarTransport, IdFactura) 
        values (@IdDosar, @codbare);
    insert into DosarTransport_Colete(IdColet, IdFactura)
        SELECT c.Id, @codbare 
        from C_D_Note_Contabile n
        JOIN extensions.CT_ColeteDocument c ON n.D_Id = c.IdDetaliu AND n.H_Id = @codbare 
    `
    await sql(query, params);
    ctx.body = await getFacturiDosarResponse(params);
}



