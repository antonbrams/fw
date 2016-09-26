


export default class Vec {

    constructor (x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    copy () {
        return new Vec(this.x, this.y, this.z)
    }

    add (vec, set) {
	    if (set) {
	        this.x += vec.x || 0
	        this.y += vec.y || 0
	        this.z += vec.z || 0
	        return this
        } else return new Vec(
            this.x + vec.x || 0,
            this.y + vec.y || 0,
            this.z + vec.z || 0
        )
    }

    sub (vec, set) {
		if (set) {   
	        this.x -= vec.x || 0
	        this.y -= vec.y || 0
	        this.z -= vec.z || 0
	        return this
		} else return new Vec(
            this.x - vec.x || 0,
            this.y - vec.y || 0,
            this.z - vec.z || 0
        )
    }
    
    div (vec, apply) {
	    if (apply) {
	        this.x /= vec.x || 1
	        this.y /= vec.y || 1
	        this.z /= vec.z || 1
	        return this
        } else return new Vec(
            this.x / vec.x || 1,
            this.y / vec.y || 1,
            this.z / vec.z || 1
        )
    }

    len () {
        return Math.sqrt(
            Math.pow(this.x || 0, 2) +
            Math.pow(this.y || 0, 2) +
            Math.pow(this.z || 0, 2)
        )
    }

    scale (len, set) {
	    if (set) {	
			this.x *= len
			this.y *= len
			this.z *= len
			return this
		} else return new Vec(
            this.x * len,
            this.y * len,
            this.z * len
        )
    }

    norm (set) {
	    if (set) {
		    var len = 1 / this.len()
	        this.x *= len
	        this.y *= len
	        this.z *= len
	        return this
	    } else {
		    var len = 1 / this.len()
	        return new Vec(
	            this.x * len,
	            this.y * len,
	            this.z * len
	        )
        }
    }
 
    resize (len) {
        var norm = this.getNorm()
        return new Vec(
            norm.x * len,
            norm.y * len,
            norm.z * len
        )
    }

    tween (vec, i) {
    	return new Vec(
	    	i * (vec.x || 0 - this.x) + this.x,
	    	i * (vec.y || 0 - this.y) + this.y,
	    	i * (vec.z || 0 - this.z) + this.z
    	)
    }

    getAngle2D () {
	    return Math.atan2(this.x, this.y) * 180 / Math.PI
    }
};


