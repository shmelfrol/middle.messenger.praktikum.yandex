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
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        port: 1237,
    },
    entry: ['./src/index.ts'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `./js/${filename('js')}`,
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
                exclude: /(node_modules)/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],


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

            },
            // handlebars
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: 'handlebars-loader',
                    },
                ],

            },
        ]
    }

}