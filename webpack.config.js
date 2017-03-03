


var webpack	= require('webpack')
var env		= process.env.NODE_ENV.split('.')
	env		= {target: env[0], mode: env[1]}

var config = {
	devtool : 'source-map',
    module  : {
		loaders	: [
			{ 
				test     : /\.(coffee)$/,
				loader   : 'coffee-loader',
				exclude	 : /node_modules/
			},
			{
				test	: /\.(js)$/,
				loader	: 'babel',
				query	: {presets: ["es2015"]},
				exclude	: /node_modules/
			},
			{
				test    : /\.(sass)$/,
				loaders : ['style', 'css', 'sass?sourceMap'],
				exclude	: /node_modules/
			},
			{
				test: /\.(jpg|png|svg)$/, 
				loader: 'url'
			}
		]
    }
}

var lib = {
	entry   : {'./index.js' : './src/index.js'},
    output  : {
		filename      : '[name]',
        libraryTarget : 'umd',
        library       : 'fw'
	},
};

// browser test
if (env.mode == 'client') Object.assign(config, {
	entry     : {'./app.js' : './test/app.coffee'},
    output    : {filename : '[name]'},
	devServer : {
		contentBase : './test',
		stats       : 'errors-only',
		inline      : true,
		port        : 8000
	}
});

// server js test
else if (env.mode == 'server') Object.assign(config, lib, {
	watch : true
});

// build
else if (env.mode == 'build') Object.assign(config, lib, {
	plugins : [
		new webpack.optimize.UglifyJsPlugin({
  			output: {comments: false},
  			sourceMap: true
		})
    ]
});

module.exports = config


