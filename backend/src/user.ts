import * as Koa from "koa";
import * as jwt from "jsonwebtoken";
import { sql } from "./sql";
import {
  loginUserQuery,
  passwordRecoverQuery,
  registerUserQuery,
  validateTokenQuery,
} from "./query";
import sendMail from "./email";
import * as ms from "ms";
import { SetOption } from "cookies";

const TOKEN_SECRET_KEY =
  process.env.TOKEN_SECRET_KEY || "5981c9ee-ade4-412f-ae7d-70071fdd708f55a45f";
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "7 days";
const opts: SetOption = {
  httpOnly: false,
  expires: new Date(Date.now() + +ms(TOKEN_EXPIRES_IN)),
};

export async function loginUser(ctx: Koa.Context) {
  try {
    let {
      recordset: [user],
    } = await sql(loginUserQuery, ctx.request.body);
    const token = jwt.sign(
      {
        data: user,
      },
      TOKEN_SECRET_KEY,
      { expiresIn: TOKEN_EXPIRES_IN }
    );
    ctx.cookies.set("token", token, opts);
    ctx.cookies.set("name", user.name, opts);
    ctx.cookies.set("email", user.email, opts);
    ctx.body = { login: "success" };
  } catch (e) {
    ctx.throw(400, e);
  }
}

export async function logoutUser(ctx: Koa.Context) {
  try {
    // delete all the cookies
    ctx.cookies.set("token", "", opts);
    ctx.cookies.set("name", "", opts);
    ctx.cookies.set("email", "", opts);
    ctx.cookies.set("rol", "", opts);
    ctx.body = { logout: "success" };
  } catch (e) {
    ctx.throw(400, e);
  }
}

export async function registerUser(ctx: Koa.Context) {
  let host = ctx.href.split("/")[0];
  let { name, email, password, passwordRepeat } =
    ctx.request.body;
  let validationErrors = ['<div class="row"></div>'];
  if (!name) validationErrors.push("<b>Your name</b> is required");
  if (!email) validationErrors.push("<b>Email</b> is required");
  if (!password) validationErrors.push("You must have a <b>password</b>");
  if (password != passwordRepeat)
    validationErrors.push(
      "<b>Password</b> and <b>Password repeat</b> don't match"
    );

  if (validationErrors.length > 1) {
    return ctx.throw(400, validationErrors.join("<br/>"));
  }
  try {
    let {
      recordset: [user],
    } = await sql(registerUserQuery, ctx.request.body);
    let link = `${ctx.protocol}://${ctx.host}/validate-email/${user.token}`;
    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activare Cont</title>
</head>
<body>
  <h2>Activare Cont</h2>
  <p>Bună ${name},</p>
  <p>Vă mulțumim că v-ați înregistrat pe platforma noastră! Pentru a activa contul, vă rugăm să accesați link-ul de activare de mai jos:</p>
  <p><a href="${link}">Activează Contul</a></p>
  <p>Dacă nu poți accesa link-ul de mai sus, copiază și lipește adresa URL de mai jos în browser-ul tău:</p>
  <p>${link}</p>
  <p>Dacă nu ați înregistrat un cont pe platforma noastră, vă rugăm să ignorați acest mesaj.</p>
  <p>Vă mulțumim,</p>
  <p>Echipa laguna delivery</p>
</body>
</html>
`;

    let text = `Bună ${name}, Activează contul cu acest link:  ${link}`;
    // console.log({ link, html });
    // await sendMail(email, "Activare cont laguna delivery", html, text);
    ctx.body = { sendMail: "OK" };
  } catch (e) {
    ctx.throw(400, e);
  }
}

export async function validateToken(ctx: Koa.Context) {
  try {
    await sql(validateTokenQuery, ctx.request.body);
    ctx.body = { token: "OK" };
  } catch (e) {
    ctx.throw(400, e);
  }
}

export async function passwordRecover(ctx: Koa.Context) {
  try {
    let { email } = ctx.request.body;
    let {
      recordset: [user],
    } = await sql(passwordRecoverQuery, ctx.request.body);
    let name = user.name;
    let link = `${ctx.protocol}://${ctx.host}/password-reset/${user.token}`;
    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resetare Parolă</title>
</head>
<body>
  <h2>Resetare Parolă</h2>
  <p>Bună ${name},</p>
  <p>Am primit o solicitare pentru resetarea parolei pentru contul tău. Dacă nu ai făcut această solicitare, te rugăm să ignori acest mesaj.</p>
  <p>Pentru a reseta parola, te rugăm să accesezi link-ul de mai jos:</p>
  <p><a href="${link}">Resetează Parola</a></p>
  <p>Dacă nu poți accesa link-ul de mai sus, copiază și lipește adresa URL de mai jos în browser-ul tău:</p>
  <p>${link}</p>
  <p>Vă mulțumim,</p>
  <p>Echipa laguna delivery</p>
</body>
</html>
        `;

    let text = `Bună ${name}, Resetare parola: ${link} `;
    await sendMail(email, "Resetare parolă laguna delivery", html, text);
    ctx.body = { sendMail: "OK" };
  } catch (e) {
    console.error(e);
    ctx.throw(400, e);
  }
}

export async function passwordReset(ctx: Koa.Context) {
  let { email, password, passwordRepeat } = ctx.request.body;
  let validationErrors = ['<div class="row"></div>'];
  if (!email) validationErrors.push("Reset <b>token</b> is required");
  if (!password) validationErrors.push("You must have a <b>password</b>");
  if (password != passwordRepeat)
    validationErrors.push(
      "<b>Password</b> and <b>Password repeat</b> don't match"
    );
  if (validationErrors.length > 1)
    return ctx.throw(400, validationErrors.join("<br/>"));
  await loginUser(ctx);
}

export async function decode(ctx: Koa.Context, next: Koa.Next) {
  const token = ctx.cookies.get("token");
  if (token) {
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
    } catch (err) {
      return ctx.throw(401);
    }
    return await next();
  } else ctx.throw(401);
}
