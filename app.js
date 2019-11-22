const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const respond = require('koa-respond');
const Cors = require('@koa/cors');

const router = require('./routes');

const db = require('./db');
db.initDb();

const app = new Koa();
app.use(
  Cors({
    origin: (ctx) => {
      if (ctx.url === '/api/colon') {
        return '*';
      } else {
        return ctx.get('Origin');
      }
    },
  })
);
app.use(BodyParser());
app.use(respond({ autoMessage: false }));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
