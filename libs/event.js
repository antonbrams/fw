


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
        var toggle = false
        var out = {
            on () {
                if (!toggle) {
                    toggle = true
                    dom.addEventListener(type, callback, flag)
                }
                return out
            },
            off () {
                if (toggle) {
                    toggle = false
                    dom.removeEventListener(type, callback, flag)
                }
                return out
            },
            get active () {
                return toggle
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
                enter  : isTouch? null: 'mouseenter',
	            out    : isTouch? null: 'mouseleave',
                cancel : isTouch? 'touchcancel': null,
                scroll : 'scroll',
                change : 'change'
	        }
        }
    })(),
    
}


