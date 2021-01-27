const path = require('path');
module.exports = {
	mode: 'development',
	devServer: {
		open: true,
		port: 8080,
		hot: false,
		writeToDisk: true
	},
	entry: './src/index.js',
	output: {
		filename: 'dev-bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
};
