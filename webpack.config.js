


var webpack	= require('webpack')
var env		= process.env.NODE_ENV.split('.')
	env		= {target: env[0], mode: env[1]}

var config = {
	entry   : {'./index.js' : './src/fw.js'},
	devtool : 'source-map',
    output  : {
		filename      : '[name]',
        libraryTarget : 'umd',
        library       : 'fw'
	},
    module : {
		loaders	: [
			{ 
				test     : /\.(coffee)$/,
				loader   : 'coffee',
				exclude	 : /node_modules/
			},
			{
				test	: /\.(js)$/,
				loader	: 'babel',
				query	: {
					presets	: ["es2015"]
				},
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
    },
}

if (env.mode == 'build') Object.assign(config, {
	plugins : [
		new webpack.optimize.UglifyJsPlugin({
  			output: {comments: false},
  			sourceMap: true
		})
    ]
}); else if (env.mode == 'watch') Object.assign(config, {
	watch : true
})

module.exports = config


