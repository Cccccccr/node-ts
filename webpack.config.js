/* eslint-disable no-undef */
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/server.ts',
	output: {
		// eslint-disable-next-line no-undef
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	node: {
		__dirname: false,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					// tsc编译后，再用babel处理
					{loader: 'babel-loader',},
					{
						loader: 'ts-loader',
						options: {
							// 加快编译速度
							transpileOnly: true,
							// 指定特定的ts编译配置，为了区分脚本的ts配置
							// eslint-disable-next-line no-undef
							configFile: path.resolve(__dirname, './tsconfig.json')
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [new cleanWebpackPlugin()],
	externals: [nodeExternals()],
};