/**
 * @file get_tags
 * @description 更新组件列表
*/

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const config = require('../config/conf')();
const logger = require('../libs/logger');
const scriptsPath = path.join(__dirname, '../scripts')

module.exports = async () => {
    // 执行命令
    let extPath = path.join(scriptsPath, '../', 'mip_exts');
    // sh command arg1 arg2 arg3
    let commandArr = ['sh', path.join(scriptsPath, config.deployScript), extPath, config.extName, config.extPlatName];
    let command = commandArr.join(' ');
    
    const { stdout, stderr } = await exec(command);
    if (stderr) {
        logger.error('Get github extensions code error: ', stderr)
        return;
    }
    else {
        logger.info('Get github extensions code successfully.');
    }
    return extPath;
};
