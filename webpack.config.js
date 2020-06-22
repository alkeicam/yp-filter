'use strict';

var nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'yp-filter.js', // <-- Important
        path: path.resolve(__dirname, 'dist'),
        // ,
        // libraryTarget: 'this' // <-- Important
        library: 'ypfilter',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    resolve: {
        extensions: [ '.js' ]
    },    
    externals: [nodeExternals({})] // <-- Important
};
