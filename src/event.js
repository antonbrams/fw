


import {arr, val, vec, debug, array, Layer} from './index'

export default {
    
    Machine (namespace = 'event', debug = false) {
        var log = (msg, topic, payload) => {
            if (out.debug) {
                var obj = {
                    topic,
                    timestamp : new Date().getTime()
                }
                if (val.exists(payload)) Object.assign(obj, {payload})
                console.log(`[${namespace}] ${msg}`, obj)
            }
        }
        var topics = {}
        var out = {
            debug,
            on (topic, callback) {
                if (!topics[topic]) topics[topic] = []
                return {
                    get active () {
                        return topics[topic] 
                            && topics[topic].indexOf(callback) > -1
                    },
                    on () {
                        if (!this.active) {
                            log('subscribed to', topic)
                            topics[topic].push(callback)
                        }
                        return this
                    },
                    off () {
                        if (this.active) {
                            log('unsubscribed from', topic)
                            array.delete(topics[topic], callback)
                        }
                        return this
                    }
                }.on()
            },
            emit (topic, payload) {
                log('fired', topic, payload)
                if (topics[topic])
                    topics[topic].forEach(callback => callback(payload))
                return this
            }
        }
        return out
    },
    
    listener (dom, type, callback, flag) {
        var fn = e => {
            e.undef = () => {e.preventDefault(); return e}
            e.stop  = () => {e.stopPropagation(); return e}
            e.block = () => e.undef().stop()
            return callback(e)
        }
        return {
            active : false,
            on () {
                if (!this.active) {
                    this.active = true
                    dom.addEventListener(type, fn, flag)
                }
                return this
            },
            off () {
                if (this.active) {
                    this.active = false
                    dom.removeEventListener(type, fn, flag)
                }
                return this
            }
        }
    },
    
    support (element, type) {
        var supported = `on${type}` in element
        if (!supported) {
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
        var dropZone = layer.on('file', {
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
    
	fileDrop (layer, t = {}) {
        var over = this.listener(layer.dom, 'dragover',  e => {
            t.in && t.in({e})
            leave.on()
            drop.on()
            e.preventDefault()
        })
        var leave = this.listener(layer.dom, 'dragleave', e => {
            t.out && t.out({e})
            leave.off()
            drop.off()
            e.preventDefault()
        })
        var drop = this.listener(layer.dom, 'drop', e => {
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
            get active () {
                return over.active
            },
            on () {
                over.on()
                return this
            },
            off () {
                over.off()
                return this
            }
        }
	},
    
}


