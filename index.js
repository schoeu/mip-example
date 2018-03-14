const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = new Router();

const render = require('koa-art-template');

const docs = require('./backend/refresh_docs');
const config = require('./config/conf')();

const defaultPort = 3000;

render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
    exPath = await docs.refresh() || 'x';
    ctx.body = exPath;
});


art.render();

app.listen(config.port || defaultPort);
