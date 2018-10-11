const path = require('path'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    "entry": {
        index: ["./src/App.tsx"],
        "vendor": [
            "react",
            "mobx",
            "mobx-react",
            "react-dom"
        ]
    },
    "resolve": {
        "extensions": ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    "output": {
        "path": path.resolve(__dirname, "./build"),
        "filename": "js/[name].js",
        "sourceMapFilename": 'js/[name].bundle.map.js'
        // "publicPath": 'http://localhost:3000/'
    },
    "module": {
        "rules": [{
            "test": /\.tsx?$/, 
            loader: "awesome-typescript-loader" 
        }, {
            "test": /\.(sass|scss)$/,
            "use": ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader'
            }),
        }, { 
            enforce: "pre", 
            test: /\.js$/, 
            loader: "source-map-loader" 
        }]
    },
    "plugins": [
        // 需要升级到next版本
        new ExtractTextPlugin({
            filename: 'css/index.css',
            disable: false,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "mobx",
            template: "index.html"
        }),
        // 已被移除（optimization代替）
        //new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "js/bundle.js" });
    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    } 
}
module.exports = config