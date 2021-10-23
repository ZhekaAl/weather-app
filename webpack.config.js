const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const path = require("path");

// const styleRules = require('./styles');

module.exports = (env, argv) => {

  console.log(argv.mode)

  const isProd = argv.mode === 'production';
  const mode = isProd ? 'production' : 'development'

  const miniCssExtractLoader = isProd
    ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: false,
      },
    }
    : {
      loader: 'style-loader',
      options: {
        esModule: false,
      },
    };

  const cssLoader = {
    loader: 'css-loader',
  };

  const cssModuleLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: {
        localIdentName: '[local]_[hash:base64:5]',
      },
    },
  };

  const babelLoader = {
    loader: 'babel-loader',
    options: {
      configFile: './\.babelrc.js',
    },
  };



  console.log('mode', mode);

  return ({
    entry: "./src/index",
    mode,
    devServer: isProd ? undefined : {
      historyApiFallback: true,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      static: {
        directory: path.join(__dirname, "dist"),
        publicPath: '/',
      },
      port: 3001,
    },
    output: {
      publicPath: '/',
    },

    optimization: isProd ? {
      minimize: true,
      minimizer: [new TerserPlugin()],
    } : undefined,

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /bootstrap\.tsx$/,
          loader: "bundle-loader",
          options: {
            lazy: true,
          },
        },
        {
          test: /\.(tsx|ts)$/,
          use: [babelLoader],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [miniCssExtractLoader, cssLoader],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: [miniCssExtractLoader, cssModuleLoader],
          include: /\.module\.css$/,
        },
        {
          test: /\.component\.svg$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                configFile: './\.babelrc.js',
              },
            },
            {
              loader: '@svgr/webpack',
              options: {
                babel: false,
                svgoConfig: {
                  plugins: {
                    removeViewBox: false
                  }
                }
              },
            },
          ],
        },
        {
          test: /\.inline\.svg$/,
          type: 'asset/resource',
        }
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app-master",
        filename: "remoteEntry.js",
        remotes: {
          // app2: "app2@http://localhost:3002/remoteEntry.js",
          app2: "app2@https://weather-graph-mf-host.zhekaal.ru/remoteEntry.js"
        },
        shared: ["react", "react-dom"],
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),

      new CopyPlugin({
        patterns: [{ from: './public', to: '' }],
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(mode),
          // PUBLIC_URL: JSON.stringify('http://127.0.0.1:3000'),
          PUBLIC_URL: JSON.stringify('./'),
        },
      }
      ),

      new MiniCssExtractPlugin(),
    ],
  });
}
