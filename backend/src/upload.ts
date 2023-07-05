import * as Koa from 'koa';
import * as fs from 'fs';
import { join } from 'path';
import { sql, __ctx } from './sql';

export async function deleteUploadedFile(ctx: Koa.Context) {
    // console.log({ file: ctx.request.query.path });
    let { path } = ctx.request.query;
    fs.promises.unlink(<string>path).catch(console.error);
    ctx.body = { status: 'OK' }
}

export async function upload(ctx: Koa.Context) {
    // console.log({ files: ctx.request.files });
    if (ctx.request.files.people) return await uploadSupport(ctx);
    else if (ctx.request.files.support) return await uploadSupport(ctx);
}

export async function download(ctx: Koa.Context) {
    try {
        let { name, path } = ctx.query;
        if (name.length - name.lastIndexOf('.') !== path.length - path.lastIndexOf('.')) {
            // adaug extensia la nume dacă aceasta nu există
            name += path.toString().substring(path.lastIndexOf('.'));
        }
        ctx.set('Content-disposition', `attachment; filename=${name}`);
        ctx.set('Content-type', "multipart/x-zip");
        ctx.body = fs.createReadStream(join(process.cwd(), <string>path));
    } catch (err) {
        console.log(`#ERROR upload.ts -> download\n ${err.message}`);
    }
}

export async function preview(ctx: Koa.Context) {
    let { name, path } = ctx.query;
    ctx.set(`Content-Disposition`, `inline; filename=${name}.pdf`);
    ctx.set('Content-type', "application/pdf");
    ctx.body = fs.createReadStream(join(process.cwd(), <string>path));
}

async function uploadSupport(ctx: Koa.Context) {
    try {
        let files = ctx.request.files.support;
        files = Array.isArray(files) ? files : [files];
        ctx.body = { files };
    } catch (err) {
        console.log(`#ERROR upload.ts -> uploadSupport ${err.message}`)
        await ctx.render('error', { message: err.message })
    }
}
