


import {arr, val, vec, debug, Layer} from './fw'

var topics = {}

export default {
    
    // event engine
    on (topic, bang, id) {
        if (!topics[topic])
            topics[topic] = []
        topics[topic].push(bang)
    },

    emit (topic, transport) {
        if (debug.enable) console.log('[event] fired:', topic)
        if (topics[topic])
            topics[topic].forEach(bang => bang(transport))
    },
    
    // on resize debouncer
	windowResize : class {
		
		constructor (onDragStart, onDragUpdate, onDragRelease) {
			this.timeout 			= null
			this.onDragStartFlag 	= null
			this.onDragStart		= onDragStart
			this.onDragUpdate 		= onDragUpdate
			this.onDragRelease 		= onDragRelease
		}
        
		call () {
			this.checkStart()
			if (this.onDragUpdate) this.onDragUpdate()
	        clearTimeout(this.timeout)
	        this.timeout = setTimeout(this.onEnd.bind(this), 200)
		}
		
		checkStart () {
			if (!this.onDragStartFlag) {
			    this.onDragStartFlag = true
			    if (this.onDragStart) this.onDragStart()
		    }
		}
        
		onEnd () {
			if (this.onDragStartFlag) {
				this.onDragStartFlag = false
				if (this.onDragRelease) this.onDragRelease()
			}
		}
	},
    
    // event types
    types : (() => {
        if (val.exists(window)) {
	        var isTouch = 'ontouchstart' in window
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
    
    gestureDrag (layer, options = {}) {
        var t = {}
        var down = e => {
            document.addEventListener(this.types.move, move, true)
            document.addEventListener(this.types.up, up, true)
            t.down  = new vec(e.clientX, e.clientY)
            t.event = e
            options.down && options.down(t)
            e.preventDefault()
            e.stopPropagation()
        }
        var move = e => {
            t.move = new vec(e.clientX, e.clientY)
            if (!t.recognized && t.move.sub(t.down).len() > 10) {
                t.recognized = true
                t.down = t.move.copy()
            }
            if (t.recognized) {
                t.event = e
                t.dist  = t.move.sub(t.down)
                options.move && options.move(t)
                layer.translate = t.dist.unit('px')
            }
            e.preventDefault()
            e.stopPropagation()
        }
        var up = e => {
            document.removeEventListener(this.types.move, move, true)
            document.removeEventListener(this.types.up, up, true)
            if (t.recognized) {
                t.event = e
                options.up && options.up(t)
                layer.set({
                    translate : new vec(),
                    move      : layer.move.add(t.dist).unit('px')
                })
            }
            t = {}
            e.preventDefault()
            e.stopPropagation()
        }
        layer.dom.addEventListener(this.types.down, down, true)
        var out = {
            on : () => {
                layer.dom.addEventListener(this.types.down, down, true)
                return out
            },
            off : () => {
                options.cancel && options.cancel()
                layer.dom.removeEventListener(this.types.down, down, true)
                document.removeEventListener(this.types.move, move, true)
                document.removeEventListener(this.types.up, up, true)
                return out
            }
        }
        return out
    }
}


