


import {animation, geo, vec, val} from './fw'

export default {
    
    applyTransformation (element, data, type) {
        // create data
        if (type == 'origin') {
            element.style[this.vendor.transformOrigin] = 
                `${data.origin.x} 
                 ${data.origin.y}`
             element.style[this.vendor.perspectiveOrigin] = 
                 `${data.origin.z}`
        } else 
            element.style[this.vendor.transform] = 
                `translate3d(
                    ${data.translate.x},
                    ${data.translate.y},
                    ${data.translate.z}) 
                rotateX(${data.rotate.x}deg)
                rotateY(${data.rotate.y}deg)
                rotateZ(${data.rotate.z}deg) 
                scale3d(
                    ${data.scale.x}, 
                    ${data.scale.y}, 
                    ${data.scale.z})`
    },

    computed (element, prop) {
	    return parseInt(
	    	document.defaultView
	    	.getComputedStyle(element, null)
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
        'perspectiveOrigin',
        'columnCount',
        'transition'
    ]),
    
}


