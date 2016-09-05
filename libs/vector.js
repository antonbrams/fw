


export default class Vec {

    constructor (x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
		console.log('vector not cutted')
    }

    copy () {
        return new Vec(this.x, this.y, this.z)
    }

    add (vec, set) {
	    if (set) {
	        this.x += vec.x
	        this.y += vec.y
	        this.z += vec.z
	        return this
        } else return new Vec(
            this.x + vec.x,
            this.y + vec.y,
            this.z + vec.z
        )
    }

    sub (vec, set) {
		if (set) {   
	        this.x -= vec.x
	        this.y -= vec.y
	        this.z -= vec.z
	        return this
		} else return new Vec(
            this.x - vec.x,
            this.y - vec.y,
            this.z - vec.z
        )
    }
    
    div (vec, apply) {
	    if (apply) {
	        this.x /= vec.x
	        this.y /= vec.y
	        this.z /= vec.z
	        return this
        } else return new Vec(
            this.x / vec.x,
            this.y / vec.y,
            this.z / vec.z
        )
    }

    len () {
        return Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2) +
            Math.pow(this.z, 2)
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

    getTween (vec, i) {
    	return new Vec(
	    	i * (vec.x - this.x) + this.x,
	    	i * (vec.y - this.y) + this.y,
	    	i * (vec.z - this.z) + this.z
    	)
    }

    getAngle2D () {
	    return Math.atan2(this.x, this.y) * 180 / Math.PI
    }
};


