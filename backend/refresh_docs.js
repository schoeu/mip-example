const getTags = require('./get_tags');

async function refresh () {
    const extPath = await getTags();
    return extPath;
}

module.exports = {
    refresh: refresh
};


