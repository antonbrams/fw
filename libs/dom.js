


import css from './css'

export default {

    fromString (html) {
		var parent = document.createElement('div')
	    parent.innerHTML = html
	    return css.init(parent.firstChild)
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

    div (css, content) {
        var div = document.createElement('div')
        css.split(', ').forEach(function (style) {
            div.classList.add(style)
        })
        if (content) div.innerHTML = content
        return css.init(div)
    },
}


