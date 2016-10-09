


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
	element.originXY = function (x, y) {
		if (x instanceof fwVec) {
			this.value.origin.x = x.x
			this.value.origin.y = x.y
		} else {
			this.value.origin.x = x
			this.value.origin.y = y
		}
		setOrigin(this)
		return this
	}
	
	element.originX = function (value) {
		this.value.origin.x = value
		setOrigin(this)
		return this
	}

	element.originY = function (value) {		
		this.value.origin.y = value
		setOrigin(this)
		return this
	}

	// Translate
	element.translateXY = function (x, y) {
		if (x instanceof fwVec) {
			this.value.translation.x = x.x
			this.value.translation.y = x.y
		} else {
			this.value.translation.x = x
			this.value.translation.y = y
		}
		setTransformation(this)
		return this
	}
	
	element.translateX = function (value) {
		this.value.translation.x = value
		setTransformation(this)
		return this
	}

	element.translateY = function (value) {
		this.value.translation.y = value
		setTransformation(this)
		return this
	}

	// Scale
	element.scale = function (vec) {
		this.value.scale.x =
		this.value.scale.y = vec
		setTransformation(this)
		return this
	}
	
	element.scaleXY = function (x, y) {
		if (x instanceof fwVec) {
			this.value.scale.x = x.x
			this.value.scale.y = x.y
		} else {
			this.value.scale.x = x
			this.value.scale.y = y
		}
		setTransformation(this)
		return this
	}

	element.scaleX = function (value) {
		this.value.scale.x = value
		setTransformation(this)
		return this
	}

	element.scaleY = function (value) {
		this.value.scale.y = value
		setTransformation(this)
		return this
	}

	// Rotate
	element.rotate = function (value) {
		this.value.rotation.z = value
		setTransformation(this)
		return this
	}
}


