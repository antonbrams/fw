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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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
exports.model = exports.Scroller = exports.Layer = exports.text = exports.css = exports.etc = exports.event = exports.dom = exports.color = exports.math = exports.vec = exports.arr = exports.geo = exports.val = exports.animation = exports.debug = undefined;

var _animation = __webpack_require__(3);

Object.defineProperty(exports, 'animation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_animation).default;
  }
});

var _val = __webpack_require__(14);

Object.defineProperty(exports, 'val', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_val).default;
  }
});

var _geometry = __webpack_require__(10);

Object.defineProperty(exports, 'geo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_geometry).default;
  }
});

var _array = __webpack_require__(4);

Object.defineProperty(exports, 'arr', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_array).default;
  }
});

var _vector = __webpack_require__(15);

Object.defineProperty(exports, 'vec', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_vector).default;
  }
});

var _math = __webpack_require__(11);

Object.defineProperty(exports, 'math', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_math).default;
  }
});

var _color = __webpack_require__(5);

Object.defineProperty(exports, 'color', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_color).default;
  }
});

var _dom = __webpack_require__(7);

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

var _css = __webpack_require__(6);

Object.defineProperty(exports, 'css', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_css).default;
  }
});

var _text = __webpack_require__(13);

Object.defineProperty(exports, 'text', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_text).default;
  }
});

var _Layer = __webpack_require__(1);

Object.defineProperty(exports, 'Layer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Layer).default;
  }
});

var _Scroller = __webpack_require__(2);

Object.defineProperty(exports, 'Scroller', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Scroller).default;
  }
});

var _model = __webpack_require__(12);

Object.defineProperty(exports, 'model', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_model).default;
  }
});

__webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = exports.debug = { enable: false };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fw = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = function () {
    function Layer(options) {
        _classCallCheck(this, Layer);

        // props
        this.props = {
            origin: new _fw.vec(0, 0, 0),
            translate: new _fw.vec(0, 0, 0),
            scale: new _fw.vec(1, 1, 1),
            rotate: new _fw.vec(0, 0, 0)
        };
        // if options incoming
        if (_fw.val.isObj(options)) {
            // create dom element
            if ('dom' in options) {
                // element
                if (_fw.val.isDom(options.dom)) this.dom = options.dom;
                // string
                else if (_fw.val.isStr(options.dom)) {
                        // template
                        if (options.dom.match(/<.*>.*<\/.*>/)) this.dom = _fw.dom.fromString(options.dom);
                        // create new element
                        else this.dom = _fw.dom.create(options.dom);
                    } else this.dom = _fw.dom.create('.layer');
                delete options.dom;
                // if no dom, create just div with .layer
            } else this.dom = _fw.dom.create('.layer');
            // if no parent parameter
            if (!_fw.val.exists(options.parent)) document.body.appendChild(this.dom);
            // set other values
            this.set(options);
        } else if (_fw.val.isDom(options)) this.dom = options;
        // link dom with object
        this.dom.layer = this;
    }

    // setter getters


    _createClass(Layer, [{
        key: 'set',
        value: function set(options) {
            for (var key in options) {
                var value = options[key];
                // use methods
                if (key in this) {
                    if (_fw.val.isFn(this[key])) this[key](value);else this[key] = value;
                    // set standard css parameters

                } else this.dom.style[key] = value;
            }
            return this;
        }
    }, {
        key: 'get',
        value: function get(key) {
            return _fw.css.computed(this.dom, key);
        }

        // Events

    }, {
        key: 'on',
        value: function on(type, fn, flag) {
            var _this = this;

            // tap, long tap, drag, zoom, rotate
            var type = _fw.event.types[type];
            this.dom.addEventListener(type, fn, flag);
            return {
                on: function on() {
                    return _this.dom.addEventListener(type, fn, flag);
                },
                off: function off() {
                    return _this.dom.removeEventListener(type, fn, flag);
                }
            };
        }
    }, {
        key: 'gesture',
        value: function gesture(type, options) {
            var dictionary = { drag: 'gestureDrag' };
            return _fw.event[dictionary[type]](this, options);
        }
    }, {
        key: 'pop',
        value: function pop() {
            this.props.pop = {
                parent: this.dom.parentNode,
                pos: new _fw.vec(this.dom.style.left, this.dom.style.top),
                size: new _fw.vec(this.dom.style.width, this.dom.style.height),
                offset: _fw.geo.vpo(this.dom)
            };
            this.set({
                position: 'fixed',
                pos: new _fw.vec(),
                size: new _fw.vec(this.dom.offsetWidth + .5, this.dom.offsetHeight + .5).unit('px'),
                translate: this.props.pop.offset.position.unit('px')
            });
            document.body.appendChild(this.dom);
            return this;
        }
    }, {
        key: 'push',
        value: function push() {
            this.props.pop.parent.appendChild(this.dom);
            this.set({
                position: null,
                pos: this.props.pop.pos,
                size: this.props.pop.size,
                translate: new _fw.vec(),
                scale: new _fw.vec(1, 1),
                origin: { x: 'center', y: 'center' }
            });
            delete this.props.pop;
            return this;
        }
    }, {
        key: 'animate',
        value: function animate(time, ease, next, end) {
            _fw.animation.flow(this, time, ease, next, end);
            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {
            var clone = this.dom.cloneNode(true);
            this.dom.parentNode.appendChild(clone);
            return new Layer({
                dom: clone
            });
        }
    }, {
        key: 'collision',
        value: function collision(layer) {
            var a = _fw.geo.vpo(this.dom);
            var b = _fw.geo.vpo(layer.dom);
            return _fw.geo.boxCollision(_fw.geo.vecdim(a.position, a.size), _fw.geo.vecdim(b.position, b.size));
        }

        // dom structure

    }, {
        key: 'child',
        value: function child(query) {
            var children = this.dom.querySelectorAll(query);
            var out = [];
            for (var i = 0; i < children.length; i++) {
                out.push(children[i].layer || new Layer(children[i]));
            }return out;
        }
    }, {
        key: 'append',
        value: function append(value) {
            var _this2 = this;

            var append = function append(el) {
                _this2.dom.appendChild(el instanceof Layer ? el.dom : el);
            };
            if (_fw.val.isArr(value)) value.forEach(function (item) {
                return append(item);
            });else append(item);
        }
    }, {
        key: 'prepend',
        value: function prepend(value) {
            _fw.dom.prepend(this.dom, value instanceof Layer ? value.dom : value);
        }
    }, {
        key: 'remove',
        value: function remove(value) {
            this.dom.removeChild(value instanceof Layer ? value.dom : value);
        }
    }, {
        key: 'toggleClass',


        // classes
        value: function toggleClass(value) {
            return this.dom.classList.toggle(value);
        }
    }, {
        key: 'hasClass',
        value: function hasClass(value) {
            return this.dom.classList.contains(value);
        }
    }, {
        key: 'addClass',
        value: function addClass(value) {
            var _this3 = this;

            if (_fw.val.isArr(value)) value.forEach(function (item) {
                return _this3.dom.classList.add(item);
            });else this.dom.classList.add(value);
        }
    }, {
        key: 'deleteClass',
        value: function deleteClass(value) {
            var _this4 = this;

            if (_fw.val.isArr(value)) value.forEach(function (item) {
                return _this4.dom.classList.remove(item);
            });else this.dom.classList.remove(value);
        }

        // css

    }, {
        key: 'image',
        value: function image(value) {
            this.background({ image: value });
        }
    }, {
        key: 'background',
        value: function background(value) {
            if (_fw.val.isStr(value)) this.dom.style.background = value;else if (_fw.val.isObj(value)) if ('image' in value) this.dom.style.backgroundImage = 'url(' + value.image + ')';
            if ('origin' in value) this.dom.style.backgroundOrigin = _fw.val.isObj(value.origin) ? value.origin.x + ' ' + value.origin.y : value.origin;
            if ('position' in value) this.dom.style.backgroundPosition = _fw.val.isObj(value.position) ? value.position.x + ' ' + value.position.y : value.position;
            if ('size' in value) this.dom.style.backgroundSize = _fw.val.isObj(value.size) ? value.size.x + ' ' + value.size.y : value.size;
            if ('repeat' in value) this.dom.style.backgroundRepeat = value.repeat == 'x' ? 'repeat-x' : value.repeat == 'y' ? 'repeat-y' : value.repeat == 'no' ? 'no-repeat' : value.repeat == 'yes' ? 'repeat' : value.repeat;
            if ('color' in value) this.dom.style.backgroundColor = value.color;
        }
    }, {
        key: 'text',
        value: function text(value) {
            if (_fw.val.isStr(value)) this.dom.style.font = value;else if (_fw.val.isObj(value)) {
                var props = {
                    style: 'fontStyle',
                    variant: 'fontVariant',
                    weight: 'fontWeight',
                    size: 'fontSize',
                    height: 'fontHeight',
                    family: 'fontFamily',
                    color: 'colorColor',
                    align: 'textAlign',
                    lineHeight: 'lineHeight',
                    shadow: 'textShadow'
                };
                for (var key in props) {
                    if (key in value) this.dom.style[props[key]] = value[key];
                }
            }
        }
    }, {
        key: 'border',
        value: function border(value) {
            var _this5 = this;

            if (_fw.val.isStr(value)) this.dom.style.border = value;else if (_fw.val.isObj(value)) {
                var set = function set(value, side) {
                    var props = {
                        color: 'Color',
                        radius: 'Radius',
                        width: 'Width',
                        style: 'Style'
                    };
                    for (var key in props) {
                        if (key in value) _this5.dom.style['border' + side + props[key]] = value[key];
                    }
                };
                set(value, '');
                var props = {
                    l: 'Left',
                    t: 'Top',
                    r: 'Right',
                    b: 'Bottom',
                    tl: 'TopLeft',
                    tr: 'TopRight',
                    bl: 'BottomLeft',
                    br: 'BottomRight'
                };
                for (var key in props) {
                    if (key in value) set(value[key], props[key]);
                }
            }
        }

        // transformation

    }, {
        key: 'parent',
        set: function set(value) {
            (value instanceof Layer ? value.dom : value).appendChild(this.dom);
        },
        get: function get() {
            if (this.dom.parentNode) if (this.dom.parentNode.layer instanceof Layer) return this.dom.parentNode;else return new Layer(this.dom.parentNode);
        }
    }, {
        key: 'content',
        set: function set(value) {
            this.dom.innerHTML = value;
        },
        get: function get() {
            return this.dom.innerHTML;
        }
    }, {
        key: 'move',
        set: function set(value) {
            if ('x' in value) this.dom.style.left = value.x;
            if ('y' in value) this.dom.style.top = value.y;
        },
        get: function get() {
            return new _fw.vec(this.dom.offsetLeft, this.dom.offsetTop);
        }
    }, {
        key: 'size',
        set: function set(value) {
            if ('x' in value) this.dom.style.width = value.x;
            if ('y' in value) this.dom.style.height = value.y;
        },
        get: function get() {
            return new _fw.vec(this.dom.offsetWidth, this.dom.offsetHeight);
        }
    }, {
        key: 'padding',
        set: function set(value) {
            if (_fw.val.isStr(value)) this.dom.style.padding = value;else if (_fw.val.isObj(value)) {
                if ('x' in value && 'y' in value) this.dom.style.padding = value.y + ' ' + value.x;else if ('x' in value) this.dom.style.padding = '0 ' + value.x;
                if ('y' in value) this.dom.style.padding = value.y + ' 0';
                if ('l' in value) this.dom.style.paddingLeft = value.l;
                if ('t' in value) this.dom.style.paddingTop = value.t;
                if ('r' in value) this.dom.style.paddingRight = value.r;
                if ('b' in value) this.dom.style.paddingBottom = value.b;
            }
        },
        get: function get() {
            return {
                l: _fw.css.computed(this.dom, 'padding-left'),
                t: _fw.css.computed(this.dom, 'padding-top'),
                r: _fw.css.computed(this.dom, 'padding-right'),
                b: _fw.css.computed(this.dom, 'padding-bottom')
            };
        }
    }, {
        key: 'margin',
        set: function set(value) {
            if (_fw.val.isStr(value)) this.dom.style.margin = value;else if (_fw.val.isObj(value)) {
                if ('x' in value && 'y' in value) this.dom.style.margin = value.y + ' ' + value.x;else if ('x' in value) this.dom.style.margin = '0 ' + value.x;
                if ('y' in value) this.dom.style.margin = value.y + ' 0';
                if ('l' in value) this.dom.style.marginLeft = value.l;
                if ('t' in value) this.dom.style.marginTop = value.t;
                if ('r' in value) this.dom.style.marginRight = value.r;
                if ('b' in value) this.dom.style.marginBottom = value.b;
            }
        },
        get: function get() {
            return {
                l: _fw.css.computed(this.dom, 'margin-left'),
                t: _fw.css.computed(this.dom, 'margin-top'),
                r: _fw.css.computed(this.dom, 'margin-right'),
                b: _fw.css.computed(this.dom, 'margin-bottom')
            };
        }
    }, {
        key: 'origin',
        set: function set(value) {
            var _this6 = this;

            ['x', 'y', 'z'].forEach(function (axis) {
                if (axis in value) _this6.props.origin[axis] = value[axis];
            });
            _fw.css.applyTransformation(this.dom, this.props, 'origin');
        },
        get: function get() {
            return this.props.origin;
        }
    }, {
        key: 'translate',
        set: function set(value) {
            var _this7 = this;

            ['x', 'y', 'z'].forEach(function (axis) {
                if (axis in value) _this7.props.translate[axis] = value[axis];
            });
            _fw.css.applyTransformation(this.dom, this.props);
        },
        get: function get() {
            return this.props.translate;
        }
    }, {
        key: 'scale',
        set: function set(value) {
            var _this8 = this;

            if (_fw.val.isNum(value)) {
                this.props.scale.x = this.props.scale.y = this.props.scale.z = value;
            } else ['x', 'y', 'z'].forEach(function (axis) {
                if (axis in value) _this8.props.scale[axis] = value[axis];
            });
            _fw.css.applyTransformation(this.dom, this.props);
        },
        get: function get() {
            return this.props.scale;
        }
    }, {
        key: 'rotate',
        set: function set(value) {
            var _this9 = this;

            if (_fw.val.isNum(value)) this.props.rotate.z = value;else ['x', 'y', 'z'].forEach(function (axis) {
                if (axis in value) _this9.props.rotate[axis] = value[axis];
            });
            _fw.css.applyTransformation(this.dom, this.props);
        },
        get: function get() {
            return this.props.rotate;
        }

        // center

    }, {
        key: 'center',
        set: function set(value) {
            this.move = value.sub(this.size.scale(.5));
        },
        get: function get() {
            return _fw.geo.center(_fw.geo.vpo(this.dom));
        }

        // offset

    }, {
        key: 'rect',
        get: function get() {
            return _fw.geo.vpo(this.dom);
        }
    }]);

    return Layer;
}();

exports.default = Layer;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fw = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scroller = function (_Layer) {
    _inherits(Scroller, _Layer);

    function Scroller(options) {
        _classCallCheck(this, Scroller);

        // this.dom[this.dom.tagName === 'A'? 'href': 'src'] = value
        options.dom = 'div .scroller .layer';
        return _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).call(this, options));
    }

    _createClass(Scroller, [{
        key: 'flow',
        value: function flow(value) {
            this.dom.classList.add(value || 'y');
        }
    }]);

    return Scroller;
}(_fw.Layer);

exports.default = Scroller;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fw = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = {

	/*
 	dom.set({
 		opacity    : 0.5,
 		translate  : new fw.vec(0, -100),
 		background : 'green'
 	}).flow(1.5, 'ease', {
 		opacity    : 0.5,
 		translate  : new fw.vec(0, 53.5),
 		background : 'red'
 	}, function () {
 		console.log('done')
 	})
 */

	flow: function flow(object, time, ease, next, end) {
		// will be deprecated
		var element = object instanceof _fw.Layer ? object.dom : object;
		var bang = function bang() {
			element.removeEventListener('transitionend', bang);
			element.style[_fw.css.vendor.transition] = null;
			if (end) {
				if (typeof end === 'function') end();else if (element.set) object.set(end);
				end = null;
			}
		};
		element.addEventListener('transitionend', bang);
		element.style[_fw.css.vendor.transition] = time + 's ' + ease;
		setTimeout(function () {
			if (typeof next === 'function') next();else object.set(next);
		}, 0);
	},


	// Other Functions
	getSinus: function getSinus(from, to, speed) {
		var time = new Date().getTime() * 0.001;
		var sin = Math.sin(time * (speed || 1));
		return this.root.math.map(sin, -1, 1, from, to);
	},

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
 		element.style.opacity = 1-t
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fw = __webpack_require__(0);

exports.default = {
    applyTransformation: function applyTransformation(element, data, type) {
        // create data
        if (type == 'origin') {
            element.style[this.vendor.transformOrigin] = data.origin.x + ' \n                 ' + data.origin.y;
            element.style[this.vendor.perspectiveOrigin] = '' + data.origin.z;
        } else element.style[this.vendor.transform] = 'translate3d(\n                    ' + data.translate.x + ',\n                    ' + data.translate.y + ',\n                    ' + data.translate.z + ') \n                rotateX(' + data.rotate.x + 'deg)\n                rotateY(' + data.rotate.y + 'deg)\n                rotateZ(' + data.rotate.z + 'deg) \n                scale3d(\n                    ' + data.scale.x + ', \n                    ' + data.scale.y + ', \n                    ' + data.scale.z + ')';
    },
    computed: function computed(element, prop) {
        return parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue(prop));
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
    }(['transform', 'transformOrigin', 'perspectiveOrigin', 'columnCount', 'transition'])

};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _fw = __webpack_require__(0);

exports.default = {

   // create ('div#id .class .class')
   create: function create(query) {
      var params = query.split(' ');
      if (params[0].match(/./)) params.unshift('div');
      var typeid = params[0].split('#');
      // create from tag
      var element = document.createElement(typeid[0]);
      // set id
      if (typeid[1]) element.id = typeid[1];
      // set css class
      params.slice(1).forEach(function (style) {
         element.classList.add(style.slice(1));
      });
      return element;
   },
   fromString: function fromString(html) {
      var parent = document.createElement('div');
      parent.innerHTML = html;
      return parent.firstChild;
   },
   prepend: function prepend(parent, child) {
      if (parent.firstChild) parent.insertBefore(child, parent.firstChild);else parent.appendChild(child);
   },
   clone: function clone(dom) {
      var _this = this;

      var clone = dom.cloneNode(true);
      clone.remove = function () {
         return _this.parentNode.removeChild(_this);
      };
      dom.parentNode.appendChild(clone);
      return clone;
   },
   selection: function selection(mode) {
      document.ondragstart = document.onselectstart = mode ? null : function () {
         return false;
      };
   }
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fw = __webpack_require__(0);

exports.default = {
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
	compressImage: function compressImage(list, scale, onload, quality) {
		var compressor = function compressor(url, render) {
			var image = document.createElement('img');
			image.onload = function () {
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var width = this.width * scale;
				var height = this.height * scale;
				canvas.width = width;
				canvas.height = height;
				context.drawImage(this, 0, 0, width, height);
				render(canvas.toDataURL('image/jpeg', quality || 1));
			};
			image.src = url;
		};
		if (_fw.val.isArr(list)) list.forEach(function (url, i) {
			compressor(url, function (scaled) {
				list[i] = scaled;
				if (i == list.length - 1) onload(urls);
			});
		});else compressor(list, onload);
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
				_timeout && _timeout();
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

var _fw = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var topics = {};

exports.default = {

    // event engine
    on: function on(topic, bang, id) {
        if (!topics[topic]) topics[topic] = [];
        topics[topic].push(bang);
    },
    emit: function emit(topic, transport) {
        if (_fw.debug.enable) console.log('[event] fired:', topic);
        if (topics[topic]) topics[topic].forEach(function (bang) {
            return bang(transport);
        });
    },


    // on resize debouncer
    windowResize: function () {
        function windowResize(onDragStart, onDragUpdate, onDragRelease) {
            _classCallCheck(this, windowResize);

            this.timeout = null;
            this.onDragStartFlag = null;
            this.onDragStart = onDragStart;
            this.onDragUpdate = onDragUpdate;
            this.onDragRelease = onDragRelease;
        }

        _createClass(windowResize, [{
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

        return windowResize;
    }(),

    // event types
    types: function () {
        if (_fw.val.exists(window)) {
            var isTouch = 'ontouchstart' in window;
            return {
                isTouch: isTouch,
                tap: 'click',
                down: isTouch ? 'touchstart' : 'mousedown',
                move: isTouch ? 'touchmove' : 'mousemove',
                up: isTouch ? 'touchend' : 'mouseup',
                enter: isTouch ? null : 'mouseenter',
                out: isTouch ? null : 'mouseleave',
                cancel: isTouch ? 'touchcancel' : null,
                scroll: 'scroll',
                change: 'change'
            };
        }
    }(),

    gestureDrag: function gestureDrag(layer) {
        var _this = this;

        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var t = {};
        var down = function down(e) {
            document.addEventListener(_this.types.move, move, true);
            document.addEventListener(_this.types.up, up, true);
            t.down = new _fw.vec(e.clientX, e.clientY);
            t.event = e;
            options.down && options.down(t);
            e.preventDefault();
            e.stopPropagation();
        };
        var move = function move(e) {
            t.move = new _fw.vec(e.clientX, e.clientY);
            if (!t.recognized && t.move.sub(t.down).len() > 10) {
                t.recognized = true;
                t.down = t.move.copy();
            }
            if (t.recognized) {
                t.event = e;
                t.dist = t.move.sub(t.down);
                options.move && options.move(t);
                layer.translate = t.dist.unit('px');
            }
            e.preventDefault();
            e.stopPropagation();
        };
        var up = function up(e) {
            document.removeEventListener(_this.types.move, move, true);
            document.removeEventListener(_this.types.up, up, true);
            if (t.recognized) {
                t.event = e;
                options.up && options.up(t);
                layer.set({
                    translate: new _fw.vec(),
                    move: layer.move.add(t.dist).unit('px')
                });
            }
            t = {};
            e.preventDefault();
            e.stopPropagation();
        };
        layer.dom.addEventListener(this.types.down, down, true);
        var out = {
            on: function on() {
                layer.dom.addEventListener(_this.types.down, down, true);
                return out;
            },
            off: function off() {
                options.cancel && options.cancel();
                layer.dom.removeEventListener(_this.types.down, down, true);
                document.removeEventListener(_this.types.move, move, true);
                document.removeEventListener(_this.types.up, up, true);
                return out;
            }
        };
        return out;
    }
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fw = __webpack_require__(0);

exports.default = {

	// viewport offset
	vpo: function vpo(dom) {
		var rect = dom.getBoundingClientRect();
		return {
			position: new _fw.vec(rect.left, rect.top),
			opposite: new _fw.vec(rect.right, rect.bottom),
			size: new _fw.vec(rect.width, rect.height)
		};
	},
	vp: function vp() {
		return new _fw.vec(document.documentElement.clientWidth, document.documentElement.clientHeight);
	},
	center: function center(params) {
		// for regular vector system
		if (_fw.val.isVec(params)) return params.position.add(params.size.scale(.5));
		// for dimension system
		else if (_fw.val.isDim(params)) {
				var rect = this.dimvec(params);
				return rect.position.add(rect.size.scale(.5));
			}
	},
	dimvec: function dimvec(dims) {
		var size = dims.w ? new _fw.vec(dims.w, dims.h) : dims.r ? new _fw.vec(dims.r - dims.l, dims.b - dims.t) : null;
		return { size: size, position: new _fw.vec(dims.l, dims.t) };
	},
	vecdim: function vecdim(position, size) {
		var box = {
			l: position.x, w: size.x,
			t: position.y, h: size.y
		};
		box.r = box.l + box.w;
		box.b = box.t + box.h;
		return box;
	},
	boxCollision: function boxCollision(a, b) {
		return a.l < b.l + b.w && a.t < b.t + b.h && b.l < a.l + a.w && b.t < a.t + a.h;
	},
	hitTest: function hitTest(a, pointer) {
		return a.l < pointer.x && pointer.x < a.l + a.w && a.t < pointer.y && pointer.y < a.t + a.h;
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

var _fw = __webpack_require__(0);

exports.default = {
	to: function to(t, a, b) {
		return this.map(t, 0, 1, a, b, true);
	},
	map: function map(value, aMin, aMax, bMin, bMax, clamp) {
		var x = clamp == true ? value < aMin ? aMin : value > aMax ? aMax : value : value;
		return (x - aMin) / (aMax - aMin) * (bMax - bMin) + bMin;
	},
	min: function min(x, lim) {
		return x > lim ? x : lim;
	},
	max: function max(x, lim) {
		return x < lim ? x : lim;
	},
	range: function range(min, val, max) {
		return this.max(this.min(val, min), max);
	},
	randInt: function randInt(min, max) {
		return Math.floor(this.to(Math.random(), min, max));
	},
	binarySearch: function binarySearch(length, check) {
		var i = Math.floor(.5 * length); // result
		var h = i; // pointer
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
		var maxTrue = _fw.val.exists(max);
		var minTrue = _fw.val.exists(min);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fw = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assets = {
    signs: ['', ',', '.', '?', '!'],
    words: 'accusam aliquyam amet at clita consetetur diam dolor dolore dolores duo ea eirmod elitr eos erat est et gubergren invidunt ipsum justo kasd labore lorem magna no nonumy rebum sad sanctus sea sed sit stet takimata tempor ut vero voluptua'.split(' '),
    image: {
        mac: ['Abstract', 'Antelope Canyon', 'Bahamas Aerial', 'Beach', 'Blue Pond', 'Bristle Grass', 'Brushes', 'Circles', 'Death Valley', 'Desert', 'Ducks on a Misty Pond', 'Eagle & Waterfall', 'Earth and Moon', 'Earth Horizon', 'El Capitan 2', 'El Capitan', 'Elephant', 'Flamingos', 'Floating Ice', 'Floating Leaves', 'Foggy Forest', 'Forest in Mist', 'Foxtail Barley', 'Frog', 'Galaxy', 'Grass Blades', 'Hawaiian Print', 'Isles', 'Lake', 'Lion', 'Milky Way', 'Moon', 'Mountain Range', 'Mt. Fuji', 'Pink Forest', 'Pink Lotus Flower', 'Poppies', 'Red Bells', 'Rice Paddy', 'Rolling Waves', 'Shapes', 'Sierra 2', 'Sierra', 'Sky', 'Snow', 'Underwater', 'Wave', 'Yosemite 2', 'Yosemite 3', 'Yosemite 4', 'Yosemite 5', 'Yosemite', 'Zebras']
    }
};

var Expression = function Expression(options) {
    _classCallCheck(this, Expression);

    if (_fw.val.isFn(options)) this.render = options;else if (_fw.val.isObj(options)) for (var key in options) {
        this[key] = options[key];
    }
};

exports.default = {

    // int ({type: 'all', from: 1})
    // int ({type: 'count', from: 1})
    // int ({type: 'random', min: 1, max: 10})
    int: function int(opt) {
        return new Expression({ i: 0, method: 'int', type: opt.type, render: function render() {
                return opt.type == 'forward' || opt.type == 'loop' ? opt.from + this.i++ : opt.type == 'random' ? Math.floor(_fw.math.to(Math.random(), opt.min, opt.max)) : this.i;
            }
        });
    },


    // str ({type: 'text', count: 20})
    // str ({type: 'text', min: 20, max 100})
    str: function str(opt) {
        return new Expression(function () {
            var count = opt.count ? opt.count : Math.floor(_fw.math.to(Math.random(), opt.min, opt.max));
            var capitalize = true;
            var sentence = '';
            for (var i = 0; i < count; i++) {
                var randomWord = assets.words[Math.floor(Math.random() * assets.words.length)];
                var signIndex = Math.floor(Math.pow(Math.random(), 20) * assets.signs.length);
                var sign = assets.signs[_fw.math.min(signIndex, i < count - 1 ? 0 : 2)] + ' ';
                var word = capitalize ? _fw.text.capitalize(randomWord) : randomWord;
                sentence += word + sign;
                capitalize = signIndex > 1;
            }
            return sentence.substring(0, sentence.length - 1);
        });
    },
    img: function img(opt) {
        var source = {
            remote: function remote(i) {
                return 'https://unsplash.it/500?image=' + i;
            },
            local: function local(i) {
                return 'file:///Library/Desktop%20Pictures/' + escape(assets.image.mac[i % assets.image.mac.length]) + '.jpg';
            }
        };
        return new Expression(function () {
            return source[opt.source](_fw.math.randInt(0, 1000));
        });
    },


    // get(i => {return custom[i]})
    merge: function merge(callback) {
        return new Expression({ i: 0, render: function render() {
                return callback(this.i++);
            }
        });
    },
    put: function put(opt) {
        var _this = this;

        var cycle = _fw.val.isArr(opt.count);
        return new Expression(function () {
            var length = cycle ? opt.count[0] : opt.count || 1;
            var get = null;
            var items = [];
            // modify values
            for (var key in opt.item) {
                // reset integer with count type
                if (opt.item[key].method == 'int' && opt.item[key].type == 'loop') opt.item[key].i = 0;
            } // render content
            for (var i = 0; i < length; i++) {
                items.push(_this.render(opt.item));
            }if (cycle) opt.count.shift();
            return items;
        });
    },
    render: function render(object) {
        var out = {};
        for (var i in object) {
            if (object[i] instanceof Expression) out[i] = object[i].render();else out[i] = object[i];
        }return out;
    }
};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fw = __webpack_require__(0);

exports.default = {
    ellipsis: function ellipsis(dom, lineCount, symbol) {
        // set target height
        dom.style.height = this.getLineHeight(dom) * lineCount + 'px';
        var domRect = dom.getBoundingClientRect();
        var multiColumn = _fw.css.computed(dom, 'column-count') > 1;
        // check if iteration is necessary
        if (multiColumn && dom.scrollWidth > domRect.width + 1 || dom.scrollHeight > domRect.height + 1) {
            // init range selection
            var string = dom.firstChild;
            var length = dom.innerHTML.length;
            var range = document.createRange();
            range.setEnd(string, length);
            // search for position
            _fw.math.binarySearch(length, function (i, end) {
                // make selection
                range.setStart(string, end ? i - 3 : i);
                // return check
                var cursorRect = range.getBoundingClientRect();
                return multiColumn ? cursorRect.left < domRect.right : cursorRect.top < domRect.bottom - 1;
            });
            // delete rest and add ellipsis
            range.deleteContents();
            dom.innerHTML += symbol || '&hellip;';
        }
        // restore height
        dom.style.height = null;
    },
    lineCount: function lineCount(dom) {
        return Math.floor(dom.offsetHeight / this.getLineHeight(dom));
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
/* 14 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
    exists: function exists(val) {
        return typeof val !== 'undefined';
    },
    isBool: function isBool(val) {
        return typeof val === "boolean";
    },
    isNum: function isNum(val) {
        return typeof val === 'number';
    },
    isStr: function isStr(val) {
        return typeof val === 'string' || val instanceof String;
    },
    isArr: function isArr(val) {
        return Array.isArray(val);
    },
    isDom: function isDom(val) {
        return val instanceof Element;
    },
    isObj: function isObj(val) {
        return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) == 'object' && val.constructor == Object;
    },
    isFn: function isFn(val) {
        return typeof val === 'function';
    },
    isVec: function isVec(val) {
        return val.position || val.opposite;
    },
    isDim: function isDim(val) {
        return val.l || val.r;
    }
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fw = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec = function () {
    function Vec() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        _classCallCheck(this, Vec);

        this.x = x;
        this.y = y;
        this.z = z;
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
                this.z += vec.z || 0;
                return this;
            } else return new Vec(this.x + (vec.x || 0), this.y + (vec.y || 0), this.z + (vec.z || 0));
        }
    }, {
        key: 'sub',
        value: function sub(vec, set) {
            if (set) {
                this.x -= vec.x || 0;
                this.y -= vec.y || 0;
                this.z -= vec.z || 0;
                return this;
            } else return new Vec(this.x - (vec.x || 0), this.y - (vec.y || 0), this.z - (vec.z || 0));
        }
    }, {
        key: 'div',
        value: function div(vec, apply) {
            if (apply) {
                this.x /= vec.x || 1;
                this.y /= vec.y || 1;
                this.z /= vec.z || 1;
                return this;
            } else return new Vec(this.x / (vec.x || 1), this.y / (vec.y || 1), this.z / (vec.z || 1));
        }
    }, {
        key: 'len',
        value: function len() {
            return Math.sqrt(Math.pow(this.x || 0, 2) + Math.pow(this.y || 0, 2) + Math.pow(this.z || 0, 2));
        }
    }, {
        key: 'scale',
        value: function scale(len, set) {
            if (set) {
                this.x *= len;
                this.y *= len;
                this.z *= len;
                return this;
            } else return new Vec(this.x * len, this.y * len, this.z * len);
        }
    }, {
        key: 'norm',
        value: function norm(set) {
            if (set) {
                var len = 1 / this.len();
                this.x *= len;
                this.y *= len;
                this.z *= len;
                return this;
            } else {
                var len = 1 / this.len();
                return new Vec(this.x * len, this.y * len, this.z * len);
            }
        }
    }, {
        key: 'resize',
        value: function resize(len) {
            var norm = this.getNorm();
            return new Vec(norm.x * len, norm.y * len, norm.z * len);
        }
    }, {
        key: 'to',
        value: function to(vec, i) {
            return new Vec(i * ((vec.x || 0) - this.x) + this.x, i * ((vec.y || 0) - this.y) + this.y, i * ((vec.z || 0) - this.z) + this.z);
        }
    }, {
        key: 'rotate',
        value: function rotate(angle, set) {
            var rad = Math.PI / 180 * angle;
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);
            var x = cos * this.x + sin * this.y;
            var y = cos * this.y - sin * this.x;
            if (set) {
                this.x = x;
                this.y = y;
                return this;
            } else {
                return new Vec(x, y);
            }
        }
    }, {
        key: 'angle2d',
        value: function angle2d() {
            return Math.atan2(this.x, this.y) * 180 / Math.PI;
        }
    }, {
        key: 'unit',
        value: function unit(_unit) {
            var data = {};
            if (_fw.val.exists(this.x)) data.x = this.x + _unit;
            if (_fw.val.exists(this.y)) data.y = this.y + _unit;
            if (_fw.val.exists(this.z)) data.z = this.z + _unit;
            return data;
        }
    }, {
        key: 'log',
        value: function log(name) {
            var data = { x: this.x };
            if (_fw.val.exists(this.y)) data.y = this.y;
            if (_fw.val.exists(this.z)) data.z = this.z;
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(19)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js?sourceMap!./style.sass", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js?sourceMap!./style.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n  box-sizing: border-box; }\n\nbody {\n  background-color: #1f2428; }\n\n.layer {\n  display: inline-block;\n  width: 100;\n  height: 100;\n  background-color: rgba(255, 255, 255, 0.1);\n  background-size: cover; }\n\n.scroller {\n  width: 100%;\n  height: 100%;\n  -webkit-scroll-snap-type: mandatory;\n  -webkit-scroll-snap-destination: 50% 50%; }\n  .scroller > .layer {\n    width: 100%;\n    height: 100%;\n    -webkit-scroll-snap-coordinate: 50% 50%; }\n  .scroller.x {\n    overflow-y: hidden;\n    white-space: nowrap; }\n    .scroller.x > .layer {\n      display: inline-block;\n      white-space: normal; }\n  .scroller.y {\n    overflow-x: hidden; }\n", ""]);

// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 19 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }
/******/ ])
});
;