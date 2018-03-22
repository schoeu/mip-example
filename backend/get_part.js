/**
 * @file get_part.js
 * @description 获取文档中组件示例片段
 * @date 2018-03-21
*/

const util = require('util');
const path = require('path');
const cheerio = require('cheerio');
const readFile = util.promisify(require('fs').readFile);
const config = require('../config/conf');
const fs = require('fs');

module.exports = async (name = '') => {
    let file = path.join(config.componentsPath, name + config.fileExtName);
    let data = await readFile(file);
    if (data) {
        let $ = cheerio.load(data, {
            decodeEntities: false
        });
        let code = analysisDom($);
        return code;
    }
    return '';
};

// 截取出示例部分
function analysisDom($) {
    var hData = [];
    var start = $('h2#示例');
    var current = start;
    hData.push(outHtml(start, $));
    while(!(current = current.next()).is('h2')) {
        let out = outHtml(current, $);
        if (out) {
            hData.push(out);
        }
    }
    return hData.join('\n');
}

// 获取外层数据
function outHtml(el, $) {
    if (el.is('pre')) {
        el = $(el.html())
    }
    if (el.is('code')) {
        el = $(el.html())
    }

    // 有部分示例中内部的标签，是否 .replace(/<[\/]?code>/g, '')
    return $('<div>').append(el.clone()).html();
}
