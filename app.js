const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const BodyParser = require('koa-bodyparser');
const respond = require('koa-respond');

const router = require('./routes');

const app = new Koa();
app.use(Logger());
app.use(BodyParser());
app.use(respond());

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
