


import './style.sass'
import {
    animation, vec, event, math, 
    Screen, matrix, Layer, val,
    geo, etc
} from '../../index'

var animationPreset = {
    time : .3, 
    ease : 'cubic-bezier(.1, .5, .1, 1.2)',
}

var cornerInterface = (layer, transport) => {
    var edges = transport.edges || ['lt', 't', 'rt', 'l', 'r', 'lb', 'b', 'rb']
    var Corner = side => {
        var div = document.createElement('div')
        div.classList.add('edge', transport.type || 'resize', side)
        var down = event.listener(div, event.types.down, e => {
            transport.down && transport.down({
                event   : e,
                pointer : new vec(e.clientX, e.clientY),
                side
            })
            move.on(); up.on(); e.stop()
        })
        var move = event.listener(document, event.types.move, e => {
            transport.move && transport.move({
                event   : e,
                pointer : new vec(e.clientX, e.clientY),
                side
            })
            e.stop()
        })
        var up = event.listener(document, event.types.up, e => {
            transport.up && transport.up({event : e, side})
            move.off(); up.off(); e.stop()
        })
        return {
            on  () {layer.dom.appendChild(div); down.on()},
            off () {layer.dom.removeChild(div); down.off()},
            get active () {return down.active}
        }
    }
    return {
        on () {
            for (var i = 0; i < edges.length; i ++) {
                if (val.isStr(edges[i])) edges[i] = Corner(edges[i])
                edges[i].on()
            }
            return this
        },
        off () {edges.forEach(edge => edge.off()); return this},
        get active () {return edges[0].down.active}
    }
}


/*
    this is the second layer of interaction
    for mouse are separate functions for dragging
    for touch is one single that splits translation, rotation and scale
*/

var dragMouse = (layer, transport) => {
    return dragMouseEventPattern(layer, etc.clone(transport, {
        move (t) {
            t.translate = t.onMovePointer.sub(t.onDownPointer)
            transport.move && transport.move(t)
        }
    }))
}

var initMultitouchGesture = (layer, transport, type) => {
    var address = 'transformationTouchEventLink'
    if (!layer._props[address]) {
        var listener   = new event.Machine('transformationTouchEventLink')
        var transport_ = {constraints: {}}
        ;['init', 'down', 'move', 'up', 'cancel'].forEach(key => 
            transport_[key] = t => listener.emit(key, t))
        var toggle = multitouch(layer, transport_)
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
}

var multitouch = (layer, transport) => {
    // some shared values
    var touches      = {}
    var scale_rotate = new matrix()
    var lastState    = new matrix()
    var origin       = new vec()
    var center       = new vec()
    var translate    = new vec()
    // export control interface for gesture events
    return dragTouchEventPattern(layer, {
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
}

/*
    this is the lowest level of mouse and touch interaction principles
    support of four main methods: down, move, up and cancel
*/

var dragMouseEventPattern = (layer, transport) => {
    var t = {}
    var down = event.listener(layer.dom, 'mousedown', e => {
        down.off(); move.on(); up.on(); e.preventDefault()
        Object.assign(t, {
            event : e,
            onDownPointer : new vec(e.clientX, e.clientY)
        })
        transport.down && transport.down(t)
    })
    var move = event.listener(document, 'mousemove', e => {
        Object.assign(t, {
            event : e,
            onMovePointer : new vec(e.clientX, e.clientY)
        })
        transport.move && transport.move(t)
        e.preventDefault()
    })
    var up = event.listener(document, 'mouseup', e => {
        Object.assign(t, {
            event       : e,
            onUpPointer : new vec(e.clientX, e.clientY)
        })
        transport.up && transport.up(t)
        down.on(); move.off(); up.off(); t = {}; e.preventDefault()
    })
    return {
        get active () {return down.active},
        on () {
            down.on()
            return this
        },
        off () {
            down.off()
            return this
        }
    }
}

var dragTouchEventPattern = (layer, transport) => {
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
}

/*
    Export interface
*/

export default {
    
    wheel (layer, callback) {
        return layer.on('mousewheel', e => {
            var v = 0
            var w = e.wheelDelta
            var d = e.detail
            if (d) {
                // Opera
                if (w) v = w / d / 40 * d > 0? 1: -1
                // Firefox
                else v = -d / 3
            // IE / Safari / Chrome
            } else v = w / 120
            callback({e, vector: v})
        })
    },
    
    rotate (layer, transport = {}) {
        var t     = {}
        var out   = {}
        return cornerInterface(layer, {
            type  : 'rotate',
            edges : transport.edges,
            down (a) {
                t.center = layer.center
                t.init   = layer.rotate
                t.down   = t.center.sub(a.pointer).angle2d() + parseInt(t.init)
            },
            move (a) {
                var rotation = t.down - t.center.sub(a.pointer).angle2d()
                if (out.constraints)
                    rotation = math.rubberRange(
                        rotation,
                        out.constraints.min,
                        out.constraints.max,
                        out.constraints.length || 10, 
                        out.constraints.onLimit
                    )
                // move and resize
                if (transport.move && transport.move(out) !== false || !transport.move)
                    animation.draw(`${layer.identifier}: resize.move`, 
                        () => layer.rotate = rotation)
            },
            up (a) {
                if (transport.up && transport.up(t) !== false || !transport.up)
                    animation.draw(`${layer.identifier}: resize.up`, () => 
                        layer.animate(animationPreset, {rotate : t.init}))
            }
        })
    },
    
    resize (layer, transport = {}) {
        var t   = {}
        var out = {}
        var globalConstraints = c => (
                c.min && (c.min.l || c.min.t || c.min.r || c.min.b)  
            ||  c.max && (c.max.l || c.max.t || c.max.r || c.max.b))
        var localConstraints = c => (
                c.min && (c.min.w || c.min.h)  
            ||  c.max && (c.max.w || c.max.h))
        var globalRange = (range, drag, side) => {
            var leftTop = drag
                .add(t.rect.position)
                .range({
                    l: range.max.l, t: range.max.t, 
                    r: range.min.l, b: range.min.t, 
                    length: range.length || 20
                })
                .sub(t.rect.position)
            var rightBottom = drag
                .add(t.rect.opposite)
                .range({
                    l: range.min.r, t: range.min.b, 
                    r: range.max.r, b: range.max.b, 
                    length: range.length || 20
                })
                .sub(t.rect.opposite)
            return new vec(
                (side.match('l')? leftTop: rightBottom).x, 
                (side.match('t')? leftTop: rightBottom).y
            )
        }
        var localRange = (range, size) => {
            size = size
                .add(t.rect.size)
                .range({
                    l: range.min.w, t: range.min.h, 
                    r: range.max.w, b: range.max.h, 
                    length: range.length || 20
                })
                .sub(t.rect.size)
            return size
        }
        return cornerInterface(layer, {
            type  : 'resize',
            edges : transport.edges,
            down (a) {
                t.down = a.pointer
                t.rect = layer.rect
            },
            move (a) {
                var lSide = a.side == 'lt' || a.side == 'l' || a.side == 'lb'
                var tSide = a.side == 'lt' || a.side == 't' || a.side == 'rt'
                var drag  = a.pointer.sub(t.down)
                // create size and set global constraints (absolute: l | t | r | b)
                var size  = out.constraints && globalConstraints(out.constraints)? 
                    globalRange(out.constraints, drag, a.side): drag
                // resizing on the left/top side? invert motion
                if (lSide) size.x *= -1
                if (tSide) size.y *= -1
                // edit size and set local constraints (min max: width | height)
                size = out.constraints && localConstraints(out.constraints)? 
                    localRange(out.constraints, size): size
                // movement on middle handles? set perpendicular axis to 0 
                if (a.side == 't' || a.side == 'b') size.x = 0
                if (a.side == 'l' || a.side == 'r') size.y = 0
                // resizing on the left/top side? shift layer in opposite direction
                var move = new vec()
                if (lSide) move.x = -size.x
                if (tSide) move.y = -size.y
                // export values
                out.move = move
                out.size = size
                // move and resize
                if (transport.move && transport.move(out) !== false || !transport.move)
                    animation.draw(`${layer.identifier}: resize.move`, () => 
                        layer.set({
                            size : t.rect.size.add(size).unit('px'),
                            move : t.rect.position.add(move).unit('px')
                        }))
            },
            up (a) {
                if (transport.up && transport.up(t) !== false || !transport.up)
                    animation.draw(`${layer.identifier}: resize.up`, () => 
                        layer.animate(animationPreset, {
                            move : t.rect.position.unit('px'),
                            size : t.rect.size.unit('px')
                        }))
            }
        })
    },
    
    drag (layer, transport = {}) {
        var translate   = new vec()
        var method      = event.types.isTouch? initMultitouchGesture: dragMouse
        var temp        = {}
        var globalRange = (c, translate) => {
            var size = temp.rect.size.scale(.5)
            if (c.l) c.l += size.x
            if (c.r) c.r -= size.x
            if (c.t) c.t += size.y
            if (c.b) c.b -= size.y
            return translate
                .add(temp.center)
                .range(c)
                .sub(temp.center)
        }
        return method(layer, etc.clone(transport, {
            down (t) {
                temp.rect   = layer.rect
                temp.center = layer.center
                temp.init   = false
            },
            move (t) {
                // init drag
                if (!temp.init) {
                    if (t.translate.len > 5) {
                        temp.init       = true
                        t.onDownPointer = t.onMovePointer
                        t.translate     = new vec()
                        transport.down && transport.down(t)
                    }
                // if initialized
                } else {
                    // global range
                    var translate = t.constraints? 
                        globalRange(t.constraints, t.translate):
                        t.translate
                    // velocity
                    t.velocity = t.translate.sub(translate)
                    // apply translate to export
                    t.translate = translate
                    // call interface function
                    var def = transport.move && transport.move(t) !== false || !transport.move
                    // move if return true
                    if (def) animation.draw(`${layer.identifier}: translate.move`, () => 
                        layer.matrix = new matrix().translate(t.translate))
                }
            },
            up (t) {
                // if user has clicked
                if (!temp.init)
                    transport.click && transport.click(t)
                // bring it back
                else if (transport.up && transport.up(t) !== false || !transport.up) {
                    if (t.target) layer.set({
                        matrix    : new matrix().translate(layer.rect.position.sub(t.target)),
                        translate : t.target.unit('px')
                    })
                    animation.draw(`${layer.identifier}: translate.cancel`, () => 
                        layer.animate(animationPreset, {
                            matrix : new matrix()
                        }, () => transport.end && transport.end(t)))
                }
            }
        }), 'translate')
    },
    
    // pinchToRotate (layer, transport = {}) {
    //     return initMultitouchGesture(layer, etc.clone(transport, {
    //         move (t) {
    //             if (transport.move && transport.move(t) !== false || !transport.move)
    //                 animation.draw(`${layer.identifier}: rotate.move`,
    //                     () => layer.rotate = t.rotate)
    //         },
    //         cancel (t) {
    //             if (transport.cancel && transport.cancel(t) !== false || !transport.cancel)
    //                 animation.draw(`${layer.identifier}: rotate.cancel`, 
    //                     () => layer.animate(animationPreset, {rotate : 0}))
    //         }
    //     }), 'rotate')
    // },
    // 
    // pinchToZoom (layer, transport = {}) {
    //     return initMultitouchGesture(layer, etc.clone(transport, {
    //         move (t) {
    //             if (transport.move && transport.move(t) !== false || !transport.move)
    //                 animation.draw(`${layer.identifier}: scale.move`, () => {
    //                     layer.scale = t.scale
    //                 })
    //         },
    //         cancel (t) {
    //             if (transport.cancel && transport.cancel(t) !== false || !transport.cancel)
    //                 animation.draw(`${layer.identifier}: scale.cancel`, () => {
    //                     layer.animate(animationPreset, {
    //                         scale : 1
    //                     })
    //                 })
    //         }
    //     }), 'scale')
    // },
    
}


