


export default {

    child (query, parent = document) {
        var el =
            query[0] == '#'? parent.getElementById(query.slice(1)) :
            query[0] == '.'? parent.getElementsByClassName(query.slice(1)) :
            parent.getElementsByTagName(query)
        el.child = (query) => {
            return this.child(query, el)
        }
        return el
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

    div (css, content) {
        var div = document.createElement('div')
        css.split(', ').forEach(function (style) {
            div.classList.add(style)
        })
        if (content) div.innerHTML = content
        return div
    },
}


