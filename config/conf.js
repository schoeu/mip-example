const path = require('path');

module.exports = {
    port: 8910,
    projectPath: path.join(__dirname, '..'),
    logPath: './logs',
    logLevel: 'info',
    deployScript: 'deploy.sh',
    extName: 'mip-extensions',
    extPlatName: 'mip',
    componentsPath: path.join(__dirname, '../src/components'),
    fileExtName: '.html',
    baseName: 'base'
};
