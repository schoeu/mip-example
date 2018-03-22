const path = require('path');
const template = require('art-template');
const config = require('../config/conf');

let dir = config.projectPath;

module.exports = {
    setDir: p => {
        dir = path.join(config.projectPath, p)
    },
    render: (filename, data) => {
        let html = '';
    
        html = template(path.join(dir, filename), data);
        
        return html;
    }
};
