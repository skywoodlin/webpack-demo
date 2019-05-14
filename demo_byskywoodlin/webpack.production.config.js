/* 注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: `${__dirname}/app/main.js`, // 已多次提及的唯一入口文件
    output: {
        path: `${__dirname}/build`, // 打包后的文件存放的地方
        filename: 'bundle-[hash].js', // 打包后输出文件的文件名
    },
    devtool: 'null', //注意生产环境修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: './build', // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true, // 实时刷新
        port: 7777, //端口号
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            // localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    },
                ]
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin('skywoodlin版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin({
            root: __dirname + "/build/*.*",
            verbose: true,
            dry: false
        })
    ],
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
};
