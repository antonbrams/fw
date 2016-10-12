


import {default as fwCss}   from './css'
import {default as fwMath}  from './math'

export default {
    
    ellipsis (dom, count) {
        var string = dom.firstChild
        var length = dom.innerHTML.length
        // create range and set cursor to the end
        var range = document.createRange()
        range.setEnd(string, length)
        // get line height
        range.setStart(string, length - 1)
        var line = range.getBoundingClientRect().height
        // get whole height
        range.setStart(string, 0)
        var block = range.getBoundingClientRect().height
        // check if it's necessary to do a search
        if (line < block && block > line * count) {
            var frame = dom.getBoundingClientRect()
            var last  = fwMath.binarySearch(length, function (i, end) {
                range.setStart(string, i)
                return range.getBoundingClientRect().top - frame.top < line * count
            })
            // delete rest and add ellipsis
            range.deleteContents()
            if (last < length) dom.innerHTML += '&hellip;'
        }
    },

	lineCount (dom) {
		return (
			dom.offsetHeight / 
			parseInt(fwCss.computed(dom, 'line-height'))
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
	},
    
    numberPadding (num, symbol, length) {
        var num = num + ''
        while (num.length < length) num = symbol + num
        return num
    },
}


