import { sql } from "../src/sql";

export async function getStatus(ctx){
    ctx.body = await sql("select * from dbo.Status");
}
export async function putStatus(ctx){
    const {nume, TipStatus, StatusDesign} = ctx.request.body;
    if(!nume) 
        return ctx.throw(400, "Coloana <nume> este obligatorie pentru tablea <status>");
    if(!TipStatus) 
        return ctx.throw(400, "Coloana <TipStatus> este obligatorie pentru tablea <status>");
    if(!StatusDesign) 
        return ctx.throw(400, "Coloana <StatusDesign> este obligatorie pentru tablea <status>");
    ctx.body = await sql("insert into dbo.Status(nume, TipStatus, StatusDesign) values(@nume, @TipStatus, @StatusDesign)");
}
export async function deleteStatus(ctx){
    const {nume, TipStatus, StatusDesign} = ctx.request.body;
    if(nume) 
        return ctx.throw(400, "Coloana <nume> a fost stearsa");
    if(TipStatus) 
        return ctx.throw(400, "Coloana <TipStatus> a fost stearsa");
    if(StatusDesign) 
        return ctx.throw(400, "Coloana <StatusDesign> a fost stearsa");
    ctx.body = await sql("delete from dbo.Status where nume = '@nume', TipStatus = '@TipStatus', StatusDesign = '@StatusDesign'");
}