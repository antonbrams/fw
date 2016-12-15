


import {val, vec} from './fw'

/*
    // TODO: http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
    http://stackoverflow.com/questions/10592823/how-to-reverse-engineer-a-webkit-matrix3d-transform
    http://www.alanzucconi.com/2016/02/10/tranfsormation-matrix/
    https://github.com/infamous/boxer/blob/master/src/math/Quaternion.js
    http://jsfiddle.net/dFrHS/1/
    http://keithclark.co.uk/articles/calculating-element-vertex-data-from-css-transforms/
*/

export default class Matrix {
    
    constructor (value) {
        this.init = [
            1, 0, 0, 0, 
            0, 1, 0, 0,
            0, 0, 1, 0, 
            0, 0, 0, 1
        ]
        this.value = 
            !val.exists(value)? this.init:
             val.isStr(value)? this.fromString(value): value
    }
        
    multiply (b, set) {
        var a = this.value
        var result = [
			b[ 0]*a[0] + b[ 1]*a[4] + b[ 2]*a[ 8] + b[ 3]*a[12],
			b[ 0]*a[1] + b[ 1]*a[5] + b[ 2]*a[ 9] + b[ 3]*a[13],
			b[ 0]*a[2] + b[ 1]*a[6] + b[ 2]*a[10] + b[ 3]*a[14],
			b[ 0]*a[3] + b[ 1]*a[7] + b[ 2]*a[11] + b[ 3]*a[15],
			b[ 4]*a[0] + b[ 5]*a[4] + b[ 6]*a[ 8] + b[ 7]*a[12],
			b[ 4]*a[1] + b[ 5]*a[5] + b[ 6]*a[ 9] + b[ 7]*a[13],
			b[ 4]*a[2] + b[ 5]*a[6] + b[ 6]*a[10] + b[ 7]*a[14],
			b[ 4]*a[3] + b[ 5]*a[7] + b[ 6]*a[11] + b[ 7]*a[15],
			b[ 8]*a[0] + b[ 9]*a[4] + b[10]*a[ 8] + b[11]*a[12],
			b[ 8]*a[1] + b[ 9]*a[5] + b[10]*a[ 9] + b[11]*a[13],
			b[ 8]*a[2] + b[ 9]*a[6] + b[10]*a[10] + b[11]*a[14],
			b[ 8]*a[3] + b[ 9]*a[7] + b[10]*a[11] + b[11]*a[15],
			b[12]*a[0] + b[13]*a[4] + b[14]*a[ 8] + b[15]*a[12],
			b[12]*a[1] + b[13]*a[5] + b[14]*a[ 9] + b[15]*a[13],
			b[12]*a[2] + b[13]*a[6] + b[14]*a[10] + b[15]*a[14],
			b[12]*a[3] + b[13]*a[7] + b[14]*a[11] + b[15]*a[15]
		]
        if (set) 
            this.value = result
        else 
            return new Matrix(result)
	}
    
    toString () {
        return `matrix3d(${this.value.join(',')})`
    }
    
    fromString (string) {
        return string
            .replace(/matrix3d\(|\)/g, '')
            .split(',')
            .map(parseFloat)
    }
    
    translate (v, set) {
        var x = v.x
        var y = v.y
        var z = v.z
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
        else
            return this
                .rotateX(v.x, set)
                .rotateY(v.y, set)
                .rotateZ(v.z, set)
    }
    
    getRotation () {
        return new vec(
            Math.atan2(this.value[9], this.value[10]),
            Math.asin(-this.value[8]),
            Math.atan2(this.value[4], this.value[0])
        ).apply(axis => - axis.value * 180 / Math.PI)
    }
    
    scale (v, set) {
        if (val.isNum(v))
            return this.scale(new vec(v, v, v), set)
        else {
            var x = v.x
            var y = v.y
            var z = v.z
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
    
    reset () {
        this.value = this.init
        return this
    }

}


