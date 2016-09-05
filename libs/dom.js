


export default {

    fromString (html) {
		var parent = document.createElement('div')
	    parent.innerHTML = html
	    return parent.firstChild
	},

	// Add DOM Element at Begin of the List
	prepend (parent, child) {
    	if (parent.firstChild) 
    		parent.insertBefore(child, parent.firstChild) 
    	else 
    		parent.appendChild(child)
	},

	selection (mode) {
		document.ondragstart   =
		document.onselectstart = mode ? null : () => false
	},

	clone (dom) {
		var clone = dom.cloneNode(true);
		clone.remove = () => this.parentNode.removeChild(this)
		dom.parentNode.appendChild(clone);
		return clone;
	},

	getDimensions (dom) {
		return {
			l: dom.offsetLeft, 
			w: dom.offsetWidth,
			t: dom.offsetTop,  
			h: dom.offsetHeight,
			r: (() => this.l + this.w)(),
			b: (() => this.t + this.h)()
		}
	},
}


