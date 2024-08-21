const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const crypto = require('crypto')
const crypto_orig_createHash = crypto.createHash
crypto.createHash = (algorithm) => crypto_orig_createHash(algorithm == 'md4' ? 'sha256' : algorithm)

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  context: path.join(__dirname, 'src'),

  entry: {
    ui: './ui.js', // The entry point for your UI code
    code: './code.js', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@riotjs/webpack-loader',
            options: {
              hot: false, // set it to true if you are using hmr
              // add here all the other @riotjs/compiler options riot.js.org/compiler
              // template: 'pug' for example
            },
          },
        ],
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: [{ loader: 'url-loader' }] },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
  },

  // watchOptions: {
  //   ignored: /node_modules/,
  //   poll: 1000
  // },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new HtmlWebpackPlugin({
      template: './ui.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
})
