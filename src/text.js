
import {css, math} from '../index'
	
export let ellipsis = (dom, lineCount, symbol) => {
	// set target height
	dom.style.height = `${this.getLineHeight(dom) * lineCount}px`
	var domRect      = dom.getBoundingClientRect()
	var multiColumn  = css.computed(dom, 'column-count') > 1
	// check if iteration is necessary
	if (multiColumn
	&&  dom.scrollWidth  > domRect.width  + 1
	||  dom.scrollHeight > domRect.height + 1){
		// init range selection
		var string = dom.firstChild
		var length = dom.innerHTML.length
		var range  = document.createRange()
		range.setEnd(string, length)
		// search for position
		math.binarySearch(length, (i, end) => {
			// make selection
			range.setStart(string, end? i - 3: i)
			// return check
			var cursorRect = range.getBoundingClientRect()
			return (multiColumn?
				cursorRect.left < domRect.right :
				cursorRect.top  < domRect.bottom - 1
			)
		})
		// delete rest and add ellipsis
		range.deleteContents()
		dom.innerHTML += symbol || '&hellip;'
	}
	// restore height
	dom.style.height = null
}

export let lineCount = dom => Math.floor(dom.offsetHeight / getLineHeight(dom))

export let getLineHeight = dom => {
	var string = dom.firstChild
	var range  = document.createRange()
	range.setStart(string, 0)
	range.setEnd  (string, 1)
	return range.getBoundingClientRect().height
}

export let capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export let hash = string => {
	var hash = 0
	for (i = 0; i < string.length; i ++) 
	hash += string.charCodeAt(i)
	return hash
}

export let numberPadding = (num, symbol, length) => {
	var num = num + ''
	while (num.length < length) num = symbol + num
	return num
}
