
import {val} from '../index'

export let map = (value, aMin, aMax, bMin, bMax, clamp) => {
	var x = clamp == true? (
		value < aMin? aMin:
		value > aMax? aMax: value
	):  value
	return (
		(x - aMin) / 
		(aMax - aMin) * 
		(bMax - bMin) + bMin
	)
}

export let to = (t, a, b) => {
	return map(t, 0, 1, a, b, true)
}

export let min = (x, lim) => {
	return x > lim? x: lim
}

export let max = (x, lim) => {
	return x < lim? x: lim
}

export let range = (min, val, max) => {
	return max(min(val, min), max)
}

export let randInt = (min, max) => {
	return Math.floor(to(Math.random(), min, max))
}

export let isEqual = (a, b, tolerance = 1) => {
	var range = Math.pow(10, -tolerance)
	return a - range < b && b < a + range
}

export let binarySearch = (length, check) => {
	var i =  Math.floor(.5 * length) // result
	var h = i // pointer
	while (h > 1) {
		h = Math.round(.5 * h)
		i += (check(i)? 1: -1) * h
	}
	check(i, true)
	return i
}

export let linearInterpolation = (t, points) => {
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
		params.push(map(t, lValue[0], rValue[0], lValue[i], rValue[i]))
	// Return
	return params
}

export let getValueFromDictionary = (value, list) => {
	var out
	list.forEach(l => {if (value >= l[0]) out = l[1]})
	return out
}

export let rubberRange = (value, min, max, range, state) => {
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
}

// var buffer = new Buffer(10) then var value = buffer.get(23.445) 
export class buffer {
	constructor (size) {
		this.array = []
		this.size  = size
	}
	get (value) {
		var sum    = 0
		var length = this.array.length
		if (length > this.size) this.array.shift()
		this.array.push(value)
		this.array.forEach(num => {
			if (isFinite(num)) sum += parseFloat(num)})
		return sum / length
	}
}

export let matrixMult = (width, a, b) => {
	let bWidth = b.length / width
	let out = new Array(a.length / width * bWidth).fill(0)
	for (let i = 0; i < out.length * width; i ++) {
		let p = Math.floor(i / width)
		let w = i % width
		out[p] +=
			a[w+Math.floor(p / bWidth) * width] *
			b[p % bWidth + w * bWidth]
	}
	return {out, width : bWidth}
}
