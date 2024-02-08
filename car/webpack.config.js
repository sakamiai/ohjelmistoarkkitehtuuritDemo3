const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.js',
    watch: true,
    watchOptions: {
        poll: 1000, // Check for changes every second
      },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};