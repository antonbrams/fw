


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
                loader	: 'babel-loader',
				test	: /\.(js|jsx)$/,
				exclude	: /node_modules/,
                query	: {
                    presets	: ['es2015']
                }
            }
        ]
    },
})

if (env.mode == 'build') config.add({
		plugins : [
			new webpack.optimize.UglifyJsPlugin()
	    ]
	})
else if (env.mode == 'watch') config.add({
		watch : true
	})

module.exports = config


