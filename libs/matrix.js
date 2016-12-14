


export default Matrix {
    
    constructor (value) {
        this.vector = value || [0, 0, 0, 1]
    }
    
    translate (v) {
        this.apply([
            1,  0,  0,  v.x,
            0,  1,  0,  v.y,
            0,  0,  1,  v.z,
            0,  0,  0,  1
        ])
        return this
    }
    
    scale (v) {
        this.apply([
            v.x,    0,   0,  0,
               0, v.y,   0,  0,
               0,   0, v.z,  0,
               0,   0,   0,  1
        ])
        return this
    }
    
    rotateX (angle) {
        var a = Math.cos(angle)
        var b = Math.sin(angle)
        this.apply([
    	    1,  0,  0,  0,
            0,  a,  b,  0,
            0, -b,  a,  0,
            0,  0,  0,  1
        ])
        return this
    }
    
    rotateY (angle) {
        var a = Math.cos(angle)
        var b = Math.sin(angle)
        this.apply([
            a,  0, -b,  0,
         	0,  1,  0,  0,
        	b,  0,  a,  0,
        	0,  0,  0,  1
        ])
        return this
    }
    
    rotateZ (angle) {
        var a = Math.cos(angle)
        var b = Math.sin(angle)
        this.apply([
             a,  b,  0,  0,
            -b,	 a,  0,  0,
             0,  0,  1,  0,
             0,  0,  0,  1
        ])
        return this
    }
    
    apply (m) {
        var v = this.vector
        var x = m[ 0] * v[0] + m[ 1] * v[1] + m[ 2] * v[2] + m[ 3] * v[3]
        var y = m[ 4] * v[0] + m[ 5] * v[1] + m[ 6] * v[2] + m[ 7] * v[3]
        var z = m[ 8] * v[0] + m[ 9] * v[1] + m[10] * v[2] + m[11] * v[3]
        var w = m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]
        this.vector = [x, y, z, w]
        return this
    }
}


