


import {default as fwGeo} from './geometry'
import {default as fwVec} from './vector'
import {default as fwCss} from './css'

export default {

    init : (function () {
        // pop
        Element.prototype.pop = function () {
            this.data.pop = {
                parent   : this.parentNode,
                move     : new fwVec(this.style.left,  this.style.top),
                size     : new fwVec(this.style.width, this.style.height),
                offset   : fwGeo.vpo(this)
            }
            var size = new fwVec(this.offsetWidth, this.offsetHeight)
            this.set({
                position  : 'fixed',
                move      : new fwVec(),
                size      : size.unit('px'),
                translate : this.data.pop.offset.position.unit('px')
            })
            document.body.appendChild(this)
        }
        Element.prototype.push = function () {
            this.data.pop.parent.appendChild(this)
            this.set({
                position  : null,
                move      : this.data.pop.move,
                size      : this.data.pop.size,
                translate : new fwVec(),
                scale     : new fwVec(1, 1),
                origin    : {x: 'center', y: 'center'}
            })
            delete this.data.pop
        }
        // transition
        Element.prototype.data = {
            origin    : new fwVec(),
            translate : new fwVec(),
            scale     : new fwVec(1, 1),
            rotate    : 0
        }
        Element.prototype.set = function (params) {
            for (var p in params) {
                // transformation
                if (typeof this.data[p] !== 'undefined') {
            		if (p == 'rotate')
                        this.data.rotate = params[p]
                    else {
                        if (typeof params[p].x !== 'undefined') this.data[p].x = params[p].x
                        if (typeof params[p].y !== 'undefined') this.data[p].y = params[p].y
                    }
                    fwCss.applyTransformation(this, this.data, p)
                // movement and sizing
                } else if (p =='move') {
                    this.style.left = params[p].x
                    this.style.top  = params[p].y
                } else if (p =='size') {
                    this.style.width  = params[p].x
                    this.style.height = params[p].y
                // custom parameters
                } else
                    this.style[p] = params[p]
            }
            return this
        }
        Element.prototype.get = function (prop) {
            if (prop == 'offset')
                return fwGeo.vpo(this)
            else if (typeof this.data[prop] !== 'undefined')
                return this.data[prop]
            else
                fwCss.computed(this, prop)
        }
        return this
    })(),
    
    applyTransformation (dom, data, type) {
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


