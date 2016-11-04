


import fwAnimation from './animation'
import fwGeo       from './geometry'
import fwVec       from './vector'
import fwCss       from './css'

export default {

    init : (function (dom) {
        // add animation support
        fwAnimation.flow(dom)
        // set data
        dom.data = {
            origin    : new fwVec(),
            translate : new fwVec(),
            scale     : new fwVec(1, 1),
            rotate    : 0
        } 
        // pop
        dom.pop = () => {
            dom.data.pop = {
                parent   : dom.parentNode,
                move     : new fwVec(dom.style.left,  dom.style.top),
                size     : new fwVec(dom.style.width, dom.style.height),
                offset   : fwGeo.vpo(this)
            }
            var size = new fwVec(dom.offsetWidth, dom.offsetHeight)
            dom.set({
                position  : 'fixed',
                move      : new fwVec(),
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
                translate : new fwVec(),
                scale     : new fwVec(1, 1),
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
                    fwCss.applyTransformation(this, dom.data, p)
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
                return fwGeo.vpo(this)
            else if (typeof dom.data[prop] !== 'undefined')
                return dom.data[prop]
            else
                fwCss.computed(this, prop)
        }
        return this
    })(Element.prototype),
    
    applyTransformation (dom, data, type) {
        // create data
        if (type == 'origin')
            dom.style[fwCss.vendor.transformOrigin] = 
                `${data.origin.x} 
                 ${data.origin.y}`
        else 
            dom.style[fwCss.vendor.transform] = 
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


