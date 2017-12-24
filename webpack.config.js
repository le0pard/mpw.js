// Example webpack configuration with asset fingerprinting in production.
'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

// set NODE_ENV=production on the environment to add asset fingerprints
const currentEnv = process.env.NODE_ENV;
const isProduction = currentEnv === 'production';

const preScripts = {
  development: [],
  production: []
};

const preScriptsEnv = isProduction ?
  preScripts['production'] :
  preScripts['development'];

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      modules: false,
      minimize: isProduction,
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: function() {
        return [
          require('postcss-import')({
            addDependencyTo: webpack
          }),
          require('postcss-url')(),
          require('postcss-cssnext')({
            browsers: [
              'last 2 version'
            ],
            features: {
              rem: false
            }
          }),
          require('postcss-browser-reporter')(),
          require('postcss-reporter')()
        ];
      }
    }
  }
];

const config = {
  target: 'web',
  entry: {
    'app': preScriptsEnv.concat(['./webpack/app.js']),
    'web-worker': preScriptsEnv.concat(['./webpack/webWorker.js'])
  },

  output: {
    // Build assets directly in to public/webpack/, let webpack know
    // that all webpacked assets start with webpack/

    // must match config.webpack.output_dir
    path: path.join(__dirname, '.tmp', 'dist'),
    publicPath: '/',
    filename: isProduction ? '[name]-[chunkhash].js' : '[name].js'
  },

  resolve: {
    modules: [
      path.join(__dirname, 'webpack'),
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            outputPath: 'assets/'
          }
        }]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders.concat({
            loader: 'sass-loader',
            options: {
              indentedSyntax: false,
              sourceMap:      true,
              includePaths:   [path.join(__dirname, 'webpack', 'css')]
            }
          })
        })
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders.concat({
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              sourceMap:      true,
              includePaths:   [path.join(__dirname, 'webpack', 'css')]
            }
          })
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: isProduction ? '[name]-[contenthash].css' : '[name].css',
      allChunks: true
    })
  ]
};

if (isProduction) {
  config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false},
      sourceMap: true,
      mangle: true
    })
  );
  // Source maps
  config.devtool = 'source-map';
} else {
  config.plugins.push(
    new webpack.NamedModulesPlugin()
  );
  // Source maps
  config.devtool = 'inline-source-map';
}

config.plugins.push(
  new OfflinePlugin({
    excludes: [
      '**/.*',
      '**/*.map'
    ],
    externals: [
      '/'
    ],
    name: 'mp-cache',
    version: '[hash]',
    responseStrategy: 'cache-first',
    prefetchRequest: {
      credentials: 'include'
    },
    ServiceWorker: {
      events: true,
      scope: '/',
      minify: isProduction
    },
    AppCache: null
  }),
  new ManifestPlugin({
    fileName: 'assets-manifest.json',
    publicPath: config.output.publicPath,
    writeToFileEmit: process.env.NODE_ENV !== 'test'
  })
)

module.exports = config;
