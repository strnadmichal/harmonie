const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CopyPlugin is likely no longer needed as assets are already in the 'public' directory
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    // Set publicPath to root as Netlify serves 'public' as '/'
    publicPath: '/', 
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Point template to the index.html inside the 'public' directory
      template: './public/index.html', 
    }),
    // Remove CopyPlugin - files are already in the 'public' directory
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'public/img', to: 'img' }, // Updated source paths if needed
    //     { from: 'public/css', to: 'css' },
    //     { from: 'public/js/vendor', to: 'js/vendor' },
    //     { from: 'public/icon.svg', to: 'icon.svg' },
    //     { from: 'public/favicon.ico', to: 'favicon.ico' },
    //     { from: 'public/robots.txt', to: 'robots.txt' },
    //     { from: 'public/icon.png', to: 'icon.png' },
    //     { from: 'public/404.html', to: '404.html' },
    //     { from: 'public/site.webmanifest', to: 'site.webmanifest' },
    //   ],
    // }),
  ],
});
