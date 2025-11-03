// karma.conf.cjs
const webpackConfig = require('./webpack.config.test.cjs'); 

module.exports = function(config) {
  config.set({
    
    // Devolvemos el log a 'INFO' (normal)
    logLevel: config.LOG_INFO, 

    frameworks: ['jasmine'],
    
    // --- ¡RUTA CORREGIDA! ---
    // Apuntando a 'src/tests/'
    files: [
      'src/tests/**/*.js',
      'src/tests/**/*.jsx'
    ],

    // --- ¡RUTA CORREGIDA! ---
    preprocessors: {
      'src/tests/**/*.js': ['webpack'],
      'src/tests/**/*.jsx': ['webpack']
    },

    webpack: webpackConfig,
    reporters: ['spec'],
    
    // Devolvemos el navegador a 'Headless' (invisible)
    browsers: ['ChromeHeadless'], 
    
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'), 
      require('karma-spec-reporter')
    ],
    singleRun: true,
    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};