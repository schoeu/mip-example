/**
 * @file conf.js
 * @description 项目配置文件
 * @date 2018-03-18
*/

const path = require('path');
const proPath = path.join(__dirname, '..');

module.exports = {
    port: 8910,
    projectPath: proPath,
    logPath: './logs',
    logLevel: 'info',
    deployScript: 'deploy.sh',
    extName: 'mip-extensions',
    extPlatName: 'mip',
    componentsPath: path.join(proPath, './src/components'),
    fileExtName: '.html',
    baseName: 'base'
};
