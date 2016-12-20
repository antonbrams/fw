


import {arr, val, vec, debug, Layer} from './fw'

export default {
    
    Machine : class {
        
        constructor (namespace = 'event', debug = false) {
            this.namespace = `[${namespace}]`
            this.debug     = debug
            this.topics    = {}
        }
        
        on (topic, fn) {
            if (this.debug) 
                console.log(`${this.namespace} subscribed to`, topic)
            if (!this.topics[topic])
                this.topics[topic] = []
            this.topics[topic].push(fn)
            return this
        }
        
        emit (topic, t) {
            if (this.debug) 
                console.log(`${this.namespace} fired`, topic)
            if (this.topics[topic])
                this.topics[topic].forEach(fn => fn(t))
            return this
        }
    },
    
    listener (dom, type, callback, flag) {
        var _active = false
        var out = {
            on () {
                if (!_active) {
                    _active = true
                    dom.addEventListener(type, callback, flag)
                }
                return out
            },
            off () {
                if (_active) {
                    _active = false
                    dom.removeEventListener(type, callback, flag)
                }
                return out
            },
            get active () {
                return _active
            }
        }
        return out
    },
    
    support (element, type) {
        var supported = `on${type}` in element
        if (!supported) {
            // TODO: check this one: element[type]
            element.setAttribute(type, null)
            supported = typeof element[type] === 'function'
        }
        return supported
    },
    
    types : (() => {
        if (val.exists(window)) {
	        var isTouch = 'ontouchstart' in window // window.PointerEvent
	        return {
	            isTouch,
                tap    : 'click',
	            down   : isTouch? 'touchstart': 'mousedown',
	            move   : isTouch? 'touchmove': 'mousemove',
	            up     : isTouch? 'touchend': 'mouseup',
                in     : isTouch? null: 'mouseenter',
	            out    : isTouch? null: 'mouseleave',
                cancel : isTouch? 'touchcancel': null,
                scroll : 'scroll',
                change : 'change'
	        }
        }
    })(),
    
    /*
        toggle.on('file', {
            in () {
                layer.bg({color: 'red'})
            },
            out () {
                layer.bg({color: null})
            },
            drop (data) {
                console.log(data)
            }
        }).on()    
    */
    
	file (layer, t = {}) {
        var over = layer.on('dragover',  e => {
            t.in && t.in({e})
            leave.on()
            drop.on()
            e.preventDefault()
        })
        var leave = layer.on('dragleave', e => {
            t.out && t.out({e})
            leave.off()
            drop.off()
            e.preventDefault()
        })
        var drop = layer.on('drop', e => {
            t.out && t.out({e})
        	var read = (file, callback) => {
        	    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        			var reader = new FileReader()
        			reader.onload = function (e) {
        				callback({
                            name : file.name, 
                            data : this.result
                        })
                    }
        			reader.readAsDataURL(file)
        	    }
        	}
			var files = e.dataTransfer.files
			var out	= []
			for (var i = 0; i < files.length; i ++)
				read(files[i], data => {
					out.push(data)
					if (out.length == files.length && t.drop)
                        t.drop(out)
				})
			e.preventDefault()
        })
        return {
            on () {
                over.on()
                return this
            },
            off () {
                over.off()
                return this
            },
            get active () {return over.active}
        }
	},
    
}


