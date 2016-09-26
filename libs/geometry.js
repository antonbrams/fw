


import {default as fwStyle} from './style'
import {default as fwDom} 	from './dom'
import {default as fwVec} 	from './vector'

export default {

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
            var margin   = new fwVec(fwStyle.computed(dom, 'margin-left'), fwStyle.computed(dom, 'margin-top'))
            var padding  = new fwVec(fwStyle.computed(dom, 'padding-left'), fwStyle.computed(dom, 'padding-top'))
			offset       = offset.add(position).sub(scroll).sub(margin).sub(padding)
			dom          = dom.parentNode
		}
		return offset
	},
    
	domCollision (a, b) {
		return this.boxCollision(
			fwDom.getDimensions(a),
			fwDom.getDimensions(b)
		)
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


