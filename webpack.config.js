import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import EslingPlugin from 'eslint-webpack-plugin';

const getRootDir = (url) => dirname(fileURLToPath(url));

const rootDir = getRootDir(import.meta.url)

export default ({mode}) => {
  return {
    target: 'node',
    entry: {
      main: resolve(rootDir, './src/index.ts')
    },
    mode: mode === 'prod' ? 'production' : 'development',
    output: {
      filename: 'bundle.js',
      path: resolve(rootDir, './dist'),
      clean: true
    },
    plugins: [
      new CleanWebpackPlugin(),
      new EslingPlugin({ extensions: 'ts' })
    ],
    module: {
      rules: [
        { test: /\.ts$/i, use: 'ts-loader' },
      ]
    },
    resolve: {
      extensions: ['.js', '.ts']
    },
  }
}
