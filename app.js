const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const respond = require('koa-respond');

const router = require('./routes');

const db = require('./db');
db.initDb();

const app = new Koa();
app.use(BodyParser());
app.use(respond());

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
