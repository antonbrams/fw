


import {arr, val, vec, debug, Layer} from './fw'

var topics = {}

export default {
    
    // event engine
    on (topic, bang) {
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
    
    gesture (layer, options) {
        var t = {}
        var down = e => {
            t.event   = e
            t.isTouch = this.types.isTouch
            document.addEventListener(this.types.move, move, true)
            document.addEventListener(this.types.up, up, true)
            options.down(t)
            e.preventDefault()
        }
        var move = e => {
            t.event   = e
            t.isTouch = this.types.isTouch
            options.move(t)
            e.preventDefault()
        }
        var up = e => {
            t.event   = e
            t.isTouch = this.types.isTouch
            if (!options.up(t)) return false
            document.removeEventListener(this.types.move, move, true)
            document.removeEventListener(this.types.up, up, true)
            t = {}
            e.preventDefault()
        }
        layer.dom.addEventListener(this.types.down, down, true)
        var out = {
            on : () => {
                layer.dom.addEventListener(this.types.down, down, true)
                return out
            },
            off : () => {
                layer.dom.removeEventListener(this.types.down, down, true)
                document.removeEventListener(this.types.move, move, true)
                document.removeEventListener(this.types.up, up, true)
                return out
            }
        }
        return out
    },
    
    gestureDrag (layer, options = {}) {
        return this.gesture(layer, {
            down (t) {
                if (t.isTouch) {
                    var touch   = t.event.touches
                    var fingerA = new vec(touch[0].clientX, touch[0].clientY)
                    if (touch.length > 1) {
                        var fingerB = new vec(touch[1].clientX, touch[1].clientY)
                        t.down = fingerA.to(fingerB, .5)
                    } else {
                        t.down = fingerA
                    }
                } else {
                    t.down = new vec(t.event.clientX, t.event.clientY)
                }
                options.down && options.down(t)
            },
            move (t) {
                if (t.isTouch) {
                    var touch   = t.event.touches
                    var fingerA = new vec(touch[0].clientX, touch[0].clientY)
                    if (touch.length > 1) {
                        var fingerB = new vec(touch[1].clientX, touch[1].clientY)
                        t.move = fingerA.to(fingerB, .5)
                    } else {
                        t.move = fingerA
                    }
                } else {
                    t.move = new vec(t.event.clientX, t.event.clientY)
                }
                if (!t.recognized && t.move.sub(t.down).len() > 5) {
                    t.recognized = true
                    t.down = t.move.copy()
                    layer.pop()
                    layer.addClass('drag')
                }
                if (t.recognized) {
                    var a = layer.props.pop.offset.position
                    t.dist = t.move.sub(t.down)
                    options.move && options.move(t)
                    layer.translate = t.dist.add(a).unit('px')
                }
            },
            up (t) {
                if (t.isTouch) {
                    var touch = t.event.touches
                    if (touch.length > 0) return false
                }
                if (t.recognized) {
                    options.up && options.up(t)
                    layer.push()
                    layer.deleteClass('drag')
                }
                return true
            }
        })
    },
    
    gesturePinch (layer, options = {}) {
        return this.gesture(layer, {
            down (t) {
                if (t.isTouch) {
                    var touch   = t.event.touches
                    var fingerA = new vec(touch[0].clientX, touch[0].clientY)
                    var fingerB = new vec(touch[1].clientX, touch[1].clientY)
                    t.downDist  = fingerA.sub(fingerB).len()
                }
                options.down && options.down(t)
            },
            move (t) {
                if (t.isTouch) {
                    var touch    = t.event.touches
                    var fingerA  = new vec(touch[0].clientX, touch[0].clientY)
                    var fingerB  = new vec(touch[1].clientX, touch[1].clientY)
                    var moveDist = fingerA.sub(fingerB).len()
                    var diff     = moveDist - t.downDist
                    layer.scale = 1 + diff * .01
                }
                options.move && options.move(t)
            },
            up (t) {
                options.up && options.up(t)
                return true
            }
        })
    },
}


