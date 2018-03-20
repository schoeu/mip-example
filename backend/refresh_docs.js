/**
 * @file refresh_docs.js
 * @description 更新组件描述文档
 * @date 2018-03-13
*/

const getTags = require('./get_tags');
const util = require('util');
const fs = require('fs');
const path = require('path');

const coreTags = require('../data/core_tags');
const config = require('../config/conf');
const logger = require('../libs/logger');
const writeData = require('../backend/writeData');

async function refresh() {
    const extPath = await getTags();

    const extNames = ['mip-extensions/src', 'mip/src/components'];
    walk(extPath, extNames);

    return extPath;
}

function walk(extPath = '', paths = []) {
    paths.forEach((it, i) => {
        let rPath = path.join(extPath, it);
        let files = fs.readdirSync(rPath);
        let cores = files;

        // extensions组件部分
        if (i === 0) {
            // 过滤核心组件
            cores = files.filter(it => {
                if (/^mip-[\w-]+(.js)?$/.test(it) && coreTags.indexOf(it) > -1) {
                    return it;
                }
            });
            cores.forEach(it => {
                let detailPath = path.join(rPath, it);
                let files = fs.readdirSync(detailPath);
    
                files.forEach(readmeName => {
                    if (/^(readme|mip-\w+).md$/i.test(readmeName)) {
                        let rdPath = path.join(detailPath, readmeName);
                        fs.readFile(rdPath, (err, data) => {
                            if (err) {
                                logger.error('Read readme.md error: ', err);
                            }
    
                            // 转换为html，写入文件夹中。
                            writeData(it, data.toString());
                        });
                    }
                });
            });
        }
        // 核心组件部分
        else {
            cores.forEach((readmeName = '') => {
                if (/^(readme|mip-\w+).md$/i.test(readmeName)) {
                    let rdPath = path.join(rPath, readmeName);
                    fs.readFile(rdPath, (err, data) => {
                        if (err) {
                            logger.error('Read readme.md error: ', err);
                        }

                        // 转换为html，写入文件夹中。
                        writeData(readmeName.split('.')[0], data.toString());
                    });
                }
            });
        }
    });
}

module.exports = {
    refresh: refresh
};
