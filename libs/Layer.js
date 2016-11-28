


import {dom, css, val, geo, vec, animation, event} from './fw'

export default class Layer {
    
    constructor (options) {
        // props
        this.props = {
            origin    : new vec(0,0,0),
            translate : new vec(0,0,0),
            scale     : new vec(1,1,1),
            rotate    : new vec(0,0,0)
        }
        // if options incoming
        if (val.isObj(options)) {
            // create dom element
            if ('dom' in options) {
                // element
                if (val.isDom(options.dom))
                    this.dom = options.dom
                // string
                else if (val.isStr(options.dom)) {
                    // template
                    if (options.dom.match(/<.*>.*<\/.*>/))
                        this.dom = dom.fromString(options.dom)
                    // create new element
                    else this.dom = dom.create(options.dom)
                } else 
                    this.dom = dom.create('.layer')
                delete options.dom
            // if no dom, create just div with .layer
            } else 
                this.dom = dom.create('.layer')
            // if no parent parameter
            if (!val.exists(options.parent)) 
                document.body.appendChild(this.dom)
            // set other values
            this.set(options)
        } else if (val.isDom(options)) 
            this.dom = options
        // link dom with object
        this.dom.layer = this
    }
    
    // setter getters
    set (options) {
        for (var key in options) {
            var value = options[key]
            // use methods
            if (key in this)
                if (val.isFn(this[key])) 
                    this[key](value)
                else
                    this[key] = value
            // set standard css parameters
            else
                this.dom.style[key] = value
        }
        return this
    }
    
    get (key) {
        return css.computed(this.dom, key)
    }
    
    // Events
    on (type, fn, flag) {
        // tap, long tap, drag, zoom, rotate
        var type = event.types[type]
        this.dom.addEventListener(type, fn, flag)
        return {
            on  : () => this.dom.addEventListener(type, fn, flag),
            off : () => this.dom.removeEventListener(type, fn, flag)
        }
    }
    
    gesture (type, options) {
        var dictionary = {drag: 'gestureDrag'}
        return event[dictionary[type]](this, options)
    }
    
    pop () {
        this.props.pop = {
            parent   : this.dom.parentNode,
            pos      : new vec(this.dom.style.left,  this.dom.style.top),
            size     : new vec(this.dom.style.width, this.dom.style.height),
            offset   : geo.vpo(this.dom)
        }
        this.set({
            position  : 'fixed',
            pos       : new vec(),
            size      : new vec(this.dom.offsetWidth +.5, this.dom.offsetHeight +.5).unit('px'),
            translate : this.props.pop.offset.position.unit('px')
        })
        document.body.appendChild(this.dom)
        return this
    }
    
    push () {
        this.props.pop.parent.appendChild(this.dom)
        this.set({
            position  : null,
            pos       : this.props.pop.pos,
            size      : this.props.pop.size,
            translate : new vec(),
            scale     : new vec(1, 1),
            origin    : {x: 'center', y: 'center'}
        })
        delete this.props.pop
        return this
    }
    
    animate (time, ease, next, end) {
        animation.flow(this, time, ease, next, end)
        return this
    }
    
    clone () {
        var clone = this.dom.cloneNode(true)
		this.dom.parentNode.appendChild(clone)
        return new Layer({
            dom : clone
        })
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
        var children = this.dom.querySelectorAll(query)
        var out = []
        for (var i = 0; i < children.length; i ++)
            out.push(children[i].layer || new Layer(children[i]))
        return out 
    }
    
    set parent (value) {
        (value instanceof Layer? value.dom: value).appendChild(this.dom)
    }
    
    get parent () {
        if (this.dom.parentNode)
            if (this.dom.parentNode.layer instanceof Layer)
                return this.dom.parentNode
            else
                return new Layer(this.dom.parentNode)
    }
    
    append (value) {
        var append = el => {this.dom.appendChild(el instanceof Layer? el.dom: el)}
        if (val.isArr(value))
            value.forEach(item => append(item))
        else
            append(item)
    }
    
    prepend (value) {
        dom.prepend(this.dom, value instanceof Layer? value.dom: value)
    }
    
    remove (value) {
        this.dom.removeChild(value instanceof Layer? value.dom: value)
    }
    
    set content (value) {
        this.dom.innerHTML = value
    }
    
    get content () {
        return this.dom.innerHTML
    }
    
    // classes
    toggleClass (value) {
        return this.dom.classList.toggle(value)
    }
    
    hasClass (value) {
        return this.dom.classList.contains(value)
    }
    
    addClass (value) {
        if (val.isArr(value)) 
            value.forEach(item => this.dom.classList.add(item))
        else this.dom.classList.add(value)
    }
    
    deleteClass (value) {
        if (val.isArr(value)) 
            value.forEach(item => this.dom.classList.remove(item))
        else this.dom.classList.remove(value)
    }
    
    // css
    set move (value) {
        if ('x' in value) this.dom.style.left = value.x
        if ('y' in value) this.dom.style.top  = value.y
    }
    
    get move () {
        return new vec(this.dom.offsetLeft, this.dom.offsetTop)
    }
    
    set size (value) {
        if ('x' in value) this.dom.style.width  = value.x
        if ('y' in value) this.dom.style.height = value.y
    }
    
    get size () {
        return new vec(this.dom.offsetWidth, this.dom.offsetHeight)
    }
    
    image (value) {
        this.background({image: value})
    }
    
    set padding (value) {
        if (val.isStr(value))
            this.dom.style.padding = value
        else if (val.isObj(value)) {
            if ('x' in value && 'y' in value) 
                this.dom.style.padding = `${value.y} ${value.x}`
            else
                if ('x' in value) this.dom.style.padding       = `0 ${value.x}`
                if ('y' in value) this.dom.style.padding       = `${value.y} 0`
                if ('l' in value) this.dom.style.paddingLeft   = value.l
                if ('t' in value) this.dom.style.paddingTop    = value.t
                if ('r' in value) this.dom.style.paddingRight  = value.r
                if ('b' in value) this.dom.style.paddingBottom = value.b
        }
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
        if (val.isStr(value))
            this.dom.style.margin = value
        else if (val.isObj(value)) {
            if ('x' in value && 'y' in value) 
                this.dom.style.margin = `${value.y} ${value.x}`
            else
                if ('x' in value) this.dom.style.margin       = `0 ${value.x}`
                if ('y' in value) this.dom.style.margin       = `${value.y} 0`
                if ('l' in value) this.dom.style.marginLeft   = value.l
                if ('t' in value) this.dom.style.marginTop    = value.t
                if ('r' in value) this.dom.style.marginRight  = value.r
                if ('b' in value) this.dom.style.marginBottom = value.b
        }
    }
    
    get margin () {
        return {
            l: css.computed(this.dom, 'margin-left'),
            t: css.computed(this.dom, 'margin-top'),
            r: css.computed(this.dom, 'margin-right'),
            b: css.computed(this.dom, 'margin-bottom')
        }
    }
    
    background (value) {
        if (val.isStr(value))
            this.dom.style.background = value
        else if (val.isObj(value))
            if ('image' in value) 
                this.dom.style.backgroundImage = 
                    `url(${value.image})`
            if ('origin' in value)
                this.dom.style.backgroundOrigin = val.isObj(value.origin)?
                    `${value.origin.x} ${value.origin.y}`: value.origin
            if ('position' in value)
                this.dom.style.backgroundPosition = val.isObj(value.position)?
                    `${value.position.x} ${value.position.y}`: value.position
            if ('size' in value)
                this.dom.style.backgroundSize = val.isObj(value.size)? 
                    `${value.size.x} ${value.size.y}`: value.size
            if ('repeat' in value)
                this.dom.style.backgroundRepeat =
                    value.repeat == 'x'? 'repeat-x':
                    value.repeat == 'y'? 'repeat-y':
                    value.repeat == 'no'? 'no-repeat':
                    value.repeat == 'yes'? 'repeat': value.repeat
            if ('color' in value)
                this.dom.style.backgroundColor = value.color
    }
    
    text (value) {
        if (val.isStr(value))
            this.dom.style.font = value
        else if (val.isObj(value)) {
            var props = {
                style      : 'fontStyle', 
                variant    : 'fontVariant', 
                weight     : 'fontWeight', 
                size       : 'fontSize', 
                height     : 'fontHeight', 
                family     : 'fontFamily',
                color      : 'colorColor',
                align      : 'textAlign', 
                lineHeight : 'lineHeight',
                shadow     : 'textShadow'
            }
            for (var key in props) 
                if (key in value) 
                    this.dom.style[props[key]] = value[key]
        }
    }
    
    border (value) {
        if (val.isStr(value))
            this.dom.style.border = value
        else if (val.isObj(value)) {
            var set = (value, side) => {
                var props = {
                    color  : 'Color',
                    radius : 'Radius',
                    width  : 'Width',
                    style  : 'Style'
                }
                for (var key in props)
                    if (key in value) this.dom.style[`border${side}${props[key]}`] = value[key]
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
        ['x', 'y', 'z'].forEach(axis => {
            if (axis in value) 
                this.props.origin[axis] = value[axis]
        })
        css.applyTransformation(this.dom, this.props, 'origin')
    }
    
    get origin () {
        return this.props.origin
    }
    
    set translate (value) {
        ['x', 'y', 'z'].forEach(axis => {
            if (axis in value)
                this.props.translate[axis] = value[axis]
        })
        css.applyTransformation(this.dom, this.props)
    }
    
    get translate () {
        return this.props.translate
    }
    
    set scale (value) {
        if (val.isNum(value)) {
            this.props.scale.x =
            this.props.scale.y =
            this.props.scale.z = value
        } else
            ['x', 'y', 'z'].forEach(axis => {
                if (axis in value) 
                    this.props.scale[axis] = value[axis]
            })
        css.applyTransformation(this.dom, this.props)
    }
    
    get scale () {
        return this.props.scale
    }
    
    set rotate (value) {
        if (val.isNum(value))
            this.props.rotate.z = value
        else
            ['x', 'y', 'z'].forEach(axis => {
                if (axis in value) 
                    this.props.rotate[axis] = value[axis]
            })
        css.applyTransformation(this.dom, this.props)
    }
    
    get rotate () {
        return this.props.rotate
    }
    
    // center
    set center (value) {
        this.move = value.sub(this.size.scale(.5))
    }
    
    get center () {
        return geo.center(geo.vpo(this.dom)) 
    }
    
    // offset
    get rect () {
        return geo.vpo(this.dom)
    }
    
}


