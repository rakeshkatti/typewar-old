var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    javascript: path.resolve(__dirname, 'app/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "app.js"
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ["react-hot", "babel-loader"],
    },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  }
};

module.exports = config;