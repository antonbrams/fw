


export default {

    el (query) {
        return (
            query[0] == '#'? document.getElementById(query.slice(1)) :
            query[0] == '.'? document.getElementsByClassName(query.slice(1)) :
            document.getElementsByTagName(query)
        )
    },

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
		dom.parentNode.appendChild(clone)
		return clone
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

    div (css, content) {
        var div = document.createElement('div')
        css.split(', ').forEach(function (style) {
            div.classList.add(style)
        })
        if (content) div.innerHTML = content
        return div
    },
}


