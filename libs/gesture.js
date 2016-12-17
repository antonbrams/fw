


import {animation, vec, event, math, Screen, matrix, Layer} from './fw'

var offset = new vec()

export default {
    
    dragTouch (layer, params) {
        var transport = {}
        var touches   = {}
        var position  = new vec()
        var down = layer.on('touchstart', e => {
            if (!move.active) move.on()
            if (!up.active) up.on()
            params.down()
            e.preventDefault()
        }, true).on()
        var move = layer.on('touchmove', e => {
            var diff   = new vec()
            var length = e.targetTouches.length
            for (var i = 0; i < length; i ++) {
                var touch   = e.targetTouches[i]
                var pointer = new vec(touch.clientX, touch.clientY)
                if (!touches[touch.identifier]) touches[touch.identifier] = pointer
                diff.add(pointer, true).sub(touches[touch.identifier], true)
                touches[touch.identifier] = pointer
            }
            diff.div({x: length, y: length}, true)
            params.move(position.add(diff, true))
            e.preventDefault()
        }, true)
        var up = layer.on('touchend', e => {
            for (var i = 0; i < e.changedTouches.length; i ++)
                delete touches[e.changedTouches[i].identifier]
            if (e.targetTouches.length == 0) cancel()
            e.preventDefault()
        }, true)
        var cancel = e => {
            move.off()
            up.off()
            params.up(transport)
            transport = {}
            touches   = {}
            position.reset()
        }
        layer.on('touchcancel', cancel, true).on()
        return {down, cancel}
    },
    
    dragMouse (layer, params) {
        var transport    = {}
        var downPosition = new vec()
        var down = layer.on('mousedown', e => {
            downPosition = new vec(e.clientX, e.clientY)
            move.on()
            up.on()
            e.preventDefault()
        }, true).on()
        var move = Screen.on('mousemove', e => {
            var movePosition = new vec(e.clientX, e.clientY)
            params.move(movePosition.sub(downPosition))
            e.preventDefault()
        }, true)
        var up = Screen.on('mouseup', e => {
            cancel()
            e.preventDefault()
        }, true)
        var cancel = e => {
            move.off()
            up.off()
            params.up(transport)
            transport = {}
        }
        return {down, cancel}
    },
    
    drag (layer, options = {}) {
        var dragType = event.types.isTouch? 'dragTouch': 'dragMouse'
        var t = {
            dragInit : null,
            velocity : new vec()
        }
        var lastFramePosition = new vec()
        var controls = this[dragType](layer, {
            down () {
                if (options.down) options.down()
            },
            move (translate) {
                if (!t.dragInit) {
                    if (translate.len() > 5) {
                        t.dragInit = translate.copy()
                        if (options.init) options.init()
                    }
                } else {
                    t.translation = translate.sub(t.dragInit)
                    // velocity calculation
                    t.velocity        = t.translation.sub(lastFramePosition)
                    lastFramePosition = t.translation
                    // math.rubberRange(value, min, max, range, state)
                    if (options.move)
                        options.move(t)
                    else
                        // animation.draw(`${layer.identifier}: drag`, () => {
                            layer.matrix = new matrix().translate(t.translation.add(offset))
                        // })
                }
            },
            up () {
                if (options.up) 
                    options.up()
                else
                    // animation.draw(`${layer.identifier}: drag`, () => {
                        layer.animate({time: .2, ease: 'cubic-bezier(.1, .5, .1, 1.5)'}, {
                            matrix : new matrix()
                        })
                    // })
                lastFramePosition.reset()
                t = {}
            }
        })
        return {
            on () {
                controls.down.on()
                return layer
            },
            off () {
                controls.down.off()
                return layer
            },
            cancel () {
                controls.cancel()
                return layer
            },
        }
    },
    
    _iterateTouches (touches, callback) {
        for (var i = 0; i < touches.length; i ++) {
            var t = touches[i]
            callback(
                new vec(t.clientX, t.clientY), 
                t, touches.length, touches
            )
        }
    },
    
    zoom (layer, options = {}) {
        var touches      = {}
        var scale_rotate = new matrix()
        var lastState    = new matrix()
        var origin       = new vec()
        var center       = new vec()
        var translation  = new vec()
        var down = layer.on('touchstart', e => {
            if (!move.active) {
                move.on()
                up.on()
                center = layer.center
            }
            var touchesToVectors = []
            this._iterateTouches(e.targetTouches, 
                vector => touchesToVectors.push(vector))
            origin = vec.prototype.mix(touchesToVectors)
                .sub(center)
                .sub(translation)
            e.preventDefault()
        }).on()
        var move = layer.on('touchmove', e => {
            var differenceFrame = new vec()
            this._iterateTouches(e.targetTouches, (vector, touch) => {
                if (!touches[touch.identifier])
                    touches[touch.identifier] = vector
                differenceFrame
                    .add(vector, true)
                    .sub(touches[touch.identifier], true)
                touches[touch.identifier] = vector
            })
            differenceFrame.div(new vec().fill(e.targetTouches.length), true)
            translation.add(differenceFrame, true)
            scale_rotate = lastState
                .translate(origin.scale(-1))
                .rotate(e.rotation)
                .scale(e.scale)
                .translate(origin)
            var transformation = scale_rotate.translate(translation)
            animation.draw(`${layer.identifier}: drag`, () => {
                layer.matrix = transformation
            })
            e.preventDefault()
        })
        var up = layer.on('touchend', e => {
            var length = e.targetTouches.length
            if (length == 0)
                cancel()
            else
                lastState = scale_rotate
            e.preventDefault()
        })
        var cancel = () => {
            move.off()
            up.off()
            animation.draw(`${layer.identifier}: drag`, () => {
                layer.animate({time: .3, ease: 'cubic-bezier(.1, .5, .1, 1.5)'}, {
                    matrix : new matrix()
                })
            })
            center.reset()
            lastState.reset()
            translation.reset()
            touches = {}
        }
        return {
            on () {
                down.on()
                return layer
            },
            off () {
                down.off()
                return layer
            },
            cancel () {
                cancel()
                return layer
            },
        }
    },
}


