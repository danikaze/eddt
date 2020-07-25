const { resolve } = require('path');
const { NamedModulesPlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { existsSync } = require('fs');

function absPath(pathFromProjectRoot) {
  return resolve(__dirname, pathFromProjectRoot);
}

module.exports = (env) => {
  const isProduction = env !== 'dev';
  const baseConfig = {
    target: 'node',
    mode: isProduction ? 'production' : 'development',
    watch: !isProduction,

    entry: absPath('src/index.ts'),

    output: {
      filename: '[name].js',
      path: absPath('app'),
    },

    stats: {
      assetsSort: 'name',
      modules: false,
      children: false,
      excludeAssets: [/hot(-update)?\.js(on)?/, /webpack-dev-server/],
    },

    devtool: 'source-map',

    optimization: {
      minimize: false,
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  declaration: false,
                  sourceMap: true,
                },
              },
            },
          ],
        },
      ],
    },

    plugins: [],
  };

  if (existsSync('static')) {
    baseConfig.plugins.push(
      new CopyPlugin({
        patterns: [{ from: 'static/' }],
      })
    );
  }

  if (!isProduction) {
    baseConfig.plugins.push(new NamedModulesPlugin());
  }

  return baseConfig;
};
