const getTags = require('./get_tags');
const util = require('util');
//const fs = util.promisify(require('fs'));
const fs = require('fs');
const path = require('path');

const coreTags = require('../data/core_tags');
const logger = require('../libs/logger');
const writeData = require('../backend/writeData');

const extNames = ['mip-extensions/src', 'mip-extensions-platform'];

async function refresh () {
    const extPath = await getTags();
    walk(extPath, extNames);

    return extPath;
}

function walk(extPath = '', paths = []) {
    paths.forEach((it, i) => {
        let rPath = path.join(extPath, it);
        let files = fs.readdirSync(rPath);

        // 过滤核心组件
        const cores = files.filter(it => {
            if (/^mip-[\w-]+(.js)?$/.test(it) && coreTags.indexOf(it) > -1) {
                return it;
            }
        });

        cores.forEach(it => {
            let detailPath = path.join(rPath, it);
            let files = fs.readdirSync(detailPath);
            files.forEach(readmeName => {
                if (/^readme.md$/i.test(readmeName)) {
                    let rdPath = path.join(detailPath, readmeName);
                    fs.readFile(rdPath, (err, data) => {
                        if (err) {
                            logger.error('Read readme.md error: ', err);
                        };
                        
                        // 转换为html，写入文件夹中。
                        writeData(it, data.toString());
                    });
                }
            });
        });
    });
}

module.exports = {
    refresh: refresh
};


