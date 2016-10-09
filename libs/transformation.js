


import {default as fwStyle} from './style'
import {default as fwVec} 	from './vector'

// Methods
var setTransformation = dom => {
	var translate = 'translate('+
		dom.value.translation.x +'px, '+ 
		dom.value.translation.y +'px)'
	var scale = 'scale('+ 
		dom.value.scale.x +', '+ 
		dom.value.scale.y +')'
	dom.style[fwStyle.vendor.transform] = translate +' '+ scale
}

var setOrigin = dom => {
	dom.style[fwStyle.vendor.transformOrigin] =
		dom.value.origin.x +' '+ 
		dom.value.origin.y
}

export default element => {

	// Store Values
	element.value = {
		     origin: {x: 0, y: 0},
		translation: {x: 0, y: 0},
		      scale: {x: 1, y: 1},
		   rotation: {z: 0}
	}

	// Origin
	element.origin = vec => {	
		element.value.origin.x = vec.x
		element.value.origin.y = vec.y
		setOrigin(element)
		return element
	}

	element.originXY = (x, y) => {
		element.value.origin.x = x
		element.value.origin.y = y
		setOrigin(element)
		return element
	}
	
	element.originX = value => {
		element.value.origin.x = value
		setOrigin(element)
		return element
	}

	element.originY = value => {		
		element.value.origin.y = value
		setOrigin(element)
		return element
	}

	// Translate
	element.translate = vec => {
		element.value.translation.x = vec.x
		element.value.translation.y = vec.y
		setTransformation(element)
		return element
	}

	element.translateXY = (x, y) => {
		element.value.translation.x = x
		element.value.translation.y = y
		setTransformation(element)
		return element
	}
	
	element.translateX = value => {
		element.value.translation.x = value
		setTransformation(element)
		return element
	}

	element.translateY = value => {
		element.value.translation.y = value
		setTransformation(element)
		return element
	}

	// Scale
	element.scale = vec => {
		if (vec instanceof fwVec) {
			element.value.scale.x = vec.x
			element.value.scale.y = vec.y
		} else {
			element.value.scale.x =
			element.value.scale.y = vec
		}
		setTransformation(element)
		return element
	}
	
	element.scaleXY = (x, y) => {
		element.value.scale.x = x
		element.value.scale.y = y
		setTransformation(element)
		return element
	}

	element.scaleX = value => {
		element.value.scale.x = value
		setTransformation(element)
		return element
	}

	element.scaleY = value => {
		element.value.scale.y = value
		setTransformation(element)
		return element
	}

	// Rotate
	element.rotate = value => {
		element.value.rotation.z = value
		setTransformation(element)
		return element
	}
}


