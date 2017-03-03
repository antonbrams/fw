


import {
    dom, css, val, geo, vec, matrix,
    animation, event, text, gesture,
    Screen
} from '../index'

export default class Layer {
    
    constructor (options) {
        this.identifier = new Date().getTime()
        this.event      = event.Machine('Layer')
        this.data       = null
        this._dom       = null
        this._props     = {
            transformation : {
                origin    : new vec(),
                translate : new vec(),
                scale     : new vec().fill(1),
                rotate    : 0,
                matrix3d  : new matrix()
            },
            pop : {},
            templateUpdater              : null,
            transformationTouchEventLink : null,
        }
        // if no options at all
        if (!val.exists(options)) {
            this.dom    = dom.create('.default')
            this.parent = Screen
        // if options are an tulpet
        } else if (val.isObj(options)) {
            // apply dom element
            if (val.exists(options.dom)) {
                this.dom = options.dom
                delete options.dom
            // if no dom, create just div with .layer
            } else this.dom = dom.create('.default')
            // parent
            if (val.exists(options.parent)) {
                if (options.parent === null)
                    delete options.parent
            } else this.parent = Screen
            // set other options
            this.set(options)
        // if options is a single parameter
        } else if (val.isDom(options) || val.isStr(options)) {
            this.dom = options
            // add if not added
            if (val.isDom(options) && !options.parentNode)
                this.parent = Screen
        }
    }
    
    // external event interface
    on (topic, fn, options) {
        // gestures
        if (topic in gesture)
            return gesture[topic](this, fn).on()
        // dom events
        else if (event.support(this.dom, topic))
            return event.listener(this.dom, topic, fn, options).on()
        // custom events
        else if (topic in event)
            return event[topic](this, fn).on()
        // dom css
        else
            return this.event.on(topic, fn)
    }
    
    // setter getters
    set (options) {
        for (var key in options) {
            var value = options[key]
            // use methods
            if (key in this) {
                if (val.isFn(this[key]))
                    this[key](value)
                else
                    this[key] = value
            // set attributes
            } else if (key in this.dom) this._setAttribute(key, value)
            // set css parameters
            else if (key in this.dom.style) this._setCss(key, value)
        }
        return this
    }
    
    _setAttribute (option, value) {
        var set = (key, value) => {
            this.event.emit(key, value)
            if (val.exists(value))
                this.dom.setAttribute(key, value)
            else
                this.dom.removeAttribute(key)
        }
        if (val.isStr(option))
            set(option, value)
        else if (val.isObj(option))
            for (var key in option)
                set(key, option[key])
    }
    
    _setCss (options, value) {
        var set = (key, value) => {
            this.event.emit(key, value)
            this.dom.style[key] = value
        }
        if (val.isStr(options))
            set(options, value)
        else if (val.isObj(options))
            for (var key in options)
                set(key, options[key])
    }
    
    getCss (key) {
        return css.computed(this.dom, key)
    }
    
    set dom (value) {
        var old = this.dom && this.dom.parentNode? this.dom: null
        // if dom
        if (val.isDom(value))
            this._dom = value
        // string a string
        else if (val.isStr(value)) {
            // template
            if (value.match(/<.*>.*<\/.*>/))
                this._dom = dom.fromString(value)
            // create new element
            else this._dom = dom.create(value)
        }
        // link dom with layer
        this._dom.layer = this
        this.addClass('layer')
        // replace old dom
        if (old) old.replaceWith(this.dom) 
    }
    
    get dom () {
        return this._dom
    }
    
    /*
        model.forEach(function (item) {
            var layerA = new fw.Layer({
                margin : 10
            }).bind(item, {
                image : {
                    to   : 'title',
                    from : 'backgroundImage',
                    set (value, layer) {
                        layer.set({content: 'test ' + value})
                    },
                    get (value, layer) {
                        return value
                    }
                }
            })
        })
    */
    
    bind (model, params) {
        for (var key in params) {
            var options   = params[key]
            var modelKey  = options.to || options
            var initValue = model[modelKey]
            var curValue  = null
            this.on(options.from || key, value => curValue = value)
            Object.defineProperty(model, modelKey, {
                set : ((options, key) => {
                    return value => {
                        if (options.set)
                            options.set(value, this)
                        else {
                            var param  = {}
                            param[key] = value
                            this.set(param)
                        }
                    }
                })(options, key),
                get : (options => {
                    return () => {
                        if (options.get)
                            return options.get(this)
                        else 
                            return curValue
                    }
                })(options)
            })
            model[modelKey] = initValue
        }
        return this
    }
    
    destroy () {
        this.dom.parentNode.removeChild(this.dom)
        delete this
    }
    
    pop () {
        this.event.emit('pop', this._props.pop)
        this._props.pop = {
            parent : this.dom.parentNode,
            pos    : new vec(this.dom.style.left, this.dom.style.top),
            size   : new vec(this.dom.style.width, this.dom.style.height),
            offset : geo.vpo(this.dom)
        }
        this.set({
            position  : 'fixed',
            pos       : new vec(),
            size      : new vec(this.dom.offsetWidth +.5, this.dom.offsetHeight +.5).unit('px'),
            translate : this._props.pop.offset.position.unit('px')
        })
        document.body.appendChild(this.dom)
        return this
    }
    
    push () {
        this.event.emit('push', this._props.pop)
        this._props.pop.parent.appendChild(this.dom)
        this.set({
            position  : null,
            pos       : this._props.pop.pos,
            size      : this._props.pop.size,
            translate : new vec(),
            scale     : new vec(1, 1, 1),
            origin    : {x: 'center', y: 'center'}
        })
        this._props.pop = null
        return this
    }
    
    animate (options, next, end) {
        this.event.emit('animate', options)
        animation.flow(this,
            options.time  || .5,
            options.ease  || 'ease-in-out',
            options.delay || 0,
            next, end
        )
        return this
    }
    
    clone (options) {
        var clone = this.dom.cloneNode(true)
		this.dom.parentNode.appendChild(clone)
        return new Layer({
            dom : clone
        }).set(options)
    }
    
    collision (layer) {
        var a = geo.vpo(this.dom)
        var b = geo.vpo(layer.dom)
        return geo.boxCollision(
            geo.vecdim(a.position, a.size), 
            geo.vecdim(b.position, b.size)
        )
    }
    
    // dom structure
    child (query) {
        var children = this.dom.querySelector(query)
        return children.layer || new Layer(children)
    }
    
    childs (query) {
        var children = this.dom.querySelectorAll(query)
        var out = []
        for (var i = 0; i < children.length; i ++)
            out.push(children[i].layer || new Layer(children[i]))
        return out 
    }
    
    get parent () {
        if (this.dom.parentNode && this.dom.parentNode.layer) {
            return this.dom.parentNode.layer instanceof Layer? 
                this.dom.parentNode.layer :
                new Layer(this.dom.parentNode)
        }
    }
    
    set parent (value) {
        this.event.emit('parent', value)
        if (value instanceof Layer)
            value.append(this)
        else
            value.appendChild(this.dom)
    }
    
    append (value) {
        this.event.emit('append', value)
        var append = el => {this.dom.appendChild(el instanceof Layer? el.dom: el)}
        if (val.isArr(value))
            value.forEach(append)
        else
            append(value)
    }
    
    prepend (value) {
        this.event.emit('prepend', value)
        dom.prepend(this.dom, value instanceof Layer? value.dom: value)
    }
    
    detach (value) {
        this.event.emit('detach', value)
        this.dom.removeChild(value instanceof Layer? value.dom: value)
    }
    
    set content (value) {
        var set = string => {
            this.event.emit('content', string)
            this.dom.innerHTML = string
        }
        if (val.isObj(value))
            this._props.templateUpdater = 
                dom.template(value.html, value.bind, set)
        else {
            set(value)
            if (this._props.templateUpdater)
                this._props.templateUpdater.off()
        }
    }
    
    get content () {
        return this.dom.innerHTML
    }
    
    // classes
    toggleClass (value) {
        this.event.emit('toggleClass', value)
        return this.dom.classList.toggle(value)
    }
    
    hasClass (value) {
        return this.dom.classList.contains(value)
    }
    
    addClass (value) {
        this.event.emit('addClass', value)
        if (val.isArr(value)) 
            value.forEach(item => this.dom.classList.add(item))
        else this.dom.classList.add(value)
    }
    
    removeClass (value) {
        this.event.emit('deleteClass', value)
        if (val.isArr(value)) 
            value.forEach(item => this.dom.classList.remove(item))
        else this.dom.classList.remove(value)
    }
    
    // css
    set move (value) {
        if ('x' in value) this._setCss('left', value.x)
        if ('y' in value) this._setCss('top', value.y)
    }
    
    get move () {
        return new vec(this.dom.offsetLeft, this.dom.offsetTop)
    }
    
    set size (value) {
        if ('x' in value) this._setCss('width', value.x)
        if ('y' in value) this._setCss('height', value.y)
    }
    
    get size () {
        return new vec(this.dom.offsetWidth, this.dom.offsetHeight)
    }
    
    image (value) {
        this.bg({image: value})
    }
    
    set padding (value) {
        if (val.isObj(value)) {
            if ('x' in value && 'y' in value) {
                this._setCss('padding', `${value.y} ${value.x}`)
            } else {
                var params = {}
                if ('x' in value) params.padding       = `0 ${value.x}`
                if ('y' in value) params.padding       = `${value.y} 0`
                if ('l' in value) params.paddingLeft   = value.l
                if ('t' in value) params.paddingTop    = value.t
                if ('r' in value) params.paddingRight  = value.r
                if ('b' in value) params.paddingBottom = value.b
                this._setCss(params)
            }
        } else
            this._setCss('padding', value)
    }
    
    get padding () {
        return {
            l: css.computed(this.dom, 'padding-left'),
            t: css.computed(this.dom, 'padding-top'),
            r: css.computed(this.dom, 'padding-right'),
            b: css.computed(this.dom, 'padding-bottom')
        }
    }
    
    set margin (value) {
        if (val.isObj(value)) {
            if ('x' in value && 'y' in value) {
                this._setCss('margin', `${value.y} ${value.x}`)
            } else {
                var params = {}
                if ('x' in value) params.margin       = `0 ${value.x}`
                if ('y' in value) params.margin       = `${value.y} 0`
                if ('l' in value) params.marginLeft   = value.l
                if ('t' in value) params.marginTop    = value.t
                if ('r' in value) params.marginRight  = value.r
                if ('b' in value) params.marginBottom = value.b
                this._setCss(params)
            }
        } else
            this._setCss('margin', value)
    }
    
    get margin () {
        return {
            l: css.computed(this.dom, 'margin-left'),
            t: css.computed(this.dom, 'margin-top'),
            r: css.computed(this.dom, 'margin-right'),
            b: css.computed(this.dom, 'margin-bottom')
        }
    }
    
    bg (value) {
        if (val.isStr(value))
            this._setCss('background', value)
        else if (val.isObj(value)) {
            var params = {}
            if ('image' in value)
                params.backgroundImage = 
                    `url(${value.image})`
            if ('origin' in value)
                params.backgroundOrigin = val.isObj(value.origin)?
                    `${value.origin.x} ${value.origin.y}`: value.origin
            if ('position' in value)
                params.backgroundPosition = val.isObj(value.position)?
                    `${value.position.x} ${value.position.y}`: value.position
            if ('size' in value)
                params.backgroundSize = val.isObj(value.size)? 
                    `${value.size.x} ${value.size.y}`: value.size
            if ('repeat' in value)
                params.backgroundRepeat =
                    value.repeat == 'x'? 'repeat-x':
                    value.repeat == 'y'? 'repeat-y':
                    value.repeat == 'no'? 'no-repeat':
                    value.repeat == 'yes'? 'repeat': value.repeat
            if ('color' in value)
                params.backgroundColor = value.color
            this._setCss(params)
        }
    }
    
    text (value) {
        if (val.isStr(value))
            this._setCss('font', value)
        else if (val.isObj(value)) {
            var props = {
                style      : 'fontStyle', 
                variant    : 'fontVariant', 
                weight     : 'fontWeight', 
                size       : 'fontSize', 
                height     : 'fontHeight', 
                family     : 'fontFamily',
                color      : 'color',
                align      : 'textAlign', 
                lineHeight : 'lineHeight',
                shadow     : 'textShadow'
            }
            for (var key in props) 
                if (key in value) this._setCss(props[key], value[key])
        }
    }
    
    border (value) {
        if (val.isStr(value))
            this._setCss('border', value)
        else if (val.isObj(value)) {
            var set = (value, side) => {
                var props = {
                    color  : 'Color',
                    radius : 'Radius',
                    width  : 'Width',
                    style  : 'Style'
                }
                for (var key in props)
                    if (key in value)
                        this._setCss(`border${side}${props[key]}`, value[key])
            }
            set(value, '')
            var props = {
                l : 'Left', 
                t : 'Top', 
                r : 'Right', 
                b : 'Bottom', 
                tl: 'TopLeft', 
                tr: 'TopRight',
                bl: 'BottomLeft',
                br: 'BottomRight'
            }
            for (var key in props)
                if (key in value) 
                    set(value[key], props[key])
        }
    }
    
    // transformation
    set origin (value) {
        this.event.emit('origin', value);
        ['x', 'y'].forEach(axis => {
            if (axis in value) 
                this._props.transformation.origin[axis] = value[axis]
        })
        css.applyTransformation(this.dom, this._props.transformation, 'origin')
    }
    
    get origin () {
        return this._props.transformation.origin
    }
    
    set translate (value) {
        this.event.emit('translate', value);
        ['x', 'y'].forEach(axis => {
            if (axis in value) 
                this._props.transformation.translate[axis] = value[axis]
        })
        css.applyTransformation(this.dom, this._props.transformation)
    }
    
    get translate () {
        return this._props.transformation.translate
    }
    
    set scale (value) {
        this.event.emit('scale', value)
        if (val.isNum(value)) {
            this._props.transformation.scale.x =
            this._props.transformation.scale.y =
            this._props.transformation.scale.z = value
        } else
            ['x', 'y'].forEach(axis => {
                if (axis in value) 
                    this._props.transformation.scale[axis] = value[axis]
            })
        css.applyTransformation(this.dom, this._props.transformation)
    }
    
    get scale () {
        return this._props.transformation.scale
    }
    
    set rotate (value) {
        this.event.emit('rotate', value)
        this._props.transformation.rotate = `${value}${val.isNum(value)?'deg':''}`
        css.applyTransformation(this.dom, this._props.transformation)
    }
    
    get rotate () {
        return this._props.transformation.rotate
    }
    
    set matrix (matrix) {
        this.event.emit('matrix', matrix.value)
        this._props.transformation.matrix3d = matrix
        css.applyTransformation(this.dom, this._props.transformation)
    }
    
    get matrix() {
        return this._props.transformation.matrix3d
    }
    
    // center
    set center (value) {
        if (val.exists(value.x)) {
            this._setCss('left', `${value.x - this.dom.parentNode.layer.rect.position.x}px`)
            this.align = {x: 'c'}
        }
        if (val.exists(value.y)) {
            this._setCss('top', `${value.y - this.dom.parentNode.layer.rect.position.y}px`)
            this.align = {y: 'c'}
        }
    }
    
    get center () {
        return geo.center(this.rect) 
    }
    
    // offset
    get rect () {
        return geo.vpo(this.dom)
    }
    
    set align (options) {
        if (options.x) this.translate = {x: `${
            options.x == 'c'? -50:
            options.x == 'r'? -100: 0}%`}
        if (options.y) this.translate = {y: `${
            options.y == 'c'? -50:
            options.y == 'b'? -100: 0}%`}
    }
    
    project (v) {
        this.origin = new vec()
        this.move   = new vec()
        this.matrix = new matrix()
            .project(this.size, v[0], v[1], v[2], v[3])
    }
    
}


