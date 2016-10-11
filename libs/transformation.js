


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

export default dom => {

	// Store Values
	dom.value = {
		     origin: {x: 0, y: 0},
		translation: {x: 0, y: 0},
		      scale: {x: 1, y: 1},
		   rotation: {z: 0}
	}

	// Origin
	dom.origin = function (x, y) {
		if (x instanceof fwVec) {
			this.value.origin.x = x.x
			this.value.origin.y = x.y
		} else if (x && y) {
			this.value.origin.x = x
			this.value.origin.y = y
		} else {
			this.value.origin.x = '50%'
			this.value.origin.y = '50%'
		}
		setOrigin(this)
		return this
	}
	
	dom.originX = function (value) {
		this.value.origin.x = value
		setOrigin(this)
		return this
	}

	dom.originY = function (value) {		
		this.value.origin.y = value
		setOrigin(this)
		return this
	}

	// Translate
	dom.move = function (x, y) {
		if (x instanceof fwVec) {
			this.value.translation.x = x.x
			this.value.translation.y = x.y
		} else if (x && y) {
			this.value.translation.x = x
			this.value.translation.y = y
		} else {
			this.value.translation.x =
			this.value.translation.y = 0
		}
		setTransformation(this)
		return this
	}
	
	dom.moveX = function (value) {
		this.value.translation.x = value || 0
		setTransformation(this)
		return this
	}

	dom.moveY = function (value) {
		this.value.translation.y = value || 0
		setTransformation(this)
		return this
	}

	// Scale
	dom.scale = function (x, y) {
		if (x instanceof fwVec) {
			this.value.scale.x = x.x
			this.value.scale.y = x.y
		} else if (x && y) {
			this.value.scale.x = x
			this.value.scale.y = y
		} else if (x) {
			this.value.scale.x =
			this.value.scale.y = x
		} else {
			this.value.scale.x =
			this.value.scale.y = 1.0
		}
		setTransformation(this)
		return this
	}

	dom.scaleX = function (value) {
		this.value.scale.x = value || 1.0
		setTransformation(this)
		return this
	}

	dom.scaleY = function (value) {
		this.value.scale.y = value || 1.0
		setTransformation(this)
		return this
	}

	// Rotate
	dom.rotate = function (value) {
		this.value.rotation.z = value || 0
		setTransformation(this)
		return this
	}
}


