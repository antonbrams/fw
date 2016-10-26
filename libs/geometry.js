


import {default as fwCss} from './css'
import {default as fwVec} 	from './vector'

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

	viewPortOffset (dom) {
		var params = dom.getBoundingClientRect()
    	return new fwVec(params.left, params.top)
	},
	
	offset (_dom, parent) {
		var dom    = _dom
		var offset = new fwVec()
        var parent = parent || document.body
		while (dom && dom.parentNode && dom != parent) {
            var position = new fwVec(dom.offsetLeft, dom.offsetTop)
			var scroll   = new fwVec(dom.parentNode.scrollLeft, dom.parentNode.scrollTop)
            var margin   = new fwVec(fwCss.computed(dom, 'margin-left'), fwCss.computed(dom, 'margin-top'))
            var padding  = new fwVec(fwCss.computed(dom, 'padding-left'), fwCss.computed(dom, 'padding-top'))
			offset       = offset.add(position).sub(scroll).sub(margin).sub(padding)
			dom          = dom.parentNode
		}
		return offset
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

    viewPortSize (w, h, winW, winH, margin, minWidthVal) {
		var output	 	= new Object()
		var aspect		= w / h
		var winHeight 	= winH - 2 * margin
		var calcHeight 	= winW / aspect
		var maxHeight  	= 
			winHeight 	* aspect < minWidthVal?
			minWidthVal / aspect:
			winHeight
		if (winW < w && calcHeight < maxHeight ) {
			output.w 	= winW
			output.h 	= calcHeight
			output.m 	= 0
		} else {
			var origCalcWidth 	= maxHeight * aspect
			var normCalcWidth 	= origCalcWidth < w? origCalcWidth: w
			var calcSide  		= (winW - normCalcWidth) / 2
			output.w 	= normCalcWidth
			output.h 	= maxHeight < h? maxHeight: h
			output.m 	= calcSide  < margin? calcSide: margin
		}
		return output
	},
}


