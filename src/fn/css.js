


import {val, text, vec} from '../index'

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
    
    unit (value, unit = 'px') {
        return value + (val.isNum(value)? unit: '')
    },
    
    setLTRB (type, value, out, unit = 'px') {
        if (val.isObj(value)) {
            if ('x' in value && 'y' in value) {
                out(type, `${this.unit(value.y, unit)} ${this.unit(value.x, unit)}`)
            } else {
                var params = {}
                if ('x' in value) params[type]          = `0 ${this.unit(value.x, unit)}`
                if ('y' in value) params[type]          = `${this.unit(value.y, unit)} 0`
                if ('l' in value) params[type+'Left']   = this.unit(value.l, unit)
                if ('t' in value) params[type+'Top']    = this.unit(value.t, unit)
                if ('r' in value) params[type+'Right']  = this.unit(value.r, unit)
                if ('b' in value) params[type+'Bottom'] = this.unit(value.b, unit)
                out(params)
            }
        } else out(type, this.unit(value, unit))
    },
    
    getLTRB (type, dom) {
        return {
            l: this.computed(dom, type+'-left'),
            t: this.computed(dom, type+'-top'),
            r: this.computed(dom, type+'-right'),
            b: this.computed(dom, type+'-bottom')
        }
    },
    
}


