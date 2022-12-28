const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir : path.resolve(__dirname,'../backend/public/'),
  devServer : {
    proxy : {
      '/api':{
        target : 'https://127.0.0.1:3000/api',
        changeOrigin : true,
        pathRewrite : {
          '^/api': '',
        },
      },
    },
  },
  lintOnSave:false
});
