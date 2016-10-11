


import {default as fwStyle} from './style'

export default {

    set (dom) {
        dom.data = {
            origin    : {x: 0, y: 0},
            translate : {x: 0, y: 0},
            scale     : {x: 1, y: 1},
            rotate    : {z: 0}
        }
        var transform = () => {
        	dom.style[fwStyle.vendor.transform] = 
                'translate('+ 
                    dom.data.translate.x +'px, '+ 
                    dom.data.translate.y +'px) '+
                'rotate('+ 
                    dom.data.rotate.z +'deg) '+
                'scale('+ 
                    dom.data.scale.x +', '+
                    dom.data.scale.y +')'
        }
        var origin = () => {
        	dom.style[fwStyle.vendor.transformOrigin] =
        		dom.data.origin.x +' '+ 
        		dom.data.origin.y
        }
        dom.set = function (props) {
            for (var param in props) {
                if (param == 'origin') {
                    if (props[param].x) this.data.origin.x = props[param].x
                    if (props[param].y) this.data.origin.y = props[param].y
                    origin()
                } else if (param == 'translate') {
                    if (props[param].x) this.data.translate.x = props[param].x
                    if (props[param].y) this.data.translate.y = props[param].y
                    transform()
                } else if (param == 'scale') {
                    if (props[param].x) this.data.scale.x = props[param].x
                    if (props[param].y) this.data.scale.y = props[param].y
                    transform(this)
                } else if (param == 'rotate') {
            		this.data.rotate.z = props[param]
            		transform()
                } else
                    this.style[param] = props[param]
            }
        }
        dom.get = prop => {
            this.computed(dom, prop)
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
    })(['transform', 'transformOrigin', 'columnCount']),
}


