const path = require('path');

module.exports = () => {
    return {
        projectPath: path.join(__dirname, '..'),
        logPath: './logs',
        logLevel: 'info',
        deployScript: 'deploy.sh',
        extName: 'mip-extensions',
        extPlatName: 'mip-extensions-platform'
    }
};
