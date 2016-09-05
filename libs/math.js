


export default {

	map (value, aMin, aMax, bMin, bMax, clamp) {
		var x = clamp == true? (
			value < aMin? aMin:
			value > aMax? aMax: value
		):  value
		return (
			(x - aMin) / 
			(aMax - aMin) * 
			(bMax - bMin) + bMin
		)
	},

	// Binary Search
	binarySearch (max, min, check, set) {
		var target = length = max
		while (length >= min) {
			length *= 0.5
			target += length * (check()? 1: -1)
			set(target)
		}
	},
	
	linearInterpolation (t, points) {
		// Init
		var params 	= []
		var x 		= 0
		// Find Sector
		for (var i = 0; i < points.length - 1; i ++) 
			if (t >= points[i][0]) x = i; else break
		// Find Left and Right Side
		var lValue = points[x]
		var rValue = points[x+1]
		// Interpolate Parameters
		for (var i = 1; i < lValue.length; i ++)
			params.push(this.map(t, lValue[0], rValue[0], lValue[i], rValue[i]))
		// Return
		return params
	},

	getValueBySize (value, sizes) {
		var lineCounts  = null
		for (var i = 0; i < sizes.length; i ++)
			if 	(value >= sizes[i][0]) lineCounts = sizes[i][1]
		return lineCounts
	},

	rubberEffect (value, min, max, threshold, state) {
        // https://www.desmos.com/calculator
        // Based on 1-pow(1+x,-1)
		var factor 	= 1.3
		var maxTrue = typeof max !== 'undefined'
		var minTrue = typeof min !== 'undefined'
		if (maxTrue || minTrue) {
			var direction 	= value < max
			var threshold 	= (direction? 1: -1) * threshold
			var range		= direction? max: min
			var x = (range - value) / threshold
			var y = range - threshold * (1 - Math.pow(1 + x, -factor))
		}
		var maxState = maxTrue && value < max
		var minState = minTrue && value > min
		if (state) state(maxState? 'max': minState? 'min': null)
		return (maxState || minState? y: value)
	},
}


