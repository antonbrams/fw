


export default class Vec {

    constructor (x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    copy () {
        return new Vec(this.x, this.y)
    }

    add (vec, set) {
	    if (set) {
	        this.x += (vec.x || 0)
	        this.y += (vec.y || 0)
	        return this
        } else return new Vec(
            this.x + (vec.x || 0),
            this.y + (vec.y || 0)
        )
    }

    sub (vec, set) {
		if (set) {   
	        this.x -= (vec.x || 0)
	        this.y -= (vec.y || 0)
	        return this
		} else return new Vec(
            this.x - (vec.x || 0),
            this.y - (vec.y || 0)
        )
    }
    
    div (vec, apply) {
	    if (apply) {
	        this.x /= (vec.x || 1)
	        this.y /= (vec.y || 1)
	        return this
        } else return new Vec(
            this.x / (vec.x || 1),
            this.y / (vec.y || 1)
        )
    }

    len () {
        return Math.sqrt(
            Math.pow(this.x || 0, 2) +
            Math.pow(this.y || 0, 2)
        )
    }

    scale (len, set) {
	    if (set) {	
			this.x *= len
			this.y *= len
			return this
		} else return new Vec(
            this.x * len,
            this.y * len
        )
    }

    norm (set) {
	    if (set) {
		    var len = 1 / this.len()
	        this.x *= len
	        this.y *= len
	        return this
	    } else {
		    var len = 1 / this.len()
	        return new Vec(
	            this.x * len,
	            this.y * len
	        )
        }
    }
 
    resize (len) {
        var norm = this.getNorm()
        return new Vec(
            norm.x * len,
            norm.y * len
        )
    }

    to (vec, i) {
    	return new Vec(
	    	i * ((vec.x || 0) - this.x) + this.x,
	    	i * ((vec.y || 0) - this.y) + this.y
    	)
    }
    
    rotate (angle, set) {
        var rad = Math.PI / 180 * angle
        var cos = Math.cos(rad)
        var sin = Math.sin(rad)
        var x   = (cos * this.x) + (sin * this.y)
        var y   = (cos * this.y) - (sin * this.x)
	    if (set) {
	        this.x = x
	        this.y = y
	        return this
	    } else {
	        return new Vec(x, y)
        }
    }

    getAngle () {
	    return Math.atan2(this.x, this.y) * 180 / Math.PI
    }

    unit (unit) {
    	return {
	    	x: this.x + unit,
	    	y: this.y + unit
    	}
    }

    log (name) {
        var data = {x: this.x, y: this.y}
        if (typeof name === 'undefined') 
            console.log(data)
        else
            console.log(name, data)
    }
    
    set (params) {
        for (var i in params)
            this[i](params[i])
    }
    
    apply (fn) {
        return new Vec(
            fn(this.x),
            fn(this.y),
        )
    }
}


