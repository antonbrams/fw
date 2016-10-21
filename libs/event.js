


import {default as fwDom} from './dom'

export default {
    
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
    
    drag (dom, down, move, up) {
        var params = new Object();
        var touchstart = () => {
            fwDom.selection(false);
            params.event = this.type.touch?
                window.event.targetTouches[0]:
                window.event
            down(params)
            dom[this.type.down]            = null
            document.body[this.type.move]  = touchmove.bind(this)
            document.body[this.type.up]    = touchend.bind(this)
            document.body[this.type.out]   = touchend.bind(this)
        }
        
        var touchmove = () => {
            window.event.preventDefault()
            params.event = this.type.touch?
                window.event.targetTouches[0]:
                window.event
            move(params)
        }

        var touchend = () => {
           	fwDom.selection(true)
            document.body[this.type.move]    = null
            document.body[this.type.up]      = null
            dom[this.type.down]              = touchstart.bind(this)
            up(params)
        }
        dom[this.type.down] = touchstart.bind(this)
    },
    
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


