


import animation from './animation'
import geo       from './geometry'
import vec       from './vector'
import css       from './css'

export default {

    init (dom) {
        dom.data = {
            origin    : new vec(),
            translate : new vec(),
            scale     : new vec(1, 1),
            rotate    : 0
        } 
        this.poppush(dom)
        this.setget(dom)
        animation.flow(dom)
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
    
    poppush (dom) {
        dom.pop = () => {
            dom.data.pop = {
                parent   : dom.parentNode,
                move     : new vec(dom.style.left,  dom.style.top),
                size     : new vec(dom.style.width, dom.style.height),
                offset   : geo.vpo(dom)
            }
            dom.set({
                position  : 'fixed',
                move      : new vec(),
                size      : new vec(dom.offsetWidth +.5, dom.offsetHeight +.5).unit('px'),
                translate : dom.data.pop.offset.position.unit('px')
            })
            document.body.appendChild(dom)
        }
        dom.push = () => {
            dom.data.pop.parent.appendChild(dom)
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
    },
    
    setget (dom) {
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
                    css.applyTransformation(dom, dom.data, p)
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
            return dom
        }
        dom.get = prop => {
            if (prop == 'offset')
                return geo.vpo(dom)
            else if (typeof dom.data[prop] !== 'undefined')
                return dom.data[prop]
            else
                css.computed(dom, prop)
        }
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


