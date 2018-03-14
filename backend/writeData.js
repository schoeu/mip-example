const path = require('path');
const fs = require('fs-extra');
const marked = require('marked');
const renderer = new marked.Renderer();
const logger = require('../libs/logger');
const config = require('../config/conf')();

async function ensureDir (directory) {
    try {
        await fs.ensureDir(directory)
    } catch (err) {
        logger.error('Eusure dir error: ', err);
    }
}

// 定制markdown head
renderer.heading = function (text, level) {
    return '<h' + level + ' id="'+ encodeURIComponent(text) +'">' + text + '</h' + level + '>';
};

/**
 * markdown文件转html处理
 *
 * @param {string} content markdown字符串
 * @return {string} html字符串
 * */
function getMarked(content) {
    return marked(content, {renderer: renderer});
}

module.exports = (file, data) => {
    if (typeof file === 'string' && data) {
        let rPath = path.join(config.componentsPath, file);
        ensureDir(rPath);

        let markdownStr = getMarked(data);
        fs.outputFile(path.join(rPath, config.examplePageName), markdownStr, err => {
            logger.error('Write doc error: ', err);
        })
    }
};