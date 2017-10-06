
import {vec, val, math, matrix} from '../index'

// viewport offset
export let vpo = dom => {
	var rect = dom.getBoundingClientRect()
	return {
		position : new vec(rect.left,  rect.top),
		opposite : new vec(rect.right, rect.bottom),
		size     : new vec(rect.width, rect.height)
	}
}

export let vp = () => new vec(
	document.documentElement.clientWidth,
	document.documentElement.clientHeight)

export let center = params => {
	// for regular vector system
	if (val.isVec(params))
		return params.position.add(params.size.scale(.5))
	// for dimension system
	else if (val.isDim(params)) {
		var rect = dimvec(params)
		return rect.position.add(rect.size.scale(.5))
	}
}

export let dimvec = dims => {
	var size = 
		dims.w? new vec(dims.w, dims.h):
		dims.r? new vec(dims.r - dims.l, dims.b - dims.t): null
	return {size, position: new vec(dims.l, dims.t)}
}

export let vecdim = (position, size) => {
	var box = {
		l: position.x, w: size.x,
		t: position.y, h: size.y
	}
	box.r = box.l + box.w
	box.b = box.t + box.h
	return box
}

export let boxCollision = (a, b) => (
		a.l < b.l + b.w && a.t < b.t + b.h
	&&  b.l < a.l + a.w && b.t < a.t + a.h)

export let hitTest = (a, pointer) => (
		a.l < pointer.x && pointer.x < a.l + a.w
	&&  a.t < pointer.y && pointer.y < a.t + a.h)

export let contains = (a, b) => (
		b.l <= a.l && a.l + a.w <= b.l + b.w
	&&	b.t <= a.t && a.t + a.h <= b.t + b.h)

export let getSide = (pointer, size, border) => {
	var border  = .5 * border
	return {
		x: pointer.x < border? 'l': size.x - pointer.x < border? 'r': 'c',
		y: pointer.y < border? 't': size.y - pointer.y < border? 'b': 'c'
	}
}

// {x: 'l|c|r', y: 't|m|b'}
export let getCursor = side => side? {
		t: {l: 'nw-resize', c: 'n-resize', r: 'ne-resize'},
		c: {l:  'w-resize', c:     'move', r:  'e-resize'},
		b: {l: 'sw-resize', c: 's-resize', r: 'se-resize'}
	}[side.y][side.x]: null	

export let makeMatrix = dom => new matrix()
	.scale(dom.rect)
	.translate(dom.center)
	.rotate(parseFloat(dom.rotate))

export let match = (from, to) => {
	let position = to.center.sub(from.center)
	let scale    = to.rect.size.div(from.rect.size);
	return {
		from : new matrix()
			.scale(scale)
			.translate(position), 
		to : new matrix()
			.scale(new vec().fill(1).div(scale))
			.translate(position.scale(-1))
	}
}

export let undoMatrix = (parentMatrix, parentOrigin, childOrigin, scale) => 
	new matrix()
		.translate(childOrigin
			.sub(parentOrigin)
			.mult(new vec(1, 1, 1).sub(scale)))
		.mult(parentMatrix.invert())
