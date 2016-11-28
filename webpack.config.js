


var webpack	= require('webpack')
var config	= {add:function(o){for(var i in o)this[i]=o[i]}}
var env		= process.env.NODE_ENV.split('.')
	env		= {target: env[0], mode: env[1]}

config.add({
	entry : {'./index.js' : './libs/fw.js'},
    output : {
		filename: '[name]',
        libraryTarget: "umd",
        library: "fw"
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
})

if (env.mode == 'build') config.add({
		devtool : 'eval',
		plugins : [
			new webpack.optimize.UglifyJsPlugin({
      			output: {comments: false},
      			sourceMap: true
			})
	    ]
	})
else
	if (env.mode == 'watch') config.add({
		watch : true
	})

module.exports = config


