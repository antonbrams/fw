


import {val, text} from './index'

export default {
    
    applyTransformation (element, p, type) {
        if (type == 'origin') {
            element.style[this.vendor.transformOrigin]   = `${p.origin.x} ${p.origin.y}`
            element.style[this.vendor.perspectiveOrigin] = `${p.origin.z}`
        } else 
            element.style[this.vendor.transform] = 
               `matrix3d(${p.matrix3d.toString()})
                translate(${p.translate.x}, ${p.translate.y})
                rotate(${p.rotate})
                scale(${p.scale.x}, ${p.scale.y})`
    },
    
    computed (element, prop) {
	    return parseFloat(
	    	document.defaultView
	    	.getComputedStyle(element, null)
	    	.getPropertyValue(prop)
	    )
	},
    
    vendor : (props => {
        var out = {}
        if (!val.exists(document)) return out
        var prefix = [null, 'ms', 'webkit', 'moz', 'o']
        var div    = document.createElement('div')
        props.forEach(prop => {
            for (var i = 0; i < prefix.length; i ++) {
                var p = prefix[i] + prefix[i]? text.capitalize(prop): prop
                if (val.exists(div.style[p])) {out[prop] = p; break}
            }
        })
        return out
    })([
        'transform', 
        'transformOrigin',
        'perspectiveOrigin',
        'columnCount',
        'transition',
        'animation'
    ]),
    
}


