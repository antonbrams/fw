

import {val} from '../index'

export default {
	
	to (t, a, b) {
		return this.map(t, 0, 1, a, b, true)
	},

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
	
	min (x, lim) {
		return x > lim? x: lim
	},
	
	max (x, lim) {
		return x < lim? x: lim
	},
	
	range (min, val, max) {
		return this.max(this.min(val, min), max)
	},
	
	randInt (min, max) {
		return Math.floor(this.to(Math.random(), min, max))
	},
	
	isEqual (a, b, tolerance = 1) {
		var range = Math.pow(10, -tolerance)
		return a - range < b && b < a + range
	},
	
	binarySearch (length, check) {
        var i =  Math.floor(.5 * length) // result
		var h = i // pointer
        while (h > 1) {
            h = Math.round(.5 * h)
            i += (check(i)? 1: -1) * h
		}
        check(i, true)
        return i
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

	getValueFromDictionary (value, list) {
		var out
		for (var i = 0; i < list.length; i ++)
			if 	(value >= list[i][0]) out = list[i][1]
		return out
	},

	rubberRange (value, min, max, range, state) {
        // https://www.desmos.com/calculator
        // Based on 1-pow(1+x,-1)
		var factor = 1.3
		var isMax  = val.exists(min)
		var isMin  = val.exists(max)
		if (isMax || isMin) {
			var dir   = value < min
			var range = (dir? 1: -1) * range
			var len   = dir? min: max
			var x     = (len - value) / range
			var y     = len - range * (1 - Math.pow(1 + x, -factor))
		}
		var maxState = isMax && value < min
		var minState = isMin && value > max
		if (state) state(maxState? 'max': minState? 'min': null)
		return (maxState || minState? y: value)
	},
	
	// var buffer = new Buffer(10) then var value = buffer.get(23.445) 
    buffer : class {
		
		constructor (size) {
        	this.array = []
        	this.size  = size
        }
		
        get (value) {
            var sum    = 0
            var length = this.array.length
            if (length > this.size) this.array.shift()
            this.array.push(value)
            for (var i = 0; i < length; i ++) 
            	if (isFinite(this.array[i])) 
                    sum += parseFloat(this.array[i])
            return sum / length
        }
    },
}


