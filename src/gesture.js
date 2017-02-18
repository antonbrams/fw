


import {
    animation, vec, event, math, 
    Screen, matrix, Layer, val,
    geo, etc
} from './index'

var animationPreset = {
    time : .3, 
    ease : 'cubic-bezier(.1, .5, .1, 1.2)',
}

export default {
    
    wheel (layer, transport = {}) {
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
    
    resize (layer, transport = {}) {
        var edge = ['lt', 't', 'rt', 'l', 'r', 'lb', 'b', 'rb']
        var t    = {}
        var out  = {global: {min: {}, max: {}}}
        var Corner = side => {
            var div = document.createElement('div')
            div.classList.add('edge', side)
            var down = event.listener(div, event.types.down, e => {
                t.down = new vec(e.clientX, e.clientY)
                t.rect = layer.rect
                move.on()
                up.on()
                e.stop()
            })
            var move = event.listener(document, event.types.move, e => {
                var drag  = new vec(e.clientX, e.clientY).sub(t.down)
                var lSide = side == 'lt' || side == 'l' || side == 'lb'
                var tSide = side == 'lt' || side == 't' || side == 'rt'
                var size  = out.global? globalRange(out.global, drag, lSide || tSide): drag
                if (lSide) size.x *= -1
                if (tSide) size.y *= -1
                size = out.local? localRange(out.local, size): size
                if (side == 't' || side == 'b') size.x = 0
                if (side == 'l' || side == 'r') size.y = 0
                if (lSide) move.x = -size.x
                if (tSide) move.y = -size.y
                // export
                out.move = move
                out.size = size
                // move and resize
                if (transport.move && transport.move(out) !== false || !transport.move) {
                    layer.size = t.rect.size.add(size).unit('px')
                    layer.move = t.rect.position.add(move).unit('px')
                }
                e.stop()
            })
            var up = event.listener(document, event.types.up, e => {
                move.off()
                up.off()
                e.stop()
            })
            var globalRange = (range, drag, opposite) => {
                if (opposite) {
                    drag = drag
                        .add(t.rect.position)
                        .range({l: range.max.l, t: range.max.t, r: range.min.l, b: range.min.t})
                        .sub(t.rect.position)
                } else {
                    drag = drag
                        .add(t.rect.opposite)
                        .range({l: range.min.r, t: range.min.b, r: range.max.r, b: range.max.b})
                        .sub(t.rect.opposite)
                }
                return drag
            }
            var localRange = (range, size) => {
                size = size
                    .add(t.rect.size)
                    .range({l: range.min.x, t: range.min.y, r: range.max.x, b: range.max.y})
                    .sub(t.rect.size)
                return size
            }
            return {
                get active () {
                    return down.active
                },
                on () {
                    layer.dom.appendChild(div)
                    down.on()
                },
                off () {
                    layer.dom.removeChild(div)
                    down.off()
                },
            }
        }
        return {
            get active () {
                return edge[0].down.active
            },
            on () {
                edge.forEach(edge => {
                    if (val.isStr(edge)) edge = Corner(edge)
                    edge.on()
                })
                return this
            },
            off () {
                edge.forEach(edge => edge.off())
                return this
            },
            cancel () {
                return this
            },
        }
    },
    
    drag (layer, transport = {}) {
        var translate = new vec()
        var method = event.types.isTouch? '_initMultitouchGesture': '_dragMouse'
        return this[method](layer, etc.clone(transport, {
            move (t) {
                if (transport.move && transport.move(t) !== false || !transport.move) {
                    translate = t.translate
                    if (t.constraints) 
                        translate.range(t.constraints, true)
                    animation.draw(`${layer.identifier}: translate.move`,
                        () => layer.matrix = new matrix().translate(translate))
                }
            },
            cancel (t) {
                t.translate = translate
                if (transport.cancel && transport.cancel(t) !== false || !transport.cancel)
                    animation.draw(`${layer.identifier}: translate.cancel`,
                        () => layer.animate(animationPreset, {matrix : new matrix()}))
            }
        }), 'translate')
    },
    
    pinchToRotate (layer, transport = {}) {
        return this._initMultitouchGesture(layer, etc.clone(transport, {
            move (t) {
                if (transport.move && transport.move(t) !== false || !transport.move)
                    animation.draw(`${layer.identifier}: rotate.move`,
                        () => layer.rotate = t.rotate)
            },
            cancel (t) {
                if (transport.cancel && transport.cancel(t) !== false || !transport.cancel)
                    animation.draw(`${layer.identifier}: rotate.cancel`, 
                        () => layer.animate(animationPreset, {rotate : 0}))
            }
        }), 'rotate')
    },
    
    pinchToZoom (layer, transport = {}) {
        return this._initMultitouchGesture(layer, etc.clone(transport, {
            move (t) {
                if (transport.move && transport.move(t) !== false || !transport.move)
                    animation.draw(`${layer.identifier}: scale.move`, () => {
                        layer.scale = t.scale
                    })
            },
            cancel (t) {
                if (transport.cancel && transport.cancel(t) !== false || !transport.cancel)
                    animation.draw(`${layer.identifier}: scale.cancel`, () => {
                        layer.animate(animationPreset, {
                            scale : 1
                        })
                    })
            }
        }), 'scale')
    },
    
    /*
        this is the second layer of interaction
        for mouse are separate functions for dragging
        for touch is one single that splits translation, rotation and scale
    */
    
    _dragMouse (layer, transport) {
        var down     = new vec()
        var velocity = new vec()
        return this._dragMouseEventPattern(layer, etc.clone(transport, {
            down (t) {
                velocity
                down = velocity = t.pointer
                transport.down && transport.down({
                    event : t.event, 
                    down
                })
            },
            move (t) {
                var translate = t.pointer.sub(down)
                transport.move && transport.move({
                    event     : t.event, 
                    translate,
                    velocity  : translate.sub(velocity)
                })
                velocity = translate
            },
            cancel (t) {
                transport.cancel(t)
                down.reset()
                velocity.reset()
            },
        }))
    },
    
    _initMultitouchGesture (layer, transport, type) {
        var address = 'transformationTouchEventLink'
        if (!layer._props[address]) {
            var listener   = new event.Machine('transformationTouchEventLink')
            var transport_ = {constraints: {}}
            ;['init', 'down', 'move', 'up', 'cancel'].forEach(key => 
                transport_[key] = t => listener.emit(key, t))
            var toggle = this._multitouch(layer, transport_)
            layer._props[address] = {
                listener,
                transport : transport_,
                cancel    : toggle.cancel,
                checkToggle () {
                    var flag = 'off'
                    var property = ['translate', 'rotate', 'scale']
                    for (var i = 0; i < property.length; i ++)
                        if (transport_[property[i]]) {flag = 'on'; break}
                    toggle[flag]()
                }
            }
        }
        var link = layer._props[address]
        for (var key in transport)
            link.listener.on(key, ((method, key) => {
                return key == 'move'? t => {
                    // adapt output for every type
                    if (type == 'translate') t.translate = t.transformation.getTranslation()
                    if (type == 'rotate') t.rotate = t.transformation.getRotation().z
                    if (type == 'scale') t.scale = t.transformation.getScale().z
                    // execute event function
                    method(t)
                    // apply new transport to the whole
                    // transformation multitouch event
                    link.transport.constraints[type] = t.constraints
                    delete t.constraints
                }: method
            })(transport[key], key))
        return {
            get active () {
                return link.transport[type]
            },
            on () {
                link.transport[type] = true
                link.checkToggle()
                return this
            },
            off () {
                link.transport[type] = false
                link.checkToggle()
                return this
            },
            cancel : link.cancel,
        }
    },
    
    _multitouch (layer, transport) {
        // some shared values
        var touches      = {}
        var scale_rotate = new matrix()
        var lastState    = new matrix()
        var origin       = new vec()
        var center       = new vec()
        var translate    = new vec()
        // export control interface for gesture events
        return this._dragTouchEventPattern(layer, {
            init (t) {
                // get at start of a session 
                // a center of a layer
                center = layer.center
            },
            down (t) {
                // fire interface function
                transport.down && transport.down(t)
                // calculate average vector aka origin and
                // bring this origin on rotated and scaled object back
                origin = vec.prototype.mix(t.pointers)
                    .sub(center)
                    .sub(translate)
            },
            move (t) {
                // define max and min movement for rotation and scale
                // translation constraints happens later on touch and mouse together
                var rotate = t.event.rotation || 0
                var rConst = transport.constraints.rotate
                if (rConst) {
                    var last = lastState.getRotation().z
                    rotate = math.rubberRange(
                    rotate + last, rConst.min, rConst.max,
                    rConst.length || 10, rConst.onLimit) - last
                }
                var scale  = t.event.scale || 1
                var sConst = transport.constraints.scale
                if (sConst) {
                    var last = lastState.getScale().z
                    scale = math.rubberRange(
                    scale + last, sConst.min + 1, sConst.max + 1,
                    sConst.length || .2, sConst.onLimit) - last
                }
                // calculate drag difference
                var velocity = new vec()
                for (var id in t.pointers) {
                    // if a touch is not initialized, 
                    // save its vector to the list
                    if (!touches[id]) touches[id] = t.pointers[id]
                    // calculate difference between frames
                    velocity
                        .add(t.pointers[id], true)
                        .sub(touches[id], true)
                    // save value for the next time
                    touches[id] = t.pointers[id]
                }
                // calculate average difference between every dragged touch
                velocity.div(new vec().fill(t.event.targetTouches.length), true)
                // apply difference to persistent translation vector
                translate.add(velocity, true)
                // modify scale and rotation matrix
                var drag  = new matrix()
                var pinch = new matrix().translate(origin.scale(-1))
                if (transport.translate) drag.translate(translate, true)
                if (transport.rotate) pinch.rotate(rotate, true)
                if (transport.scale) pinch.scale(scale, true)
                scale_rotate = lastState.multiply(pinch.translate(origin))
                // get final transformation
                var transformation = scale_rotate.multiply(drag)
                // export values
                transport.move && transport.move({
                    event : t.event,
                    transformation,
                    velocity
                })
            },
            up (t) {
                // apply matrix for the next drag action
                if (t.event.targetTouches.length > 0) lastState = scale_rotate
                transport.up && transport.up(t)
            },
            cancel (t) {
                // export up event
                transport.cancel && transport.cancel(t)
                center.reset()
                lastState.reset()
                translate.reset()
                scale_rotate.reset()
                origin.reset()
                touches = {}
            },
        })
    },
    
    /*
        this is the lowest level of mouse and touch interaction principles
        support of four main methods: down, move, up and cancel
    */
    
    _dragMouseEventPattern (layer, transport) {
        var down = event.listener(layer.dom, 'mousedown', e => {
            if (!move.active) {
                move.on()
                up.on()
            }
            transport.down && transport.down({
                event   : e, 
                pointer : new vec(e.clientX, e.clientY)
            })
            e.preventDefault()
        })
        var move = event.listener(document, 'mousemove', e => {
            transport.move && transport.move({
                event   : e,
                pointer : new vec(e.clientX, e.clientY)
            })
            e.preventDefault()
        })
        var up = event.listener(document, 'mouseup', e => {
            var t = {
                event   : e,
                pointer : new vec(e.clientX, e.clientY)
            }
            transport.up && transport.up(t)
            cancel(t)
            e.preventDefault()
        })
        var cancel = (t = {}) => {
            move.off()
            up.off()
            transport.cancel && transport.cancel(t)
        }
        return {
            get active () {
                return down.active
            },
            on () {
                down.on()
                return this
            },
            off () {
                cancel()
                down.off()
                return this
            },
            cancel,
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
        var down = event.listener(layer.dom, 'touchstart', e => {
            if (!move.active) {
                move.on()
                up.on()
                transport.init({event: e})
            }
            transport.down && transport.down({
                event    : e,
                pointers : convertTouches(e.targetTouches)
            })
            e.preventDefault()
        })
        var move = event.listener(layer.dom, 'touchmove', e => {
            transport.move && transport.move({
                event    : e,
                pointers : convertTouches(e.targetTouches)
            })
            e.preventDefault()
        })
        var up = event.listener(layer.dom, 'touchend', e => {
            var t = {event: e}
            transport.up && transport.up(t)
            if (e.targetTouches.length == 0) cancel(t)
            e.preventDefault()
        })
        var cancel = (t = {}) => {
            move.off()
            up.off()
            transport.cancel && transport.cancel(t)
        }
        return {
            get active () {
                return down.active
            },
            on () {
                down.on()
                return this
            },
            off () {
                cancel()
                down.off()
                return this
            },
            cancel,
        }
    },
}


