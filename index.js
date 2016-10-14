(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fw"] = factory();
	else
		root["fw"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _geometry = __webpack_require__(1);

var _geometry2 = _interopRequireDefault(_geometry);

var _vector = __webpack_require__(2);

var _vector2 = _interopRequireDefault(_vector);

var _css = __webpack_require__(0);

var _css2 = _interopRequireDefault(_css);

var _animation = __webpack_require__(3);

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    init: function init(dom) {
        var _this = this;

        _animation2.default.flow(dom);
        dom.data = {
            origin: new _vector2.default(),
            translate: new _vector2.default(),
            scale: new _vector2.default(1, 1),
            rotate: 0
        };
        dom.set = function (params) {
            for (var p in params) {
                // transformation
                if (typeof dom.data[p] !== 'undefined') {
                    if (p == 'rotate') dom.data.rotate = params[p];else {
                        if (typeof params[p].x !== 'undefined') dom.data[p].x = params[p].x;
                        if (typeof params[p].y !== 'undefined') dom.data[p].y = params[p].y;
                    }
                    _this.applyTransformation(dom, dom.data, p);
                    // movement and sizing
                } else if (p == 'move') {
                    dom.style.left = params[p].x;
                    dom.style.top = params[p].y;
                } else if (p == 'size') {
                    dom.style.width = params[p].x;
                    dom.style.height = params[p].y;
                    // custom parameters
                } else dom.style[p] = params[p];
            }
            return dom;
        };
        dom.get = function (prop) {
            if (prop == 'offset') return _geometry2.default.vpo(dom);else if (typeof dom.data[prop] !== 'undefined') return dom.data[prop];else _this.computed(dom, prop);
        };
        return dom;
    },
    applyTransformation: function applyTransformation(dom, data, type) {
        if (type == 'origin') dom.style[_css2.default.vendor.transformOrigin] = data.origin.x + ' ' + data.origin.y;else dom.style[_css2.default.vendor.transform] = 'translate(' + data.translate.x + 'px, ' + data.translate.y + 'px) ' + 'rotate(' + data.rotate + 'deg) ' + 'scale(' + data.scale.x + ', ' + data.scale.y + ')';
    },
    computed: function computed(dom, prop) {
        return parseInt(document.defaultView.getComputedStyle(dom, null).getPropertyValue(prop));
    },


    vendor: function (props) {
        var out = {};
        if (typeof document === "undefined") return out;
        var prefix = [null, 'ms', 'webkit', 'moz', 'o'];
        var div = document.createElement('div');
        props.forEach(function (prop) {
            for (var i = 0; i < prefix.length; i++) {
                var p = prefix[i] + prefix[i] ? prop.charAt(0).toUpperCase() + prop.slice(1) : prop;
                if (typeof div.style[p] !== 'undefined') {
                    out[prop] = p;break;
                }
            }
        });
        return out;
    }(['transform', 'transformOrigin', 'columnCount', 'transition'])
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _css = __webpack_require__(0);

var _css2 = _interopRequireDefault(_css);

var _vector = __webpack_require__(2);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

	// viewport offset
	vpo: function vpo(dom) {
		var rect = dom.getBoundingClientRect();
		return {
			position: new _vector2.default(rect.left, rect.top),
			opposite: new _vector2.default(rect.right, rect.bottom),
			size: new _vector2.default(rect.width, rect.height)
		};
	},
	vp: function vp() {
		return new _vector2.default(document.documentElement.clientWidth, document.documentElement.clientHeight);
	},
	viewPortOffset: function viewPortOffset(dom) {
		var params = dom.getBoundingClientRect();
		return new _vector2.default(params.left, params.top);
	},
	offset: function offset(_dom, parent) {
		var dom = _dom;
		var offset = new _vector2.default();
		var parent = parent || document.body;
		while (dom && dom.parentNode && dom != parent) {
			var position = new _vector2.default(dom.offsetLeft, dom.offsetTop);
			var scroll = new _vector2.default(dom.parentNode.scrollLeft, dom.parentNode.scrollTop);
			var margin = new _vector2.default(_css2.default.computed(dom, 'margin-left'), _css2.default.computed(dom, 'margin-top'));
			var padding = new _vector2.default(_css2.default.computed(dom, 'padding-left'), _css2.default.computed(dom, 'padding-top'));
			offset = offset.add(position).sub(scroll).sub(margin).sub(padding);
			dom = dom.parentNode;
		}
		return offset;
	},
	dimToVec: function dimToVec(dims) {
		return {
			position: new _vector2.default(dims.l, dims.t),
			size: new _vector2.default(dims.w, dims.h)
		};
	},
	vecToDim: function vecToDim(position, size) {
		var _this = this;

		return {
			l: position.x, w: size.x, r: function () {
				_this.l + _this.w;
			}(),
			t: position.y, h: size.y, b: function () {
				_this.t + _this.h;
			}()
		};
	},
	dim: function dim(dom) {
		var _this2 = this;

		return {
			l: dom.offsetLeft, w: dom.offsetWidth, r: function () {
				_this2.l + _this2.w;
			}(),
			t: dom.offsetTop, h: dom.offsetHeight, b: function () {
				_this2.t + _this2.h;
			}()
		};
	},
	domCollision: function domCollision(a, b) {
		return this.boxCollision(this.getDimensions(a), this.getDimensions(b));
	},
	boxCollision: function boxCollision(a, b) {
		return a.l < b.l + b.w && a.t < b.t + b.h && b.l < a.l + a.w && b.t < a.t + a.h;
	},
	hitTest: function hitTest(a, pointer) {
		return a.l < pointer.x && pointer.x < a.l + a.w && a.t < pointer.y && pointer.y < a.t + a.h;
	},
	viewPortSize: function viewPortSize(w, h, winW, winH, margin, minWidthVal) {
		var output = new Object();
		var aspect = w / h;
		var winHeight = winH - 2 * margin;
		var calcHeight = winW / aspect;
		var maxHeight = winHeight * aspect < minWidthVal ? minWidthVal / aspect : winHeight;
		if (winW < w && calcHeight < maxHeight) {
			output.w = winW;
			output.h = calcHeight;
			output.m = 0;
		} else {
			var origCalcWidth = maxHeight * aspect;
			var normCalcWidth = origCalcWidth < w ? origCalcWidth : w;
			var calcSide = (winW - normCalcWidth) / 2;
			output.w = normCalcWidth;
			output.h = maxHeight < h ? maxHeight : h;
			output.m = calcSide < margin ? calcSide : margin;
		}
		return output;
	}
};

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec = function () {
    function Vec() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Vec);

        this.x = x;
        this.y = y;
    }

    _createClass(Vec, [{
        key: 'copy',
        value: function copy() {
            return new Vec(this.x, this.y);
        }
    }, {
        key: 'add',
        value: function add(vec, set) {
            if (set) {
                this.x += vec.x || 0;
                this.y += vec.y || 0;
                return this;
            } else return new Vec(this.x + (vec.x || 0), this.y + (vec.y || 0));
        }
    }, {
        key: 'sub',
        value: function sub(vec, set) {
            if (set) {
                this.x -= vec.x || 0;
                this.y -= vec.y || 0;
                return this;
            } else return new Vec(this.x - (vec.x || 0), this.y - (vec.y || 0));
        }
    }, {
        key: 'div',
        value: function div(vec, apply) {
            if (apply) {
                this.x /= vec.x || 1;
                this.y /= vec.y || 1;
                return this;
            } else return new Vec(this.x / (vec.x || 1), this.y / (vec.y || 1));
        }
    }, {
        key: 'len',
        value: function len() {
            return Math.sqrt(Math.pow(this.x || 0, 2) + Math.pow(this.y || 0, 2));
        }
    }, {
        key: 'scale',
        value: function scale(len, set) {
            if (set) {
                this.x *= len;
                this.y *= len;
                return this;
            } else return new Vec(this.x * len, this.y * len);
        }
    }, {
        key: 'norm',
        value: function norm(set) {
            if (set) {
                var len = 1 / this.len();
                this.x *= len;
                this.y *= len;
                return this;
            } else {
                var len = 1 / this.len();
                return new Vec(this.x * len, this.y * len);
            }
        }
    }, {
        key: 'resize',
        value: function resize(len) {
            var norm = this.getNorm();
            return new Vec(norm.x * len, norm.y * len);
        }
    }, {
        key: 'to',
        value: function to(vec, i) {
            return new Vec(i * ((vec.x || 0) - this.x) + this.x, i * ((vec.y || 0) - this.y) + this.y);
        }
    }, {
        key: 'getAngle2D',
        value: function getAngle2D() {
            return Math.atan2(this.x, this.y) * 180 / Math.PI;
        }
    }, {
        key: 'unit',
        value: function unit(_unit) {
            return {
                x: this.x + _unit,
                y: this.y + _unit
            };
        }
    }, {
        key: 'log',
        value: function log(name) {
            var data = { x: this.x, y: this.y };
            if (typeof name === 'undefined') console.log(data);else console.log(name, data);
        }
    }, {
        key: 'set',
        value: function set(params) {
            for (var i in params) {
                this[i](params[i]);
            }
        }
    }, {
        key: 'apply',
        value: function apply(fn) {
            return new Vec(fn(this.x), fn(this.y));
        }
    }]);

    return Vec;
}();

exports.default = Vec;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _css = __webpack_require__(0);

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = {

	easing: {
		linear: function linear(t) {
			return t;
		},
		easeOutExpo: function easeOutExpo(t) {
			return 1 - Math.pow(2, -10 * t);
		},
		easeInQuad: function easeInQuad(t) {
			return Math.sin(t * (Math.PI / 2));
		},
		easeOutQuad: function easeOutQuad(t) {
			return t * (2 - t);
		},
		easeInOutQuint: function easeInOutQuint(t) {
			return t < 0.5 ? 16 * Math.pow(t, 5) : --t * 16 * Math.pow(t, 4) + 1;
		},
		easeOutElastic: function easeOutElastic(t) {
			var p = 0.8;
			return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
		},
		easeOutBounce: function easeOutBounce(t) {
			if (t < 1.0 / 2.75) {
				return 7.5625 * t * t;
			} else if (t < 2.0 / 2.75) {
				return 7.5625 * t * (t -= 1.500 / 2.75) + 0.750000;
			} else if (t < 2.5 / 2.75) {
				return 7.5625 * t * (t -= 2.250 / 2.75) + 0.937500;
			} else {
				return 7.5625 * t * (t -= 2.625 / 2.75) + 0.984375;
			}
		}
	},

	/*
 	animation.play(0.5, 'linear', t => {
 		dom.style.opacity = 1-t
 	}, () => {
 		obj.style.display = 'none'	
 	})
 */

	jobs: [],
	active: false,

	Job: function Job(time, easing, loop, end) {
		_classCallCheck(this, Job);

		this.end = end || function () {};
		var start = new Date();
		loop(.0);
		this.run = function () {
			var clock = (new Date() - start) / 1000 / time;
			loop(clock < 1. ? easing(clock) : 1.);
			return clock < 1. ? clock : 1.;
		};
	},

	loop: function loop() {
		var jobs = [];
		this.jobs.forEach(function (job) {
			if (job.run() == 1.) job.end();else jobs.push(job);
		});
		this.jobs = jobs;
		if (this.jobs.length > 0) window.requestAnimationFrame(this.loop.bind(this));else this.active = null;
	},
	play: function play(time, type, loop, end) {
		this.jobs.push(new this.Job(time, this.easing[type], loop, end));
		if (!this.active) {
			this.active = true;
			window.requestAnimationFrame(this.loop.bind(this));
		}
	},


	// Other Functions
	getSinus: function getSinus(from, to, speed) {
		var time = new Date().getTime() * 0.001;
		var sin = Math.sin(time * (speed || 1));
		return this.root.math.map(sin, -1, 1, from, to);
	},

	/*
 	a.set({
 		opacity    : 0.5,
 		translate  : new fw.vec(0, -100),
 		background : 'green'
 	}).flow(1.5, 'ease', {
 		opacity    : 0.5,
 		translate  : new fw.vec(0, 53.5),
 		background : 'red'
 	}, function () {
 		console.log('test')
 	})
 */

	flow: function flow(dom) {
		dom.flow = function (time, ease, next, end) {
			var bang = function bang() {
				dom.removeEventListener('transitionend', bang);
				dom.style[_css2.default.vendor.transition] = null;
				if (end) {
					if (typeof end === "function") end();else if (dom.set) dom.set(end);
					end = null;
				}
			};
			setTimeout(function () {
				dom.addEventListener('transitionend', bang);
				dom.style[_css2.default.vendor.transition] = time + 's ' + ease;
				if (typeof next === "function") next();else dom.set(next);
			}, 0);
		};
		return dom;
	}
};

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = {

	hsva: function () {
		function hsva(hue, saturation, value, alpha) {
			_classCallCheck(this, hsva);

			this.hue = hue;
			this.saturation = saturation;
			this.value = value;
			this.alpha = alpha;
		}

		_createClass(hsva, [{
			key: 'get',
			value: function get() {
				var trn = 100 - 50 * this.saturation;
				return 'hsla(' + 360 * this.hue + ', ' + 100 * this.saturation + '%, ' + trn * this.value + '%, ' + this.alpha + ')';
			}
		}]);

		return hsva;
	}(),

	rand: function rand(_alpha) {
		var rgb = function rgb() {
			return parseInt(Math.random() * 200 + 55);
		};
		return 'rgba(' + rgb() + ', ' + rgb() + ', ' + rgb() + ', ' + (_alpha ? _alpha : 0.3) + ')';
	}
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = __webpack_require__(0);

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    child: function child(query) {
        var _this = this;

        var parent = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

        var el = query[0] == '#' ? parent.getElementById(query.slice(1)) : query[0] == '.' ? parent.getElementsByClassName(query.slice(1)) : parent.getElementsByTagName(query);
        el.child = function (query) {
            return _this.child(query, el);
        };
        return el;
    },
    fromString: function fromString(html) {
        var parent = document.createElement('div');
        parent.innerHTML = html;
        return _css2.default.init(parent.firstChild);
    },


    // Add DOM Element at Begin of the List
    prepend: function prepend(parent, child) {
        if (parent.firstChild) parent.insertBefore(child, parent.firstChild);else parent.appendChild(child);
    },
    selection: function selection(mode) {
        document.ondragstart = document.onselectstart = mode ? null : function () {
            return false;
        };
    },
    clone: function clone(dom) {
        var _this2 = this;

        var clone = dom.cloneNode(true);
        clone.remove = function () {
            return _this2.parentNode.removeChild(_this2);
        };
        dom.parentNode.appendChild(clone);
        return clone;
    },
    div: function div(css, content) {
        var div = document.createElement('div');
        css.split(', ').forEach(function (style) {
            div.classList.add(style);
        });
        if (content) div.innerHTML = content;
        return div;
    }
};

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	to: function to(t, a, b) {
		return this.map(t, 0, 1, a, b, true);
	},
	map: function map(value, aMin, aMax, bMin, bMax, clamp) {
		var x = clamp == true ? value < aMin ? aMin : value > aMax ? aMax : value : value;
		return (x - aMin) / (aMax - aMin) * (bMax - bMin) + bMin;
	},
	binarySearch: function binarySearch(length, check) {
		var i = Math.round(.5 * length);
		var h = i;
		while (h > 1) {
			h = Math.round(.5 * h);
			i += (check(i) ? 1 : -1) * h;
		}
		check(i, true);
		return i;
	},
	linearInterpolation: function linearInterpolation(t, points) {
		// Init
		var params = [];
		var x = 0;
		// Find Sector
		for (var i = 0; i < points.length - 1; i++) {
			if (t >= points[i][0]) x = i;else break;
		} // Find Left and Right Side
		var lValue = points[x];
		var rValue = points[x + 1];
		// Interpolate Parameters
		for (var i = 1; i < lValue.length; i++) {
			params.push(this.map(t, lValue[0], rValue[0], lValue[i], rValue[i]));
		} // Return
		return params;
	},
	getValueBySize: function getValueBySize(value, list) {
		var out;
		for (var i = 0; i < list.length; i++) {
			if (value >= list[i][0]) out = list[i][1];
		}return out;
	},
	rubberEffect: function rubberEffect(value, min, max, threshold, state) {
		// https://www.desmos.com/calculator
		// Based on 1-pow(1+x,-1)
		var factor = 1.3;
		var maxTrue = typeof max !== 'undefined';
		var minTrue = typeof min !== 'undefined';
		if (maxTrue || minTrue) {
			var direction = value < max;
			var threshold = (direction ? 1 : -1) * threshold;
			var range = direction ? max : min;
			var x = (range - value) / threshold;
			var y = range - threshold * (1 - Math.pow(1 + x, -factor));
		}
		var maxState = maxTrue && value < max;
		var minState = minTrue && value > min;
		if (state) state(maxState ? 'max' : minState ? 'min' : null);
		return maxState || minState ? y : value;
	}
};

/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = {

    // splitQuery('parent.child.element')
    splitQuery: function splitQuery(query) {
        var levels = query.split('.');
        return {
            level: levels,
            last: levels.length - 1
        };
    },


    // level({id: [10, 15]}, splitQuery('id.0'), 20); -> {id: [20, 15]}
    level: function level(object, query, value) {
        var path = object;
        for (var n = 0; n < query.last; n++) {
            path = path[query.level[n]];
        }if (value) {
            path[query.level[query.last]] = value;
        } else {
            return path[query.level[query.last]];
        }
    },


    // map(workspaces, 'workspace.items.1')
    map: function map(array, query) {
        var _this = this;

        var levels = this.splitQuery(query);
        return array.map(function (list) {
            return _this.level(list, levels);
        }.bind(this));
    },


    // var bundle = find(workspaces, {id: id});
    find: function find(array, query) {
        var output = array.slice();
        for (var i in query) {
            var temp = [];
            var map = this.map(output, i);
            for (var n = 0; n < map.length; n++) {
                if (map[n] == query[i]) temp.push(output[n]);
            }output = temp.slice();
        }
        return output;
    },


    // var deleted = del(workspaces, {'title.color': color});
    del: function del(array, query) {
        var deleted = this.find(array, query);
        deleted.forEach(function (found) {
            return array.splice(array.indexOf(found), 1);
        });
        return deleted;
    },


    // updateColumn([{id: 15}, {id: 30}], {id: [20, 15]}); -> [{id: 20}, {id: 15}]
    updateColumn: function updateColumn(array, query) {
        var _this2 = this;

        for (var i in query) {
            if (array.length == query[i].length) {
                var levels = this.splitQuery(i);
                array.forEach(function (object, index) {
                    return _this2.level(object, levels, query[i][index]);
                }.bind(this));
            } else {
                console.log('different lenghtes');
            }
        }
    },


    //filterMap(workspaces, {_id, 'id', alias: 'name'});
    filterMap: function filterMap(array, keys) {
        var output = [];
        array.forEach(function (original) {
            var object = {};
            for (var key in keys) {
                object[keys[key]] = original[key];
            }output.push(object);
        });
        return output;
    },


    // var buffer = new Buffer(10) then var value = buffer.get(23.445) 
    buffer: function () {
        function buffer(size) {
            _classCallCheck(this, buffer);

            this.array = new Array();
            this.size = size;
        }

        _createClass(buffer, [{
            key: 'get',
            value: function get(value) {
                var sum = 0;
                var length = this.array.length;
                if (length > this.size) this.array.shift();
                this.array.push(value);
                for (var i = 0; i < length; i++) {
                    if (isFinite(this.array[i])) sum += parseFloat(this.array[i]);
                }return sum / length;
            }
        }]);

        return buffer;
    }()
};

/***/ },
/* 8 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	arg: function arg(_arg) {
		return typeof _arg !== 'undefined';
	},
	cloneObject: function cloneObject(_object) {
		return JSON.parse(JSON.stringify(_object));
	},
	readFile: function readFile(file, callback) {
		var _this = this;

		if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
			var reader = new FileReader();
			reader.onload = function () {
				callback({
					name: file.name,
					data: _this.result
				});
			};
			reader.readAsDataURL(file);
		}
	},
	dropFile: function dropFile(zone, onready) {
		var _this2 = this;

		zone.ondragover = function () {
			zone.classList.add('drop');return false;
		};
		zone.ondragleave = function () {
			zone.classList.remove('drop');
		};
		zone.ondrop = function () {
			zone.classList.remove('drop');
			var event = window.event;
			var files = event.dataTransfer.files;
			var output = [];
			for (var i = 0; i < files.length; i++) {
				_this2.readFile(files[i], function (file) {
					output.push(file);
					if (output.length == files.length) onready(output);
				});
			}event.preventDefault();
		}.bind(this);
	},
	uploadFile: function uploadFile(input, onready) {
		var _this3 = this;

		input.onchange = function () {
			var event = window.event;
			var files = event.target.files;
			var output = [];
			for (var i = 0; i < files.length; i++) {
				_this3.readFile(files[i], function (file) {
					output.push(file);
					if (output.length == files.length) onready(output);
				});
			}
		}.bind(this);
	},
	compressImage: function compressImage(list, scale, quality, callback) {
		var _this4 = this;

		var output = [];
		list.forEach(function (data) {
			var image = document.createElement('img');
			image.onload = function () {
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var width = _this4.width * scale;
				var height = _this4.height * scale;
				canvas.width = width;
				canvas.height = height;
				context.drawImage(_this4, 0, 0, width, height);
				output.push(canvas.toDataURL("image/jpeg", quality));
				if (output.length == list.length) callback(output);
			};
			image.src = data;
		});
	},


	/*
 	decodeBase64 (dataString) {
 		if (typeof Buffer !== undefined) {
 			var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
 			if (matches.length !== 3) return new Error('invalid input string')
 			return {
 				type : matches[1],
 				data : new Buffer(matches[2], 'base64')
 			}
 		}
 	},
 */

	cookie: {
		get: function get(cookies) {
			var object = {};
			if (cookies) {
				var params = cookies.split('; ');
				params.forEach(function (param) {
					var bundle = param.split('=');
					object[bundle[0]] = bundle[1];
				});
			}
			return object;
		},
		set: function set(cookies) {
			var string = '';
			for (var key in cookies) {
				string += key + '=' + cookies[key] + '; ';
			}return string;
		},
		del: function del(cookies, key) {
			cookies[key] = '; expires=Thu, 01 Jan 1970 00:00:01 GMT';
		}
	},

	search: {
		get: function get(address) {
			var object = {};
			var query = address.split('?')[1];
			if (query && query.length > 0) {
				var params = query.split('&');
				params.forEach(function (param) {
					var bundle = param.split('=');
					object[bundle[0]] = bundle[1];
				});
			}
			return object;
		},
		set: function set(query) {
			var string = '';
			for (var key in query) {
				string += key + '=' + query[key] + (Object.keys(query).length > 1 ? '&' : '');
			}return string;
		}
	},

	timeout: function timeout(duration, interval, check, execute, _timeout) {
		var count = duration / interval;
		var loop = setInterval(function () {
			check(function (success) {
				if (success) {
					execute();
					clearInterval(loop);
				}
			});
			if (count == 0) {
				if (_timeout) _timeout();
				clearInterval(loop);
			}
			count--;
		}, interval * 1000);
	}
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(5);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = {

	type: function () {
		if (typeof window !== 'undefined') {
			var isTouch = 'ontouchstart' in window;
			return {
				touch: isTouch,
				down: isTouch ? 'ontouchstart' : 'onmousedown',
				move: isTouch ? 'ontouchmove' : 'onmousemove',
				up: isTouch ? 'ontouchend' : 'onmouseup',
				out: 'onmouseleave'
			};
		}
	}(),

	drag: function drag(dom, down, move, up) {
		var _this = this;

		var params = new Object();
		var touchstart = function touchstart() {
			_dom2.default.selection(false);
			params.event = _this.type.touch ? window.event.targetTouches[0] : window.event;
			down(params);
			dom[_this.type.down] = null;
			document.body[_this.type.move] = touchmove.bind(_this);
			document.body[_this.type.up] = touchend.bind(_this);
			document.body[_this.type.out] = touchend.bind(_this);
		};

		var touchmove = function touchmove() {
			window.event.preventDefault();
			params.event = _this.type.touch ? window.event.targetTouches[0] : window.event;
			move(params);
		};

		var touchend = function touchend() {
			_dom2.default.selection(true);
			document.body[_this.type.move] = null;
			document.body[_this.type.up] = null;
			dom[_this.type.down] = touchstart.bind(_this);
			up(params);
		};
		dom[this.type.down] = touchstart.bind(this);
	},


	resize: function () {
		function resize(onDragStart, onDragUpdate, onDragRelease) {
			_classCallCheck(this, resize);

			this.timeout = null;
			this.onDragStartFlag = null;
			this.onDragStart = onDragStart;
			this.onDragUpdate = onDragUpdate;
			this.onDragRelease = onDragRelease;
		}

		_createClass(resize, [{
			key: 'call',
			value: function call() {
				this.checkStart();
				if (this.onDragUpdate) this.onDragUpdate();
				clearTimeout(this.timeout);
				this.timeout = setTimeout(this.onEnd.bind(this), 200);
			}
		}, {
			key: 'checkStart',
			value: function checkStart() {
				if (!this.onDragStartFlag) {
					this.onDragStartFlag = true;
					if (this.onDragStart) this.onDragStart();
				}
			}
		}, {
			key: 'onEnd',
			value: function onEnd() {
				if (this.onDragStartFlag) {
					this.onDragStartFlag = false;
					if (this.onDragRelease) this.onDragRelease();
				}
			}
		}]);

		return resize;
	}()
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _geometry = __webpack_require__(1);

var _geometry2 = _interopRequireDefault(_geometry);

var _color = __webpack_require__(4);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = {

	box: function () {
		function box() {
			_classCallCheck(this, box);

			this.l = 0;
			this.w = 0;
			this.t = 0;
			this.h = 0;
		}

		_createClass(box, [{
			key: 'r',
			value: function r() {
				return this.l + this.w;
			}
		}, {
			key: 'b',
			value: function b() {
				return this.t + this.h;
			}
		}]);

		return box;
	}(),

	get: function get(canvas, busyBoxes) {
		var freeBoxes = new Array();
		var area = canvas.w * canvas.h;
		for (var nCell = 0; nCell < area; nCell++) {
			// Head
			var head = new this.box();
			head.l = nCell % canvas.w;
			head.t = parseInt(nCell / canvas.w);
			// Check only free Positions
			if (!this.collide(busyBoxes, head)) {
				// Expansion to Right and Bottom
				var expansion = { x: true, y: true };
				// Start Expansion to Right
				while (expansion.x) {
					// Start Expansion to Bottom
					while (expansion.y) {
						// Check future Ranges
						if (this.collide(busyBoxes, this.shift(head, 'y', 1)) || head.b() == canvas.h) {
							// Stop expansion to Bottom
							expansion.y = false;
						} else {
							// Expand to Bottom
							head.h++;
						}
					}
					// Check current Range
					if (this.collide(busyBoxes, head) || head.r() > canvas.w) {
						// Stop Expansion to Right
						expansion.x = false;
						freeBoxes = this.detach(freeBoxes);
					} else {
						// Start new Expansion to Bottom
						expansion.y = true;
						freeBoxes = this.append(freeBoxes, head);
						// Reset Height and Expand to Right
						head.h = 1;
						head.w++;
					}
				}
			}
		}
		freeBoxes = this.filter(freeBoxes);
		if (0) this.test(freeBoxes);
		return freeBoxes;
	},
	append: function append(boxes, head) {
		var last = boxes.length - 1;
		var box = new this.box();
		box.l = head.l;box.t = head.t;
		box.w = head.w;box.h = head.h;
		if (boxes[last] && boxes[last].h == head.h && boxes[last].l == head.l) boxes[last] = box;else boxes.push(box);
		return boxes;
	},
	detach: function detach(boxes) {
		var prev = boxes.length - 2;
		var last = boxes.length - 1;
		if (boxes[prev] && boxes[prev].h == boxes[last].h && boxes[prev].r() == boxes[last].r()) boxes.pop();
		return boxes;
	},
	filter: function filter(boxes) {
		for (var i = 0; i < boxes.length; i++) {
			for (var n = 0; n < boxes.length; n++) {
				if (boxes[i] && boxes[n]) {
					if (boxes[n].w == 0 || boxes[n].h == 0) boxes[n] = undefined;else if (i != n) if (boxes[i].l <= boxes[n].l && boxes[i].r() >= boxes[n].r() && boxes[i].t <= boxes[n].t && boxes[i].b() >= boxes[n].b()) boxes[n] = undefined;
				}
			}
		}return boxes.filter(function (box) {
			return box;
		});
	},
	shift: function shift(head, direction, value) {
		var pointer = new this.box();
		pointer.l = head.l;
		pointer.t = head.t;
		pointer.w = head.w + (direction == 'x' ? value : 0);
		pointer.h = head.h + (direction == 'y' ? value : 0);
		return pointer;
	},
	collide: function collide(list, box) {
		for (var i = 0; i < list.length; i++) {
			if (_geometry2.default.boxCollision(list[i], box)) return true;
		}return false;
	},
	test: function test(box) {
		// Delete Old Boxes		
		var oldBoxes = document.body.getElementsByClassName('collider');
		while (oldBoxes.length > 0) {
			document.body.removeChild(oldBoxes[0]);
		} // Create New
		var shift = function shift() {
			return (Math.random() - 0.5) * gl.grid.gutter / 2;
		};
		for (var i = 0; i < box.length; i++) {
			var test = document.createElement("div");
			test.className = 'collider';
			test.style.backgroundColor = _color2.default.rand();
			test.style.position = "absolute";
			test.style.left = shift() + gl.grid.PTtoPX(box[i].l + 1, true);
			test.style.top = shift() + gl.grid.PTtoPX(box[i].t + 1, true);
			test.style.width = shift() + gl.grid.PTtoPX(box[i].w, false);
			test.style.height = shift() + gl.grid.PTtoPX(box[i].h, false);
			document.body.appendChild(test);
		}
	}
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = __webpack_require__(0);

var _css2 = _interopRequireDefault(_css);

var _math = __webpack_require__(6);

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    ellipsis: function ellipsis(dom, count) {
        var line = this.getLineHeight(dom);
        var length = dom.innerHTML.length;
        var target = line * count;
        // multi column solution
        if (_css2.default.computed(dom, 'column-count') > 1) {
            var string = dom.innerHTML;
            var block = dom.offsetHeight;
            // check if it's necessary to do a search
            if (line < block && block > target) {
                _math2.default.binarySearch(length, function (i, end) {
                    dom.innerHTML = string.substring(0, end ? i - 3 : i);
                    return dom.offsetHeight < target;
                });
                // add ellipsis
                dom.innerHTML += '&hellip;';
                // put back
            } else dom.innerHTML = string;
            // single column solution
        } else {
            var string = dom.firstChild;
            var block = dom.offsetHeight;
            if (line < block && block > target) {
                var frame = dom.getBoundingClientRect();
                var range = document.createRange();
                range.setEnd(string, length);
                _math2.default.binarySearch(length - 2, function (i, end) {
                    range.setStart(string, end ? i - 3 : i);
                    return range.getBoundingClientRect().top - frame.top < target;
                });
                // delete rest and add ellipsis
                range.deleteContents();
                dom.innerHTML += '&hellip;';
            }
        }
    },
    lineCount: function lineCount(dom) {
        return dom.offsetHeight / this.getLineHeight(dom);
    },
    getLineHeight: function getLineHeight(dom) {
        var string = dom.firstChild;
        var range = document.createRange();
        range.setStart(string, 0);
        range.setEnd(string, 1);
        return range.getBoundingClientRect().height;
    },
    capitalize: function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    hash: function hash(string) {
        var hash = 0;
        for (i = 0; i < string.length; i++) {
            hash += string.charCodeAt(i);
        }return hash;
    },
    numberPadding: function numberPadding(num, symbol, length) {
        var num = num + '';
        while (num.length < length) {
            num = symbol + num;
        }return num;
    }
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animation = __webpack_require__(3);

Object.defineProperty(exports, 'animation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_animation).default;
  }
});

var _freespace = __webpack_require__(10);

Object.defineProperty(exports, 'freespace', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_freespace).default;
  }
});

var _geometry = __webpack_require__(1);

Object.defineProperty(exports, 'geo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_geometry).default;
  }
});

var _array = __webpack_require__(7);

Object.defineProperty(exports, 'arr', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_array).default;
  }
});

var _vector = __webpack_require__(2);

Object.defineProperty(exports, 'vec', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_vector).default;
  }
});

var _math = __webpack_require__(6);

Object.defineProperty(exports, 'math', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_math).default;
  }
});

var _color = __webpack_require__(4);

Object.defineProperty(exports, 'color', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_color).default;
  }
});

var _dom = __webpack_require__(5);

Object.defineProperty(exports, 'dom', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dom).default;
  }
});

var _event = __webpack_require__(9);

Object.defineProperty(exports, 'event', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_event).default;
  }
});

var _etc = __webpack_require__(8);

Object.defineProperty(exports, 'etc', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_etc).default;
  }
});

var _css = __webpack_require__(0);

Object.defineProperty(exports, 'css', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_css).default;
  }
});

var _text = __webpack_require__(11);

Object.defineProperty(exports, 'text', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_text).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }
/******/ ])
});
;