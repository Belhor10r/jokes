const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './app.ts',
  plugins: [
    new CleanWebpackPlugin(),    
    new CopyPlugin({
      patterns: [
        { from: 'store/mockup/jokes.mockup.json', to: 'jokes.mockup.json' },
      ],
    }),
  ],
  target: 'node',
  node: {
    __dirname: false,
  },
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'app.js', // `-${Date.now()}.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [ 'eslint-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [ 'ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

};
