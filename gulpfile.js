var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');


gulp.task("webpack", function(callback) {
  // run webpack
  webpack({
    entry: {
      app: path.join( __dirname, "source/app.js")
      vendor: ['react', 'react-dom']
    },
    resolve: {
      root: path.join( __dirname, 'source'),
      extentions: ['', '.js'],
      modulesDirectories: ['node_modules', 'source']
    },

    output: {
      path: path.join(__dirname, 'build'),
      publicPath: '',
      filename: '[name].js',
      library: ['Example', '[name]'],
      pathInfo: true
    },

    module: {
      loaders: [
        {test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'}
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new HtmlWebpackPlugin({
        inject: true,
        template: 'source/index.html'
      })
    ]

  }, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
        // output options
    }));
    callback();
  });
});