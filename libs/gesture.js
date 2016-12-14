


import {animation, vec, event, math, Screen} from './fw'

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
        // var offset = new vec()
        var controls = this[dragType](layer, {
            down () {
                // offset = layer.translate.copy().ununit()
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
                            layer.translate = t.translation.add(offset).unit('px')
                        // })
                }
            },
            up () {
                if (options.up) 
                    options.up()
                else
                    // animation.draw(`${layer.identifier}: drag`, () => {
                        layer.animate({time: .2, ease: 'cubic-bezier(.1, .5, .1, 1.5)'}, {
                            translate : new vec()
                        })
                    // })
                lastFramePosition.reset()
                // offset.reset()
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
    
    zoom (layer, options = {}) {
        var value = 1
        var scale = 1
        var updateOrigin = e => {
            var fingers = []
            for (var i = 0; i < e.targetTouches.length; i ++)
                fingers.push(new vec(
                    e.targetTouches[i].clientX,
                    e.targetTouches[i].clientY
                ))
            var rect = layer.rect
            var origin = vec.prototype.mix(fingers).sub(rect.position).scale(1/scale)
            layer.child('.layer')[0].move = origin.unit('px')
            var a = origin.sub(rect.size.scale(.5)).scale(scale-1)
            var b = a.sub(offset)
            offset = a
            layer.set({
                origin    : origin,
                translate : layer.translate.ununit().add(b).unit('px')
            })
        }
        var down = layer.on('touchstart', e => {
            updateOrigin(e)
            if (!move.active) move.on()
            if (!up.active) up.on()
            e.preventDefault()
        }, true).on()
        var move = layer.on('touchmove', e => {
            // animation.draw(`${layer.identifier}: zoom`, () => {
                scale = value + e.scale - 1
                layer.scale = scale
            // })
            e.preventDefault()
        }, true)
        var up = layer.on('touchend', e => {
            var length = e.targetTouches.length
            if (length == 0)
                cancel()
            else if (length == 1)
                value += e.scale - 1
            e.preventDefault()
        }, true)
        var cancel = () => {
            move.off()
            up.off()
            // animation.draw(`${layer.identifier}: zoom`, () => {
                layer.animate({time: .2, ease: 'cubic-bezier(.1, .5, .1, 1.5)'}, {
                    scale : new vec().fill(1)
                })
            // })
            value = 1
            scale = 1
            offset.reset()
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


