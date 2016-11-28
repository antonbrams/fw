


import {css} from './fw'

export default {
    
    // create ('div#id .class .class')
    create (query) {
        var params = query.split(' ')
        if (params[0].match(/./)) params.unshift('div')
        var typeid = params[0].split('#')
        // create from tag
        var element = document.createElement(typeid[0])
        // set id
        if (typeid[1]) element.id = typeid[1]
        // set css class
        params.slice(1).forEach(style => {
            element.classList.add(style.slice(1))
        })
        return element
    },
    
    fromString (html) {
		var parent = document.createElement('div')
	    parent.innerHTML = html
	    return parent.firstChild
	},
    
	prepend (parent, child) {
    	if (parent.firstChild) 
    		parent.insertBefore(child, parent.firstChild) 
    	else 
    		parent.appendChild(child)
	},
    
	clone (dom) {
		var clone = dom.cloneNode(true);
		clone.remove = () => this.parentNode.removeChild(this)
		dom.parentNode.appendChild(clone)
		return clone
	},
    
	selection (mode) {
		document.ondragstart   =
		document.onselectstart = mode ? null : () => false
	},
}


