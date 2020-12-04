const path = require('path')

module.exports = {
  lintOnSave: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'hero-dashboard',
        appId: 'com.hero-dashboard.dashboard-app',
        // eslint-disable-next-line no-template-curly-in-string
        artifactName: 'hero-dashboard.${ext}',
        linux: {
          category: 'Utility',
          target: 'AppImage'
        }
      },
      nodeIntegration: true
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$', path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
    )
  }
}
