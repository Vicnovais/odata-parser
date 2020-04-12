const path = require('path');

module.exports = {
    entry: './src/odata.parser.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    }
};