


import {default as fwCss}   from './css'
import {default as fwMath}  from './math'

export default {
    
    ellipsis (dom, count) {
        var line   = this.getLineHeight(dom)
        var length = dom.innerHTML.length
        var target = line * count
        // multi column solution
        if (fwCss.computed(dom, 'column-count') > 1) {
            var string    = dom.innerHTML
            var block     = dom.offsetHeight
            // check if it's necessary to do a search
            if (line < block && block > target) {
                fwMath.binarySearch(length, function (i, end) {
                    dom.innerHTML = string.substring(0, end? i - 3: i)
                    return dom.offsetHeight < target
                })
                // add ellipsis
                dom.innerHTML += '&hellip;'
            // put back
            } else dom.innerHTML = string
        // single column solution
        } else {
            var string = dom.firstChild
            var block  = dom.offsetHeight
            if (line < block && block > target) {
                var frame  = dom.getBoundingClientRect()
                var range  = document.createRange()
                range.setEnd(string, length)
                fwMath.binarySearch(length - 2, function (i, end) {
                    range.setStart(string, end? i - 3: i)
                    return range.getBoundingClientRect().top - frame.top < target
                })
                // delete rest and add ellipsis
                range.deleteContents()
                dom.innerHTML += '&hellip;'
            }
        }
    },

	lineCount (dom) {
		return (
			dom.offsetHeight / 
			this.getLineHeight(dom)
		)
	},

    getLineHeight (dom) {
        var string = dom.firstChild
        var range  = document.createRange()
        range.setStart(string, 0)
        range.setEnd  (string, 1)
        return range.getBoundingClientRect().height
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


