


import animation from './animation'
import geo       from './geometry'
import vec       from './vector'
import css       from './css'

export default {

    init (dom) {
        // add animation support
        animation.flow(dom)
        // set data
        dom.data = {
            origin    : new vec(),
            translate : new vec(),
            scale     : new vec(1, 1),
            rotate    : 0
        } 
        // pop
        dom.pop = () => {
            dom.data.pop = {
                parent   : dom.parentNode,
                move     : new vec(dom.style.left,  dom.style.top),
                size     : new vec(dom.style.width, dom.style.height),
                offset   : geo.vpo(this)
            }
            var size = new vec(dom.offsetWidth, dom.offsetHeight)
            dom.set({
                position  : 'fixed',
                move      : new vec(),
                size      : size.unit('px'),
                translate : dom.data.pop.offset.position.unit('px')
            })
            document.body.appendChild(this)
        }
        dom.push = () => {
            dom.data.pop.parent.appendChild(this)
            dom.set({
                position  : null,
                move      : dom.data.pop.move,
                size      : dom.data.pop.size,
                translate : new vec(),
                scale     : new vec(1, 1),
                origin    : {x: 'center', y: 'center'}
            })
            delete dom.data.pop
        }
        dom.set = params => {
            for (var p in params) {
                // transformation
                if (typeof dom.data[p] !== 'undefined') {
                    // transition
            		if (p == 'rotate')
                        dom.data.rotate = params[p]
                    else {
                        if (typeof params[p].x !== 'undefined') dom.data[p].x = params[p].x
                        if (typeof params[p].y !== 'undefined') dom.data[p].y = params[p].y
                    }
                    css.applyTransformation(this, dom.data, p)
                // movement and sizing
                } else if (p =='move') {
                    dom.style.left = params[p].x
                    dom.style.top  = params[p].y
                } else if (p =='size') {
                    dom.style.width  = params[p].x
                    dom.style.height = params[p].y
                // custom parameters
                } else
                    dom.style[p] = params[p]
            }
            return this
        }
        dom.get = prop => {
            if (prop == 'offset')
                return geo.vpo(this)
            else if (typeof dom.data[prop] !== 'undefined')
                return dom.data[prop]
            else
                css.computed(this, prop)
        }
        return dom
    },
    
    applyTransformation (dom, data, type) {
        // create data
        if (type == 'origin')
            dom.style[css.vendor.transformOrigin] = 
                `${data.origin.x} 
                 ${data.origin.y}`
        else 
            dom.style[css.vendor.transform] = 
                `translate(
                    ${data.translate.x}, 
                    ${data.translate.y}) 
                rotate(
                    ${data.rotate}deg) 
                scale(
                    ${data.scale.x}, 
                    ${data.scale.y})`
    },

    computed (dom, prop) {
	    return parseInt(
	    	document.defaultView
	    	.getComputedStyle(dom, null)
	    	.getPropertyValue(prop)
	    )
	},

    vendor : (props => {
        var out = {}
        if (typeof document === "undefined") return out
        var prefix	= [null, 'ms', 'webkit', 'moz', 'o']
        var div     = document.createElement('div')
        props.forEach(prop => {
            for (var i = 0; i < prefix.length; i ++) {
                var p = prefix[i] + prefix[i]? prop.charAt(0).toUpperCase() + prop.slice(1): prop
                if (typeof div.style[p] !== 'undefined'){out[prop] = p; break}
            }
        })
        return out
    })([
        'transform', 
        'transformOrigin', 
        'columnCount',
        'transition'
    ]),
}


