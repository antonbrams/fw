


import {
    animation, vec, event, math, 
    Screen, matrix, Layer, val
} from './fw'

export default {
    
    scroll (layer, transport = {}) {
        return layer.on('mousewheel', e => {
            var vector = 0
            var w = e.wheelDelta
            var d = e.detail
            if (d) {
                // Opera
                if (w) vector = w / d / 40 * d > 0? 1: -1
                // Firefox
                else vector = -d / 3
            // IE / Safari / Chrome
            } else vector = w / 120
            transport({e, vector})
        })
    },
    
    drag (layer, transport = {}) {
        return this[event.types.isTouch? '_multitouch': '_dragMouse'](layer, {
            down (t) {
                transport.down && transport.down()
            },
            move (t) {
                if (transport.move && transport.move(t) || !transport.move)
                    animation.draw(`${layer.identifier}: drag`, () => {
                        layer.matrix = t.transformation
                    })
            },
            up (t) {
                transport.up && transport.up(t)
            },
            cancel (t) {
                if (transport.cancel && transport.cancel(t) || !transport.cancel) 
                    animation.draw(`${layer.identifier}: up`, () => {
                        layer.animate({
                            time : .3, 
                            ease : 'cubic-bezier(.1, .5, .1, 1.5)'
                        },{
                            matrix : new matrix()
                        })
                    })
            },
            translate : val.exists(transport.translate)? transport.translate: true,
            rotate    : transport.rotate,
            scale     : transport.scale
        })
    },
    
    _dragMouse (layer, transport) {
        var down     = new vec()
        var velocity = new vec()
        return this._dragMouseEventPattern(layer, {
            down (e) {
                velocity
                down = velocity = e.pointer
                transport.down({e})
            },
            move (e) {
                var translation = e.pointer.sub(down)
                transport.move({e, 
                    transformation : new matrix().translate(translation),
                    velocity : translation.sub(velocity)
                })
                velocity = translation
            },
            up (e) {
                transport.up({e})
            },
            cancel (e) {
                transport.cancel({e})
                down.reset()
                velocity.reset()
            },
        })
    },
    
    _multitouch (layer, t) {
        // some shared values
        var touches      = {}
        var scale_rotate = new matrix()
        var lastState    = new matrix()
        var origin       = new vec()
        var center       = new vec()
        var translation  = new vec()
        // export control interface for gesture events
        return this._dragTouchEventPattern(layer, {
            init (e) {
                // get at start of a session 
                // a center of a layer
                center = layer.center
            },
            down (e) {
                // fire interface function
                t.down && t.down({e})
                // calculate average vector aka origin and
                // bring this origin on rotated and scaled object back
                origin = vec.prototype.mix(e.pointers)
                    .sub(center)
                    .sub(translation)
            },
            move (e) {
                // calculate drag difference
                var velocity = new vec()
                for (var id in e.pointers) {
                    // if a touch is not initialized, 
                    // save its vector to the list
                    if (!touches[id]) touches[id] = e.pointers[id]
                    // calculate difference between frames
                    velocity
                        .add(e.pointers[id], true)
                        .sub(touches[id], true)
                    // save value for the next time
                    touches[id] = e.pointers[id]
                }
                // calculate average difference between every dragged touch
                velocity.div(new vec().fill(e.targetTouches.length), true)
                // apply difference to persistent translation vector
                translation.add(velocity, true)
                // modify scale and rotation matrix
                var drag  = new matrix()
                var pinch = new matrix().translate(origin.scale(-1))
                if (t.translate) drag.translate(translation, true)
                if (t.rotate) pinch.rotate(e.rotation, true)
                if (t.scale) pinch.scale(e.scale, true)
                scale_rotate = lastState.multiply(pinch.translate(origin))
                var transformation = scale_rotate.multiply(drag)
                // export values
                t.move && t.move({e,
                    transformation,
                    velocity
                })
            },
            up (e) {
                // apply matrix for the next drag action
                if (e.targetTouches.length > 0) lastState = scale_rotate
                t.up && t.up({e})
            },
            cancel (e) {
                // export up event
                t.cancel && t.cancel({e})
                center.reset()
                lastState.reset()
                translation.reset()
                touches = {}
            }
        })
    },
    
    _dragMouseEventPattern (layer, transport) {
        var down = layer.on('mousedown', e => {
            e.pointer = new vec(e.clientX, e.clientY)
            if (!move.active) {
                move.on()
                up.on()
            }
            transport.down(e)
            e.preventDefault()
        })
        var move = Screen.on('mousemove', e => {
            e.pointer = new vec(e.clientX, e.clientY)
            transport.move(e)
            e.preventDefault()
        })
        var up = Screen.on('mouseup', e => {
            e.pointer = new vec(e.clientX, e.clientY)
            transport.up(e)
            cancel(e)
            e.preventDefault()
        })
        var cancel = (e = {}) => {
            move.off()
            up.off()
            transport.cancel(e)
        }
        return {
            on () {
                down.on()
                return this
            },
            off () {
                cancel()
                down.off()
                return this
            },
            cancel () {
                cancel() 
                return this
            },
            get active () {return down.active},
        }
    },
    
    _dragTouchEventPattern (layer, transport) {
        var convertTouches = fingers => {
            var out = {}
            for (var i = 0; i < fingers.length; i ++) 
                out[fingers[i].identifier] = new vec(
                    fingers[i].clientX,
                    fingers[i].clientY
                )
            return out
        }
        var down = layer.on('touchstart', e => {
            e.pointers = convertTouches(e.targetTouches)
            if (!move.active) {
                move.on()
                up.on()
                transport.init(e)
            }
            transport.down(e)
            e.preventDefault()
        })
        var move = layer.on('touchmove', e => {
            e.pointers = convertTouches(e.targetTouches)
            transport.move(e)
            e.preventDefault()
        })
        var up = layer.on('touchend', e => {
            transport.up(e)
            if (e.targetTouches.length == 0) cancel(e)
            e.preventDefault()
        })
        var cancel = (e = {}) => {
            move.off()
            up.off()
            transport.cancel(e)
        }
        return {
            on () {
                down.on()
                return this
            },
            off () {
                cancel()
                down.off()
                return this
            },
            cancel () {
                cancel() 
                return this
            },
            get active () {return down.active},
        }
    },
}


