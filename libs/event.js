


import {arr}   from './array'
import {debug} from './fw'

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
    
    // event watcher
    watcher : class {
        
        constructor (object, ev, callback, flag) {
            this.object   = object
            this.ev       = ev
            this.callback = callback
            this.flag     = flag
        }
        
        on (bool) {
            this.object.addEventListener
                (this.ev, this.callback, this.flag)
            if (bool) this.callback()
        }
        
        off () {
            this.object.removeEventListener
                (this.ev, this.callback, this.flag)
        }
        
        destroy () {
            this.off()
            delete this
        }
    },
    
    attach (object, ev, callback, flag) {
        object.data     = object.data || {}
        object.data[ev] = callback
        object.data[ev].on = function () {
            object.addEventListener
                (ev, object.data[ev], flag)
        }
        object.data[ev].off = function () {
            object.removeEventListener
                (ev, object.data[ev], flag)
        }
        return object.data[ev]
    },
    
    // event types
    type : (() => {
        if (typeof window !== 'undefined') {
	        var isTouch = 'ontouchstart' in window
	        return {
	            touch:  isTouch,
	            down:   isTouch? 'ontouchstart' : 'onmousedown',
	            move:   isTouch? 'ontouchmove'  : 'onmousemove',
	            up:     isTouch? 'ontouchend'   : 'onmouseup',
	            out:	'onmouseleave'
	        }
        }
    })(),
    
    // on resize debouncer
	resize : class {
		
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
}


