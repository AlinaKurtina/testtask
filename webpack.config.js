const path = require('path');
const MCEP = require('mini-css-extract-plugin');
const HWP = require('html-webpack-plugin');
const CopyP = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'script.js',
        clean: true
    },
    plugins: [
        new MCEP({
            filename: 'style.css'
        }),
        new HWP({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CopyP({
            patterns: [
                { from: './assets', to: 'assets' },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MCEP.loader, 'css-loader'],
            }
        ]
    }
}