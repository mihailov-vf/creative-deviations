var path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname),
		filename: 'bundle.js'
	},
	resolve: {
		modules: [
			path.join(__dirname, "src"),
			"node_modules"
		],
		extensions: ['.js', '.scss'],
		alias: {
			src: path.resolve(__dirname) + '/src',
			scss: path.resolve(__dirname) + '/src/scss',
			js: path.resolve(__dirname) + '/src/js',
		},
	},
	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader' 
			},
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname),
		compress: true,
		port: 9000
	},
	plugins: []
};
