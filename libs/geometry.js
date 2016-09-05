


import {
	style	as fwStyle, 
	dom  	as fwDom
} from 'fw'

export default {

	viewPortOffset (dom) {
		var params = dom.getBoundingClientRect()
    	return {
	    	l: params.left,
	    	t: params.top
    	}
	},
	
	offset (dom, parent) {
		var dom    = _dom
		var offset = {l: 0, t: 0}
        var parent = parent || document.body
		while (dom && dom.parentNode && dom != parent) {
            var position = {
                l: dom.offsetLeft,
                t: dom.offsetTop
            }
            var scroll = {
                l: dom.parentNode.scrollLeft,
                t: dom.parentNode.scrollTop
            }
            var margin = {
                l: fwStyle.computed(dom, 'margin-left'),
                t: fwStyle.computed(dom, 'margin-top'),
            }
			offset.l += position.l - scroll.l - margin.l
			offset.t += position.t - scroll.t - margin.t
			dom = dom.parentNode
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
			a.l < b.l + b.w && a.t < b.t + b.h &&
			b.l < a.l + a.w && b.t < a.t + a.h
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


