/**
 * @file get_tags
 * @description 更新组件列表
*/

const logger = require('../libs/logger');
const childProcess = require('child_process');
const path = require('path');

const scriptsPath = path.join(__dirname, '../scripts')
const scriptName = 'deploy.sh';

module.exports = () => {
    // 执行命令
    let extPath = path.join(scriptsPath, '../', 'mip_exts')
    let command = 'sh ' + scriptsPath +'/'+ scriptName+ ' ' + extPath;
    
    console.log(command);
    childProcess.exec(command , (err, stdout) => {
        if (err) {
            logger.error(err);
        }
        console.log(stdout)
        logger.info('Get github extensions code.');
    });
};
