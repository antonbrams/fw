


import {vec, val, math, matrix} from '../index'

export default {
	
	// viewport offset
	vpo (dom) {
		var rect = dom.getBoundingClientRect()
		return {
			position : new vec(rect.left,  rect.top),
			opposite : new vec(rect.right, rect.bottom),
			size     : new vec(rect.width, rect.height)
		}
	},

	vp () {
		return new vec(
			document.documentElement.clientWidth,
			document.documentElement.clientHeight
		)
	},
	
	center (params) {
		// for regular vector system
		if (val.isVec(params))
			return params.position.add(params.size.scale(.5))
		// for dimension system
		else if (val.isDim(params)) {
			var rect = this.dimvec(params)
			return rect.position.add(rect.size.scale(.5))
		}
	},
	
	dimvec (dims) {
		var size = 
			dims.w? new vec(dims.w, dims.h):
			dims.r? new vec(dims.r - dims.l, dims.b - dims.t): null
		return {size, position: new vec(dims.l, dims.t)}
	},

	vecdim (position, size) {
		var box = {
			l: position.x, w: size.x,
			t: position.y, h: size.y
		}
		box.r = box.l + box.w
		box.b = box.t + box.h
		return box
	},
	
	boxCollision (a, b) {
		return (
			a.l < b.l + b.w && a.t < b.t + b.h
		&&  b.l < a.l + a.w && b.t < a.t + a.h)
	},
	
	hitTest (a, pointer) {
		return (
			a.l < pointer.x && pointer.x < a.l + a.w
		&&  a.t < pointer.y && pointer.y < a.t + a.h)
	},
	
	contains (a, b) {
		return (
			b.l <= a.l && a.l + a.w <= b.l + b.w
		&&	b.t <= a.t && a.t + a.h <= b.t + b.h)
	},
	
	getSide (pointer, size, border) {
		var border  = .5 * border
		return {
			x: pointer.x < border? 'l': size.x - pointer.x < border? 'r': 'c',
			y: pointer.y < border? 't': size.y - pointer.y < border? 'b': 'c'
		}
	},
	
	// {x: 'l|c|r', y: 't|m|b'}
	getCursor (side) {
		return side? {
			t: {l: 'nw-resize', c: 'n-resize', r: 'ne-resize'},
			c: {l:  'w-resize', c:     'move', r:  'e-resize'},
			b: {l: 'sw-resize', c: 's-resize', r: 'se-resize'}
		}[side.y][side.x]: null	
	},
	
	makeMatrix (dom) {
		return new matrix()
			.scale(dom.rect)
			.translate(dom.center)
			.rotate(parseFloat(dom.rotate))
	},
	
	match (from, to) {
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
	},
	
	undoMatrix (parentMatrix, parentOrigin, childOrigin, scale) {
		return new matrix()
			.translate(childOrigin
				.sub(parentOrigin)
				.mult(new vec(1, 1, 1).sub(scale)))
			.mult(parentMatrix.invert())
	}
}


