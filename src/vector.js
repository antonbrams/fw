
import {val, math} from '../index'
const axis = ['x', 'y', 'z']

export default class Vec {
	
	constructor (x = 0, y = 0, z = 0) {
		this.x = x
		this.y = y
		this.z = z
	}
	
	add (vec, set) {return this.apply(axis => axis.value + (vec[axis.name] || 0), set)}
	sub (vec, set) {return this.apply(axis => axis.value - (vec[axis.name] || 0), set)}
	div (vec, set) {return this.apply(axis => axis.value / (vec[axis.name] || 1), set)}
	mult (vec, set) {return this.apply(axis => axis.value * (vec[axis.name] || 1), set)}
	
	scale (len, set) {return this.mult(new Vec().fill(len))}
	norm (set) {return this.scale(1 / this.len(), set)}
	
	to (vec, i, set) {return this.apply(t => math.to(i, t.value, vec[t.name] || 0), set)}
	copy () {return new Vec(this.x, this.y, this.z)}
	fill (value) {return this.apply(t => value, true)}
	reset () {return this.fill(0)}
	
	get len () {
		var value = 0
		axis.forEach(x => value += Math.pow(this[x] || 0, 2))
		return Math.sqrt(value)
	}
	
	resize (len, set) {
		var norm = this.norm()
		return this.apply(t => norm[t.name] * len, set)
	}
	
	rotate (angle, set) {
		var rad = Math.PI / 180 * angle
		var cos = Math.cos(rad)
		var sin = Math.sin(rad)
		var x   = (cos * this.x) + (sin * this.y)
		var y   = (cos * this.y) - (sin * this.x)
		if (set) {
			this.x = x
			this.y = y
			return this
		} else {
			return new Vec(x, y)
		}
	}
	
	angle2d () {
		return Math.atan2(this.x, this.y) * 180 / Math.PI
	}
	
	log (name) {
		var out = {}
		axis.forEach(x => {if (val.exists(this[x])) out[x] = this[x]})
		if (typeof name === 'undefined') console.log(out)
		else console.log(name, out)
	}
		
	set (params) {
		for (var i in params) this[i](params[i])
	}
	
	apply (fn, set) {
		var out = new Vec()
		axis.forEach(axis => (set? this: out)[axis] = fn({
			name  : axis, 
			value : this[axis]
		}))
		return set? this: out
	}
		
	mix (list) {
		var sum = new Vec()
		var len = 1
		if (val.isArr(list)) {
			len = list.length
			for (var i = 0; i < len; i ++) 
				sum.add(list[i], true)
		} else if (val.isObj(list)) {
			len = Object.keys(list).length
			for (var v in list)
				sum.add(list[v], true)
		}
		return sum.div(new Vec().fill(len))
	}
	
	range (rect, set) {
		var range = val.exists(rect.length)? (
			val.isNum(rect.length)? 
			{x: rect.length, y: rect.length}: 
			rect.length
		): {x: 100, y: 100}
		rect.onLimit = rect.onLimit || {}
		var vec = new Vec(
			math.rubberRange(this.x, rect.l, rect.r, range.x, rect.onLimit.x),
			math.rubberRange(this.y, rect.t, rect.b, range.y, rect.onLimit.y)
		)
		if (set) {
			this.x = vec.x
			this.y = vec.y
		} else return vec
	}
	
	int () {return this.apply(axis => parseInt(axis.value))}
	float () {return this.apply(axis => parseFloat(axis.value))}
	unit (unit) {return this.apply(axis => axis.value + unit)}
	
	get px  () {return this.unit('px')}
	get pt  () {return this.unit('pt')}
	get pc  () {return this.unit('%')}
	get em  () {return this.unit('em')}
	get vw  () {return this.unit('vw')}
	get vh  () {return this.unit('vh')}
	get cm  () {return this.unit('cm')}
	get mm  () {return this.unit('mm')}
	get em  () {return this.unit('em')}
	get rem () {return this.unit('rem')}
}
