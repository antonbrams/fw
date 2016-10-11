


export default {

	arg (arg) {
		return typeof arg !== 'undefined'
	},

	cloneObject (_object) {
		return JSON.parse(JSON.stringify(_object))
	},

	readFile (file, callback) {
	    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
			var reader = new FileReader()
			reader.onload = () => { 
				callback({
					name: file.name,
					data: this.result
				})
			}
			reader.readAsDataURL(file)
	    }
	},

	dropFile (zone, onready) {
		zone.ondragover		= () => { zone.classList.add('drop'); return false }
		zone.ondragleave	= () => { zone.classList.remove('drop') }
		zone.ondrop 		= (() => {
			zone.classList.remove('drop')
			var event 	= window.event
			var files 	= event.dataTransfer.files
			var output	= []
			for (var i = 0; i < files.length; i ++)
				this.readFile(files[i], function (file) {
					output.push(file);
					if (output.length == files.length) onready(output)
				})
			event.preventDefault()
		}).bind(this)
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
	
	compressImage (list, scale, quality, callback) {
		var output = []
		list.forEach(data => {
			var image		= document.createElement('img')
			image.onload 	= () => {
				var canvas 		= document.createElement('canvas')
				var context 	= canvas.getContext('2d')
				var width 		= this.width  * scale
				var height 		= this.height * scale
				canvas.width 	= width
				canvas.height 	= height
			    context.drawImage(this, 0, 0, width, height)
			    output.push(canvas.toDataURL("image/jpeg", quality))
			    if (output.length == list.length) callback(output)
			}
			image.src = data
		})
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
        var count	= duration / interval;
        var loop 	= setInterval (() => {
            check (success => {
                if (success) {
                    execute();
                    clearInterval(loop);
                }
            })
            if (count == 0) {
                if (timeout) timeout();
                clearInterval(loop)
            }
            count --;
        }, interval * 1000);
    },
}


