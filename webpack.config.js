const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
      })
    ],
    module: {
      rules: [
          {
              test: /\.js$/,
              enforce: "pre",
              loader: "eslint-loader",
              options: {
                  fix: true
              }            
          }
      ]
  }
    
};

module.exports = config;