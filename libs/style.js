


export default {

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
            for (var n = 0; n < prefix.length; n ++) {
                var p = prefix[n] + prefix[n]? prop: prop.charAt(0).toUpperCase() + prop.slice(1)
                if (typeof div.style[p] !== 'undefined'){out[prop] = p; break}
            }
        })
        return props
    })(['transform', 'transformOrigin', 'columnCount']),
}


