


import {style as fwStyle} from './index'

export default {
    
	ellipsis (dom, text, ellpsis, check) {
		dom.innerHTML = text
		if (!check()) {
			var words 	= text.split(' ')
			var length 	= words.length
			var set 	= function (_i) { 
				dom.innerHTML = words
					.slice(0, _i)
					.join(' ')
					+ ellpsis
			}
			for (var i = 0; i < length; i ++) {
				set(i)
				if 	(!check()) { 
					set(i-1)
					break
				}
			}
		}
	},

	lineCount (dom) {
		return (
			dom.offsetHeight / 
			parseInt(fwStyle.computed(dom, 'line-height'))
		)
	},

	capitalize (string) {
    	return string.charAt(0).toUpperCase() + string.slice(1)
	},

	hash (string) {
	    var hash = 0
	    for (i = 0; i < string.length; i ++) 
	    	hash += string.charCodeAt(i)
	    return hash
	}
}


