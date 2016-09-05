


export default {

    computed (dom, prop) {
	    return parseInt(
	    	document.defaultView
	    	.getComputedStyle(dom, null)
	    	.getPropertyValue(prop)
	    )
	},

	vendor : (() => {
		var getSupportedPropertyName = properties => {
			if (typeof document !== "undefined") {
				var div = document.createElement('div')
				properties.forEach(property => {
			        if (typeof div.style[property] !== 'undefined') 
			        	return property
			    })
			}
    	}
		return {
			transform : getSupportedPropertyName([
				'transform', 
				'msTransform', 
				'webkitTransform', 
				'mozTransform', 
				'oTransform'
			]),
			origin : getSupportedPropertyName([
				'transformOrigin', 
				'msTransformOrigin', 
				'webkitTransformOrigin', 
				'mozTransformOrigin', 
				'oTransformOrigin'
			]),
			columnCount : getSupportedPropertyName([
				'columnCount', 
				'msColumnCount', 
				'webkitColumnCount', 
				'mozColumnCount', 
				'oColumnCount'
			])
		}
	})()
}


