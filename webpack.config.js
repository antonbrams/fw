


/*
	../../libs/
	www/
		client/
			package.json
			node_modules/
			index.html
			bundle.js
			graphic/
				style.css
			libs/
				app.js
				.../
		server/
			package.json
			node_modules/
			index.js
			libs/
				app.js
				.../
*/

var webpack 	= require('webpack')
var env 		= process.env.NODE_ENV.split('.')
var env    		= {target: env[0], mode: env[1]}
var config 		= {add:function(o){for(var i in o)this[i]=o[i]}}

if (env.target == 'server') config.add({
	entry : {'index.js'	 : './libs/index.js'}
})

if (env.target == 'client') config.add({
	entry : {'index.js' : './libs/index.js'}
})

if (env.mode == 'prod') {
	config.add({
		//devtool	: 'inline-source-map',
		plugins : [
			new webpack.LoaderOptionsPlugin({
				minimize	: true,
				debug		: false
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings 		: true,
					drop_console	: false
				},
				sourceMap	: true,
				beautify	: false
			})
	    ]
	})
} else if (env.mode == 'watch') {
	if (env.target == 'server') config.add({
		watch : true
	})
	if (env.target == 'client') config.add({
		devServer : {
	    	port		: 8000,
			stats		: 'errors-only',
			contentBase	: './'
		}
	})
}

config.add({
    output	: {
		filename: '[name]',
        libraryTarget: "umd",
        library: "fw"
	},
    module	: {
        loaders	: [
            {
                loader	: 'babel-loader',
				test	: /\.(js|jsx)$/,
				exclude	: /node_modules/,
                query	: {
                    presets	: ['es2015-native-modules'].map(function (name) {
	                    return require.resolve('babel-preset-'+ name
	                )}),
	                plugins : [].map(function (name) {
	                    return require.resolve('babel-preset-'+ name
	                )})
                }
            }
        ]
    },
	resolve : {
		modules : [
			'node_modules',
			// '../../libs/fw/3.0.0/'
		]
	},
	resolveLoader : {
		root : __dirname + '/node_modules'
	}
})

module.exports = config


