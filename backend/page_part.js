/**
 * @file page_part.js
 * @description 组装页面信息
 * @date 2018-03-13
*/

const config = require('../config/conf');
const fbName = 'base.html';
const prefixStr = `{{extend '../${config.baseName + config.fileExtName || fbName}'}}{{block 'content'}}`;
const suffixStr = `{{/block}}`;

module.exports = (s) => {
    return prefixStr + s + suffixStr;
};
