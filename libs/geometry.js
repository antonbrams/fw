


import fwCss from './css'
import fwVec from './vector'

export default {
	
	// viewport offset
	vpo (dom) {
		var rect = dom.getBoundingClientRect()
    	return {
			position : new fwVec(rect.left,  rect.top),
			opposite : new fwVec(rect.right, rect.bottom),
			size     : new fwVec(rect.width, rect.height)
		}
	},

	vp () {
		return new fwVec(
			document.documentElement.clientWidth,
			document.documentElement.clientHeight
		)
	},
	
	center (params) {
		// for regular vector system
		if (this.isvec(params))
			return params.position.add(params.size.scale(.5))
		// for dimension system
		else if (this.isdim(params)) {
			var rect = this.dimvec(params)
			return rect.position.add(rect.size.scale(.5))
		}
	},
	
	isvec (obj) {
		return obj.position || obj.opposite
	},
	
	isdim (obj) {
		return obj.l || obj.r
	},
	
	dimvec (dims) {
		var size = 
			dims.w? new fwVec(dims.w, dims.h):
			dims.r? new fwVec(dims.r - dims.l, dims.b - dims.t): null
		return {size, position: new fwVec(dims.l, dims.t)}
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
		&&  b.l < a.l + a.w && b.t < a.t + a.h
		)
	},
	
	hitTest (a, pointer) {
		return (
			a.l < pointer.x && pointer.x < a.l + a.w
		&&  a.t < pointer.y && pointer.y < a.t + a.h
		)
	},
}


