const path = require('path');
const fs = require('fs-extra');

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const render = require('koa-art-template');

const config = require('./config/conf');
const logger = require('./libs/logger');
const pg = require('./backend/playground');
const getPart = require('./backend/get_part');
const docs = require('./backend/refresh_docs');
const defaultPort = 3000;

render(app, {
    root: config.componentsPath,
    extname: config.fileExtName,
    debug: process.env.NODE_ENV !== 'production'
});

app.use(router.routes());
app.use(router.allowedMethods());

// 获取组件内容
router.get('/components/:name', async ctx => {
    let tpl = ctx.params.name || '';
    let exists = await fs.pathExists(path.join(config.componentsPath, tpl + config.fileExtName));
    if (exists) {
        ctx.render(tpl);
    }
    else {
        ctx.redirect('/');
    }
});

// 主页
router.get('/', ctx => {
    ctx.body = 'Hello';
});

pg.setDir('./playground');
// playground路由
router.get('/playground/:name', ctx => {
    let tpl = ctx.params.name || '';
    if (tpl) {
        let {data, err} = getPart(tpl);
        console.log(data, err);
    }
    
    let html = pg.render('index.html');
    ctx.body = html;
});

// 更新文档
// TODO: 暂时留个口，以供测试
router.get('/api/update', async ctx => {
    // 文档生成&编译
    await docs.refresh();
    ctx.body = 'done';
});

let port = config.port || defaultPort;
app.listen(port, function() {
    console.log(`Server listened on: http://localhost:${port}`);
});

app.on('error', function (err) {
    logger.error('App error: ', err.stack);
});
