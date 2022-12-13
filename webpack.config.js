const path = require('path')
const HTMLWebPlugin= require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev
const filename = (ext) => isDev ? `[name].${ext}`: `[name].[contenthash].${ext}`


module.exports = {
    //context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: ['./src/index.ts'],
    output: {
        path: path.resolve(__dirname, 'app'),
        filename: 'main.bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            src: path.resolve(__dirname, './src')
        },

    },
    plugins: [
    new HTMLWebPlugin({
        template: path.resolve(__dirname, "index.html"),
            filename: 'index.html',
        minify: {
            collapseWhitespace: isProd
        }
    }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                exclude: /(node_modules)/,
            },
            //typescript
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            // handlebars
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: 'handlebars-loader',
                    },
                ],
                exclude: /(node_modules)/,
            },
        ]
    }

}