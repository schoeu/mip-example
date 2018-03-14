const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = new Router();

const docs = require('./backend/refresh_docs');

const defaultPort = 8910;

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
    exPath = await docs.refresh() || 'x';
    ctx.body = exPath;
});

app.listen(defaultPort);
