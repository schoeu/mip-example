/**
 * @file get_tags
 * @description 更新组件列表
*/

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const logger = require('../libs/logger');
const coreTags = require('../data/core_tags');

const scriptsPath = path.join(__dirname, '../scripts')
const scriptName = 'deploy.sh';

module.exports = async () => {
    // 执行命令
    let extPath = path.join(scriptsPath, '../', 'mip_exts')
    let command = 'sh ' + scriptsPath +'/'+ scriptName+ ' ' + extPath;
    
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
