


import {val, vec} from './fw'

/*
    // TODO: http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
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
            var {x,y,z} = v
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
    
    // projectionMapping (lt, lb, rt, rb) {
    //     var w = 1, h = 1;
    //     var adj = function (m) { return [
    //         m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
    //         m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
    //         m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]
    //     ]}
    //     var multmv = function (m, v) { return [
    //         m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
    //         m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
    //         m[6]*v[0] + m[7]*v[1] + m[8]*v[2]
    //     ]}
    //     var multmm = function (a, b) {
    //         var c = Array(9)
    //         for (var i = 0; i != 3; ++i)
    //             for (var j = 0; j != 3; ++j) {
    //                 var cij = 0
    //                 for (var k = 0; k != 3; ++k)
    //                     cij += a[3*i + k]*b[3*k + j]
    //                 c[3*i + j] = cij
    //             }
    //         return c
    //     }
    //     var basisToPoints = function (x1, y1, x2, y2, x3, y3, x4, y4) {
    //         var m = [
    //             x1, x2, x3,
    //             y1, y2, y3,
    //              1,  1,  1
    //         ]
    //         var v = multmv(adj(m), [x4, y4, 1])
    //         return multmm(m, [
    //             v[0], 0, 0,
    //             0, v[1], 0,
    //             0, 0, v[2]
    //         ])
    //     }
    //     var s = basisToPoints(
    //         0, 0, w, 0, 
    //         0, h, w, h
    //     )
    //     var d = basisToPoints(
    //         lt.x, lt.y, lb.x, lb.y, 
    //         rt.x, rt.y, rb.x, rb.y
    //     )
    //     var t = multmm(d, adj(s))
    //     for (i = 0; i != 9; ++i) t[i] = t[i]/t[8];
    //     return [
    //         t[0], t[3], 0, t[6],
    //         t[1], t[4], 0, t[7],
    //            0,    0, 1,    0,
    //         t[2], t[5], 0, t[8]
    //     ]
    // }
    
    reset () {
        this.value = this.init
        return this
    }

}


