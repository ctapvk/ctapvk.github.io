var Encore = require('@symfony/webpack-encore');
Encore //
    .setOutputPath('./scd/')  // directory where all compiled assets will be stored
    .setPublicPath('/scd/')   // what's the public path to this directory (relative to your project's document root dir)
    .cleanupOutputBeforeBuild()  // empty the outputPath dir before each build

    .addEntry('main', './src/main.js') // will output as /public/main.js
    .enableVueLoader()                 // однофайловые компоненты
    // .addStyleEntry('global', './src/global.scss') // will output as /public/global.css
    .enableSassLoader()                              // allow sass/scss files to be processed

    //.autoProvidejQuery() // allow legacy applications to use $/jQuery as a global variable
    .autoProvideVariables({ // you can use this method to provide other common global variables,
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }) // such as '_' for the 'underscore' library

    .configureDefinePlugin((options) => {
      options.DEBUG = !Encore.isProduction();// https://webpack.js.org/plugins/define-plugin/
    }) //

    .configureFilenames({
      // js: '[name].[hash:8].js',
    })// create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning() // enableVersioning
    .enableSourceMaps(!Encore.isProduction()) // enableSourceMaps
;

var config = Encore.getWebpackConfig();
config.externals = {
  //jquery: 'jQuery',
  //BX: 'BX'
};
module.exports = config; // export the final configuration