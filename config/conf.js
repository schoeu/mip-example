const path = require('path');

module.exports = () => {
    return {
        port: 8910,
        projectPath: path.join(__dirname, '..'),
        logPath: './logs',
        logLevel: 'info',
        deployScript: 'deploy.sh',
        extName: 'mip-extensions',
        extPlatName: 'mip-extensions-platform',
        componentsPath: path.join(__dirname, '../src/components'),
        fileExtName: '.art',
        baseName: 'base'
    }
};
