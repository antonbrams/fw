


import {val} from '../index'

export default {
	
	clone (object, methods) {
		return Object.assign(Object.assign({}, object), methods)
		//return JSON.parse(JSON.stringify(_object))
	},
	
	uuid() {
	  	return `dd-d-d-d-ddd`.replace(/d/g, () =>
			Math.floor((1 + Math.random()) * 0x10000)
				.toString(16).substring(1))
  	},
	
	uploadFile (input, onready) {
		input.onchange = (() => {
			var event 	= window.event
			var files 	= event.target.files
			var output	= []
			for (var i = 0; i < files.length; i ++)
				this.readFile(files[i], function (file) {
					output.push(file)
					if (output.length == files.length) onready(output)
				})
		}).bind(this)
	},
	
	compressImage (list, scale, onload, quality) {
		var compressor = (url, render) => {
			var image = document.createElement('img')
			image.onload = function () {
				var canvas    = document.createElement('canvas')
				var context   = canvas.getContext('2d')
				var width     = this.width  * scale
				var height    = this.height * scale
				canvas.width  = width
				canvas.height = height
				context.drawImage(this, 0, 0, width, height)
				render(canvas.toDataURL('image/jpeg', quality || 1))
			}
			image.src = url
		}
		if (val.isArr(list))
			list.forEach((url, i) => {
				compressor(url, scaled => {
					list[i] = scaled
					if (i == list.length - 1) onload(urls)
				})
			})
		else
			compressor(list, onload)
	},

/*
	decodeBase64 (dataString) {
		if (typeof Buffer !== undefined) {
			var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
			if (matches.length !== 3) return new Error('invalid input string')
			return {
				type : matches[1],
				data : new Buffer(matches[2], 'base64')
			}
		}
	},
*/
    
    cookie : {

	    get (cookies) {
	        var object = {}
			if (cookies) {
		        var params = cookies.split('; ')
		        params.forEach(param => {
		            var bundle = param.split('=')
		            object[bundle[0]] = bundle[1]
		        })
		    }
	        return object
	    },
	    
	    set (cookies) {
	        var string = ''
	        for (var key in cookies) string += key +'='+ cookies[key] +'; '
	        return string
	    },
	
	    del (cookies, key) {
		    cookies[key] = '; expires=Thu, 01 Jan 1970 00:00:01 GMT'
	    },
    },

	search : {

		get (address) {
	        var object = {}
	        var query = address.split('?')[1]
			if (query && query.length > 0) {
		        var params = query.split('&')
		        params.forEach(param => {
		            var bundle = param.split('=')
		            object[bundle[0]] = bundle[1]
		        })
		    }
	        return object
	    },
	
	    set (query) {
	        var string = ''
	        for (var key in query)
	            string += key +'='+ query[key] +
	                (Object.keys(query).length > 1? '&': '')
	        return string
	    },
	},

    timeout : function (duration, interval, check, execute, timeout) {
        var count	= duration / interval
        var loop 	= setInterval (() => {
            check (success => {
                if (success) {
                    execute()
                    clearInterval(loop)
                }
            })
            if (count == 0) {
                timeout && timeout()
                clearInterval(loop)
            }
            count --
        }, interval * 1000)
    },
}


