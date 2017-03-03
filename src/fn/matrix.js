


import {val, vec} from '../index'

/*
    sources
    http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
    http://www.alanzucconi.com/2016/02/10/tranfsormation-matrix/
    https://github.com/infamous/boxer/blob/master/src/math/Quaternion.js
    http://jsfiddle.net/dFrHS/1/
    http://keithclark.co.uk/articles/calculating-element-vertex-data-from-css-transforms/
*/

const init = [
    1, 0, 0, 0, 
    0, 1, 0, 0,
    0, 0, 1, 0, 
    0, 0, 0, 1
]

export default class Matrix {
    
    constructor (value) {
        this.value = 
            !val.exists(value)? init:
             val.isStr(value)? this.fromString(value): value
    }
    
    multiply (matrix, set) {
        var a = this.value
        var b = matrix instanceof Matrix? matrix.value: matrix
        // 4x4 Matrix Multiplication
        var result = [
			a[ 0]*b[0] + a[ 1]*b[4] + a[ 2]*b[ 8] + a[ 3]*b[12],
			a[ 0]*b[1] + a[ 1]*b[5] + a[ 2]*b[ 9] + a[ 3]*b[13],
			a[ 0]*b[2] + a[ 1]*b[6] + a[ 2]*b[10] + a[ 3]*b[14],
			a[ 0]*b[3] + a[ 1]*b[7] + a[ 2]*b[11] + a[ 3]*b[15],
			a[ 4]*b[0] + a[ 5]*b[4] + a[ 6]*b[ 8] + a[ 7]*b[12],
			a[ 4]*b[1] + a[ 5]*b[5] + a[ 6]*b[ 9] + a[ 7]*b[13],
			a[ 4]*b[2] + a[ 5]*b[6] + a[ 6]*b[10] + a[ 7]*b[14],
			a[ 4]*b[3] + a[ 5]*b[7] + a[ 6]*b[11] + a[ 7]*b[15],
			a[ 8]*b[0] + a[ 9]*b[4] + a[10]*b[ 8] + a[11]*b[12],
			a[ 8]*b[1] + a[ 9]*b[5] + a[10]*b[ 9] + a[11]*b[13],
			a[ 8]*b[2] + a[ 9]*b[6] + a[10]*b[10] + a[11]*b[14],
			a[ 8]*b[3] + a[ 9]*b[7] + a[10]*b[11] + a[11]*b[15],
			a[12]*b[0] + a[13]*b[4] + a[14]*b[ 8] + a[15]*b[12],
			a[12]*b[1] + a[13]*b[5] + a[14]*b[ 9] + a[15]*b[13],
			a[12]*b[2] + a[13]*b[6] + a[14]*b[10] + a[15]*b[14],
			a[12]*b[3] + a[13]*b[7] + a[14]*b[11] + a[15]*b[15]
		]
        if (set) {
            this.value = result
            return this
        } else 
            return new Matrix(result)
	}
    
    /* 
        extract floats 
        from 'matrix3d(0, -1, 0.182, -0.465)'
        to [0, -1, 0.182, -0.46]
    */
    
    fromCss (string) {
        return string
            .match(/-?(\d+(.\d+)?)(?=,|\))/g)
            .map(parseFloat)
    }
    
    toCss () {
        return `matrix3d(${this.toString()})`
    }
    
    toString() {
        return this.value.join(',')
    }
    
    translate (v, set) {
        var {x,y,z} = v
        return this.multiply([
            1, 0, 0, 0, 
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ], set)
    }
    
    getTranslation () {
        return new vec(
            this.value[12], 
            this.value[13], 
            this.value[14]
        )
    }
    
    scale (v, set) {
        if (val.isNum(v))
            return this.scale(new vec().fill(v), set)
        else {
            var {x, y, z} = v
            return this.multiply([
                x, 0, 0, 0, 
                0, y, 0, 0,
                0, 0, z, 0, 
                0, 0, 0, 1
            ], set)
        }
    }
    
    getScale () {
        return new vec(
            this.value[0], 
            this.value[5], 
            this.value[10]
        )
    }
    
    rotateX (angle, set) {
		return this._rotate(angle, (c, s) => [
			1, 0, 0, 0, 
            0, c,-s, 0,
			0, s, c, 0, 
            0, 0, 0, 1
		], set)
	}
    
	rotateY (angle, set) {
		return this._rotate(angle, (c, s) => [
			 c, 0, s, 0, 
             0, 1, 0, 0,
			-s, 0, c, 0, 
             0, 0, 0, 1
		], set)
	}
    
	rotateZ (angle, set) {
		return this._rotate(angle, (c, s) => [
			c,-s, 0, 0, 
            s, c, 0, 0,
			0, 0, 1, 0, 
            0, 0, 0, 1
		], set)
	}
    
    _rotate (deg, template, set) {
        var rad = -deg * Math.PI / 180
		return this.multiply(template(Math.cos(rad), Math.sin(rad)), set)
    }
    
    rotate (v, set) {
        if (val.isNum(v))
            return this.rotateZ(v, set)
        else {
            return this
                .rotateX(v.x, set)
                .rotateY(v.y, set)
                .rotateZ(v.z, set)
        }
    }
    
    getRotation () {
        return new vec(
            Math.atan2(this.value[9], this.value[10]),
            Math.asin(-this.value[8]),
            Math.atan2(this.value[4], this.value[0])
        ).apply(axis => - axis.value * 180 / Math.PI)
    }
    
    resetRotation () {
        [0, 1, 2, 4, 5, 6, 8, 9, 10].forEach(i => this.value[i] = init[i])
        return this
    }
    
    reset () {
        this.value = init
        return this
    }
    
    project (size, lt, lb, rt, rb, set) {
        var m3x3 = (a, b) => [
          	a[0]*b[0]+a[1]*b[3]+a[2]*b[6],
            a[0]*b[1]+a[1]*b[4]+a[2]*b[7],
            a[0]*b[2]+a[1]*b[5]+a[2]*b[8],
            a[3]*b[0]+a[4]*b[3]+a[5]*b[6],
            a[3]*b[1]+a[4]*b[4]+a[5]*b[7],
            a[3]*b[2]+a[4]*b[5]+a[5]*b[8],
          	a[6]*b[0]+a[7]*b[3]+a[8]*b[6],
            a[6]*b[1]+a[7]*b[4]+a[8]*b[7],
            a[6]*b[2]+a[7]*b[5]+a[8]*b[8]
        ]
        var adjugate = m => [
            m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
            m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
            m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]
        ]
        var basisToPoints = (a, b, c, d) => {
            var m = [a.x, b.x, c.x, a.y, b.y, c.y, 1, 1, 1]
            var a = adjugate(m)
            return m3x3(m, [
                a[0]*d.x+a[1]*d.y+a[2], 0, 0,
                0, a[3]*d.x+a[4]*d.y+a[5], 0,
                0, 0, a[6]*d.x+a[7]*d.y+a[8]
            ])
        }
        var t = m3x3(basisToPoints(lt, rt, lb, rb), adjugate(
            basisToPoints(new vec(), new vec(size.x), new vec(0, size.y), size)))
        for (var i = 0; i < 9; i ++) t[i] /= t[8]
        return this.multiply([
          	t[0],t[3],0,t[6],
            t[1],t[4],0,t[7],
               0,   0,1,   0,
            t[2],t[5],0,t[8]
        ], set)
    }
}

