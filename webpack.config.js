const { resolve } = require('path');
const { existsSync } = require('fs');
const { DefinePlugin, NamedModulesPlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const packageJson = require('./package.json');
const gitRevisionPlugin = new GitRevisionPlugin();

function absPath(pathFromProjectRoot) {
  return resolve(__dirname, pathFromProjectRoot);
}

module.exports = (env) => {
  const IS_PRODUCTION = env !== 'dev';
  const baseConfig = {
    target: 'node',
    mode: IS_PRODUCTION ? 'production' : 'development',
    watch: !IS_PRODUCTION,

    entry: {
      [packageJson.name]: absPath('src/index.ts'),
      'test-locale': absPath('scripts/test-locale/index.ts'),
    },

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

    node: {
      __dirname: false,
      __filename: false,
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

    plugins: [
      gitRevisionPlugin,
      new DefinePlugin({
        IS_PRODUCTION,
        PACKAGE_NAME: JSON.stringify(packageJson.name),
        PACKAGE_VERSION: JSON.stringify(packageJson.version),
        COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
        COMMIT_HASH_SHORT: JSON.stringify(
          gitRevisionPlugin.commithash().substr(0, 7)
        ),
      }),
    ],
  };

  if (existsSync('static')) {
    baseConfig.plugins.push(
      new CopyPlugin({
        patterns: [{ from: 'static/' }],
      })
    );
  }

  if (!IS_PRODUCTION) {
    baseConfig.plugins.push(new NamedModulesPlugin());
  }

  return baseConfig;
};
