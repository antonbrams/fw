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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
exports.gesture = exports.model = exports.Scroller = exports.Screen = exports.Layer = exports.css = exports.text = exports.etc = exports.event = exports.dom = exports.color = exports.math = exports.matrix = exports.vec = exports.arr = exports.geo = exports.val = exports.animation = undefined;

var _animation = __webpack_require__(4);

Object.defineProperty(exports, 'animation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_animation).default;
  }
});

var _value = __webpack_require__(17);

Object.defineProperty(exports, 'val', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_value).default;
  }
});

var _geometry = __webpack_require__(11);

Object.defineProperty(exports, 'geo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_geometry).default;
  }
});

var _array = __webpack_require__(5);

Object.defineProperty(exports, 'arr', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_array).default;
  }
});

var _vector = __webpack_require__(18);

Object.defineProperty(exports, 'vec', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_vector).default;
  }
});

var _matrix = __webpack_require__(14);

Object.defineProperty(exports, 'matrix', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_matrix).default;
  }
});

var _math = __webpack_require__(13);

Object.defineProperty(exports, 'math', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_math).default;
  }
});

var _color = __webpack_require__(6);

Object.defineProperty(exports, 'color', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_color).default;
  }
});

var _dom = __webpack_require__(8);

Object.defineProperty(exports, 'dom', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dom).default;
  }
});

var _event = __webpack_require__(10);

Object.defineProperty(exports, 'event', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_event).default;
  }
});

var _etc = __webpack_require__(9);

Object.defineProperty(exports, 'etc', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_etc).default;
  }
});

var _text = __webpack_require__(16);

Object.defineProperty(exports, 'text', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_text).default;
  }
});

var _css = __webpack_require__(7);

Object.defineProperty(exports, 'css', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_css).default;
  }
});

var _Layer = __webpack_require__(1);

Object.defineProperty(exports, 'Layer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Layer).default;
  }
});

var _Screen = __webpack_require__(2);

Object.defineProperty(exports, 'Screen', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Screen).default;
  }
});

var _Scroller = __webpack_require__(3);

Object.defineProperty(exports, 'Scroller', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Scroller).default;
  }
});

var _model = __webpack_require__(15);

Object.defineProperty(exports, 'model', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_model).default;
  }
});

var _gesture = __webpack_require__(12);

Object.defineProperty(exports, 'gesture', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_gesture).default;
  }
});

__webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = function () {
    function Layer(options) {
        _classCallCheck(this, Layer);

        this.identifier = new Date().getTime();
        this.event = _index.event.Machine('Layer');
        this.data = null;
        this._dom = null;
        this._props = {
            transformation: {
                origin: new _index.vec(),
                translate: new _index.vec(),
                scale: new _index.vec().fill(1),
                rotate: 0,
                matrix3d: new _index.matrix()
            },
            pop: {},
            templateUpdater: null,
            transformationTouchEventLink: null
        };
        // if no options at all
        if (!_index.val.exists(options)) {
            this.dom = _index.dom.create('.default');
            this.parent = _index.Screen;
            // if options are an tulpet
        } else if (_index.val.isObj(options)) {
            // apply dom element
            if ('dom' in options) {
                this.dom = options.dom;
                delete options.dom;
                // if no dom, create just div with .layer
            } else this.dom = _index.dom.create('.default');
            // parent
            if ('parent' in options) {
                if (options.parent === null) delete options.parent;
            } else this.parent = _index.Screen;
            // set other options
            this.set(options);
            // if options is a single parameter
        } else if (_index.val.isDom(options) || _index.val.isStr(options)) {
            this.dom = options;
            // add if not added
            if (_index.val.isDom(options) && !options.parentNode) this.parent = _index.Screen;
        }
    }

    // external event interface


    _createClass(Layer, [{
        key: 'on',
        value: function on(topic, fn, options) {
            // gestures
            if (topic in _index.gesture) return _index.gesture[topic](this, fn).on();
            // dom events
            else if (_index.event.support(this.dom, topic)) return _index.event.listener(this.dom, topic, fn, options).on();
                // custom events
                else if (topic in _index.event) return _index.event[topic](this, fn).on();
                    // dom css
                    else return this.event.on(topic, fn);
        }

        // setter getters

    }, {
        key: 'set',
        value: function set(options) {
            for (var key in options) {
                var value = options[key];
                // use methods
                if (key in this) {
                    if (_index.val.isFn(this[key])) this[key](value);else this[key] = value;
                    // set attributes
                } else if (key in this.dom) this._setAttribute(key, value);
                // set css parameters
                else if (key in this.dom.style) this._setCss(key, value);
            }
            return this;
        }
    }, {
        key: '_setAttribute',
        value: function _setAttribute(option, value) {
            var _this = this;

            var set = function set(key, value) {
                _this.event.emit(key, value);
                if (_index.val.exists(value)) _this.dom.setAttribute(key, value);else _this.dom.removeAttribute(key);
            };
            if (_index.val.isStr(option)) set(option, value);else if (_index.val.isObj(option)) for (var key in option) {
                set(key, option[key]);
            }
        }
    }, {
        key: '_setCss',
        value: function _setCss(options, value) {
            var _this2 = this;

            var set = function set(key, value) {
                _this2.event.emit(key, value);
                _this2.dom.style[key] = value;
            };
            if (_index.val.isStr(options)) set(options, value);else if (_index.val.isObj(options)) for (var key in options) {
                set(key, options[key]);
            }
        }
    }, {
        key: '_getCss',
        value: function _getCss(key) {
            return _index.css.computed(this.dom, key);
        }
    }, {
        key: 'bind',


        /*
            model.forEach(function (item) {
                var layerA = new fw.Layer({
                    margin : 10
                }).bind(item, {
                    image : {
                        to   : 'title',
                        from : 'backgroundImage',
                        set (value, layer) {
                            layer.set({content: 'test ' + value})
                        },
                        get (value, layer) {
                            return value
                        }
                    }
                })
            })
        */

        value: function bind(model, params) {
            var _this3 = this;

            for (var key in params) {
                var options = params[key];
                var modelKey = options.to || options;
                var initValue = model[modelKey];
                var curValue = null;
                this.on(options.from || key, function (value) {
                    return curValue = value;
                });
                Object.defineProperty(model, modelKey, {
                    set: function (options, key) {
                        return function (value) {
                            if (options.set) options.set(value, _this3);else {
                                var param = {};
                                param[key] = value;
                                _this3.set(param);
                            }
                        };
                    }(options, key),
                    get: function (options) {
                        return function () {
                            if (options.get) return options.get(_this3);else return curValue;
                        };
                    }(options)
                });
                model[modelKey] = initValue;
            }
            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.dom.parentNode.removeChild(this.dom);
            delete this;
        }
    }, {
        key: 'pop',
        value: function pop() {
            this.event.emit('pop', this._props.pop);
            this._props.pop = {
                parent: this.dom.parentNode,
                pos: new _index.vec(this.dom.style.left, this.dom.style.top),
                size: new _index.vec(this.dom.style.width, this.dom.style.height),
                offset: _index.geo.vpo(this.dom)
            };
            this.set({
                position: 'fixed',
                pos: new _index.vec(),
                size: new _index.vec(this.dom.offsetWidth + .5, this.dom.offsetHeight + .5).unit('px'),
                translate: this._props.pop.offset.position.unit('px')
            });
            document.body.appendChild(this.dom);
            return this;
        }
    }, {
        key: 'push',
        value: function push() {
            this.event.emit('push', this._props.pop);
            this._props.pop.parent.appendChild(this.dom);
            this.set({
                position: null,
                pos: this._props.pop.pos,
                size: this._props.pop.size,
                translate: new _index.vec(),
                scale: new _index.vec(1, 1, 1),
                origin: { x: 'center', y: 'center' }
            });
            this._props.pop = null;
            return this;
        }
    }, {
        key: 'animate',
        value: function animate(options, next, end) {
            this.event.emit('animate', options);
            _index.animation.flow(this, options.time || .5, options.ease || 'ease-in-out', options.delay || 0, next, end);
            return this;
        }
    }, {
        key: 'clone',
        value: function clone(options) {
            var clone = this.dom.cloneNode(true);
            this.dom.parentNode.appendChild(clone);
            return new Layer({
                dom: clone
            }).set(options);
        }
    }, {
        key: 'collision',
        value: function collision(layer) {
            var a = _index.geo.vpo(this.dom);
            var b = _index.geo.vpo(layer.dom);
            return _index.geo.boxCollision(_index.geo.vecdim(a.position, a.size), _index.geo.vecdim(b.position, b.size));
        }

        // dom structure

    }, {
        key: 'child',
        value: function child(query) {
            var children = this.dom.querySelector(query);
            return children.layer || new Layer(children);
        }
    }, {
        key: 'childs',
        value: function childs(query) {
            var children = this.dom.querySelectorAll(query);
            var out = [];
            for (var i = 0; i < children.length; i++) {
                out.push(children[i].layer || new Layer(children[i]));
            }return out;
        }
    }, {
        key: 'append',
        value: function append(value) {
            var _this4 = this;

            this.event.emit('append', value);
            var append = function append(el) {
                _this4.dom.appendChild(el instanceof Layer ? el.dom : el);
            };
            if (_index.val.isArr(value)) value.forEach(function (item) {
                return append(item);
            });else append(value);
        }
    }, {
        key: 'prepend',
        value: function prepend(value) {
            this.event.emit('prepend', value);
            _index.dom.prepend(this.dom, value instanceof Layer ? value.dom : value);
        }
    }, {
        key: 'detach',
        value: function detach(value) {
            this.event.emit('detach', value);
            this.dom.removeChild(value instanceof Layer ? value.dom : value);
        }
    }, {
        key: 'toggleClass',


        // classes
        value: function toggleClass(value) {
            this.event.emit('toggleClass', value);
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
            var _this5 = this;

            this.event.emit('addClass', value);
            if (_index.val.isArr(value)) value.forEach(function (item) {
                return _this5.dom.classList.add(item);
            });else this.dom.classList.add(value);
        }
    }, {
        key: 'removeClass',
        value: function removeClass(value) {
            var _this6 = this;

            this.event.emit('deleteClass', value);
            if (_index.val.isArr(value)) value.forEach(function (item) {
                return _this6.dom.classList.remove(item);
            });else this.dom.classList.remove(value);
        }

        // css

    }, {
        key: 'image',
        value: function image(value) {
            this.bg({ image: value });
        }
    }, {
        key: 'bg',
        value: function bg(value) {
            if (_index.val.isStr(value)) this._setCss('background', value);else if (_index.val.isObj(value)) {
                var params = {};
                if ('image' in value) params.backgroundImage = 'url(' + value.image + ')';
                if ('origin' in value) params.backgroundOrigin = _index.val.isObj(value.origin) ? value.origin.x + ' ' + value.origin.y : value.origin;
                if ('position' in value) params.backgroundPosition = _index.val.isObj(value.position) ? value.position.x + ' ' + value.position.y : value.position;
                if ('size' in value) params.backgroundSize = _index.val.isObj(value.size) ? value.size.x + ' ' + value.size.y : value.size;
                if ('repeat' in value) params.backgroundRepeat = value.repeat == 'x' ? 'repeat-x' : value.repeat == 'y' ? 'repeat-y' : value.repeat == 'no' ? 'no-repeat' : value.repeat == 'yes' ? 'repeat' : value.repeat;
                if ('color' in value) params.backgroundColor = value.color;
                this._setCss(params);
            }
        }
    }, {
        key: 'text',
        value: function text(value) {
            if (_index.val.isStr(value)) this._setCss('font', value);else if (_index.val.isObj(value)) {
                var props = {
                    style: 'fontStyle',
                    variant: 'fontVariant',
                    weight: 'fontWeight',
                    size: 'fontSize',
                    height: 'fontHeight',
                    family: 'fontFamily',
                    color: 'color',
                    align: 'textAlign',
                    lineHeight: 'lineHeight',
                    shadow: 'textShadow'
                };
                for (var key in props) {
                    if (key in value) this._setCss(props[key], value[key]);
                }
            }
        }
    }, {
        key: 'border',
        value: function border(value) {
            var _this7 = this;

            if (_index.val.isStr(value)) this._setCss('border', value);else if (_index.val.isObj(value)) {
                var set = function set(value, side) {
                    var props = {
                        color: 'Color',
                        radius: 'Radius',
                        width: 'Width',
                        style: 'Style'
                    };
                    for (var key in props) {
                        if (key in value) _this7._setCss('border' + side + props[key], value[key]);
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
        key: 'dom',
        set: function set(value) {
            var old = this.dom && this.dom.parentNode ? this.dom : null;
            // if dom
            if (_index.val.isDom(value)) this._dom = value;
            // string a string
            else if (_index.val.isStr(value))
                    // template
                    if (value.match(/<.*>.*<\/.*>/)) this._dom = _index.dom.fromString(value);
                    // create new element
                    else this._dom = _index.dom.create(value);
            // link dom with layer
            this._dom.layer = this;
            this.addClass('layer');
            // replace old dom
            if (old) old.replaceWith(this.dom);
        },
        get: function get() {
            return this._dom;
        }
    }, {
        key: 'parent',
        set: function set(value) {
            this.event.emit('parent', value);
            if (value instanceof Layer) value.append(this.dom);else value.appendChild(this.dom);
        },
        get: function get() {
            if (this.dom.parentNode) if (this.dom.parentNode.layer instanceof Layer) return this.dom.parentNode.layer;else return new Layer(this.dom.parentNode);
        }
    }, {
        key: 'content',
        set: function set(value) {
            var _this8 = this;

            var set = function set(string) {
                _this8.event.emit('content', string);
                _this8.dom.innerHTML = string;
            };
            if (_index.val.isObj(value)) this._props.templateUpdater = _index.dom.template(value.bind, value.html, set);else {
                set(value);
                if (this._props.templateUpdater) this._props.templateUpdater.off();
            }
        },
        get: function get() {
            return this.dom.innerHTML;
        }
    }, {
        key: 'move',
        set: function set(value) {
            if ('x' in value) this._setCss('left', value.x);
            if ('y' in value) this._setCss('top', value.y);
        },
        get: function get() {
            return new _index.vec(this.dom.offsetLeft, this.dom.offsetTop);
        }
    }, {
        key: 'size',
        set: function set(value) {
            if ('x' in value) this._setCss('width', value.x);
            if ('y' in value) this._setCss('height', value.y);
        },
        get: function get() {
            return new _index.vec(this.dom.offsetWidth, this.dom.offsetHeight);
        }
    }, {
        key: 'padding',
        set: function set(value) {
            if (_index.val.isObj(value)) {
                if ('x' in value && 'y' in value) {
                    this._setCss('padding', value.y + ' ' + value.x);
                } else {
                    var params = {};
                    if ('x' in value) params.padding = '0 ' + value.x;
                    if ('y' in value) params.padding = value.y + ' 0';
                    if ('l' in value) params.paddingLeft = value.l;
                    if ('t' in value) params.paddingTop = value.t;
                    if ('r' in value) params.paddingRight = value.r;
                    if ('b' in value) params.paddingBottom = value.b;
                    this._setCss(params);
                }
            } else this._setCss('padding', value);
        },
        get: function get() {
            return {
                l: _index.css.computed(this.dom, 'padding-left'),
                t: _index.css.computed(this.dom, 'padding-top'),
                r: _index.css.computed(this.dom, 'padding-right'),
                b: _index.css.computed(this.dom, 'padding-bottom')
            };
        }
    }, {
        key: 'margin',
        set: function set(value) {
            if (_index.val.isObj(value)) {
                if ('x' in value && 'y' in value) {
                    this._setCss('margin', value.y + ' ' + value.x);
                } else {
                    var params = {};
                    if ('x' in value) params.margin = '0 ' + value.x;
                    if ('y' in value) params.margin = value.y + ' 0';
                    if ('l' in value) params.marginLeft = value.l;
                    if ('t' in value) params.marginTop = value.t;
                    if ('r' in value) params.marginRight = value.r;
                    if ('b' in value) params.marginBottom = value.b;
                    this._setCss(params);
                }
            } else this._setCss('margin', value);
        },
        get: function get() {
            return {
                l: _index.css.computed(this.dom, 'margin-left'),
                t: _index.css.computed(this.dom, 'margin-top'),
                r: _index.css.computed(this.dom, 'margin-right'),
                b: _index.css.computed(this.dom, 'margin-bottom')
            };
        }
    }, {
        key: 'origin',
        set: function set(value) {
            var _this9 = this;

            this.event.emit('origin', value);
            ['x', 'y'].forEach(function (axis) {
                if (axis in value) _this9._props.transformation.origin[axis] = value[axis];
            });
            _index.css.applyTransformation(this.dom, this._props.transformation, 'origin');
        },
        get: function get() {
            return this._props.transformation.origin;
        }
    }, {
        key: 'translate',
        set: function set(value) {
            var _this10 = this;

            this.event.emit('translate', value);
            ['x', 'y'].forEach(function (axis) {
                if (axis in value) _this10._props.transformation.translate[axis] = value[axis];
            });
            _index.css.applyTransformation(this.dom, this._props.transformation);
        },
        get: function get() {
            return this._props.transformation.translate;
        }
    }, {
        key: 'scale',
        set: function set(value) {
            var _this11 = this;

            this.event.emit('scale', value);
            if (_index.val.isNum(value)) {
                this._props.transformation.scale.x = this._props.transformation.scale.y = this._props.transformation.scale.z = value;
            } else ['x', 'y'].forEach(function (axis) {
                if (axis in value) _this11._props.transformation.scale[axis] = value[axis];
            });
            _index.css.applyTransformation(this.dom, this._props.transformation);
        },
        get: function get() {
            return this._props.transformation.scale;
        }
    }, {
        key: 'rotate',
        set: function set(value) {
            this.event.emit('rotate', value);
            this._props.transformation.rotate = '' + value + (_index.val.isNum(value) ? 'deg' : '');
            _index.css.applyTransformation(this.dom, this._props.transformation);
        },
        get: function get() {
            return this._props.transformation.rotate;
        }
    }, {
        key: 'matrix',
        set: function set(matrix) {
            this.event.emit('matrix', matrix.value);
            this._props.transformation.matrix3d = matrix;
            _index.css.applyTransformation(this.dom, this._props.transformation);
        },
        get: function get() {
            return this._props.transformation.matrix3d;
        }

        // center

    }, {
        key: 'center',
        set: function set(value) {
            if (_index.val.exists(value.x)) {
                this._setCss('left', value.x - this.rect.position.x + 'px');
                this.translate = { x: '-50%' };
            }
            if (_index.val.exists(value.y)) {
                this._setCss('top', value.y - this.rect.position.y + 'px');
                this.translate = { y: '-50%' };
            }
        },
        get: function get() {
            return _index.geo.center(this.rect);
        }

        // offset

    }, {
        key: 'rect',
        get: function get() {
            return _index.geo.vpo(this.dom);
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

var _index = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Screen = function (_Layer) {
    _inherits(Screen, _Layer);

    function Screen() {
        _classCallCheck(this, Screen);

        return _possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).apply(this, arguments));
    }

    _createClass(Screen, [{
        key: 'on',


        // external event interface
        value: function on(topic, fn, options) {
            // gestures
            if (topic in _index.event) return _index.gesture[topic](this, fn).on();
            // dom events
            else if (_index.event.support(document, topic)) return _index.event.listener(document, topic, fn, options).on();
                // dom css
                else return this.event.on(topic, fn);
        }
    }, {
        key: 'size',
        get: function get() {
            return new _index.vec(window.innerWidth, window.innerHeight);
        }
    }, {
        key: 'center',
        get: function get() {
            return this.size.scale(.5);
        }
    }]);

    return Screen;
}(_index.Layer);

exports.default = new Screen(document.body);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scroller = function (_Layer) {
    _inherits(Scroller, _Layer);

    function Scroller(options) {
        _classCallCheck(this, Scroller);

        // this.dom[this.dom.tagName === 'A'? 'href': 'src'] = value
        options.dom = '.scroller';
        return _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).call(this, options));
    }

    _createClass(Scroller, [{
        key: 'flow',
        value: function flow(value) {
            this.dom.classList.add(value || 'y');
        }
    }]);

    return Scroller;
}(_index.Layer);

exports.default = Scroller;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = __webpack_require__(0);

exports.default = {

	/*
 	fw.animation.request.on('move', () => {
 		scroller.translate = pointer
 	})
 	fw.animation.request.draw()
 */

	draw: function () {
		var thread = true;
		var jobs = {};
		return function (key, fn) {
			jobs[key] = fn;
			if (thread) {
				thread = false;
				window.requestAnimationFrame(function () {
					thread = true;
					for (var i in jobs) {
						jobs[i]();delete jobs[i];
					}
				});
			}
		};
	}(),

	/*
 	dom.set({
 		translate  : new fw.vec(0, -100),
 	}).flow(1.5, 'ease', 1, {
 		translate  : new fw.vec(0, 53.5),
 	}, function () {
 		console.log('done')
 	})
 */

	flow: function flow(layer, time, ease, delay, next, end) {
		// will be deprecated
		var bang = function bang() {
			layer.dom.removeEventListener('transitionend', bang);
			layer.dom.style[_index.css.vendor.transition] = null;
			if (end) {
				if (_index.val.isFn(end)) end();else if (_index.val.isObj(end)) layer.set(end);
				end = null;
			}
		};
		layer.dom.addEventListener('transitionend', bang);
		layer.dom.style[_index.css.vendor.transition] = time + 's ' + ease + ' ' + delay + 's';
		setTimeout(function () {
			if (_index.val.isFn(next)) next();else if (_index.val.isObj(next)) layer.set(next);
		}, 0);
	},


	jobs: function () {
		var fps = 60;
		var active = false;
		var jobs = {};
		return function (id, job) {
			var running = id in jobs;
			jobs[id] = job;
			if (!active) {
				active = true;
				var loop = setInterval(function () {
					for (var i in jobs) {
						if (jobs[i]()) delete jobs[i];
					}if (Object.keys(jobs).length == 0) {
						active = false;
						clearTimeout(loop);
					}
				}, 1000 / fps);
			}
			return running;
		};
	}(),

	// Other Functions
	getSinus: function getSinus(from, to, speed) {
		var time = new Date().getTime() * 0.001;
		var sin = Math.sin(time * (speed || 1));
		return _index.math.map(sin, -1, 1, from, to);
	},


	/*
 	var tilt = fw.animation.decay(velocity => {
         fw.animation.draw(`${layer2.identifier}: velocity`, () => {
             layer2.tilt = velocity.scale(5)
         })
     }).on('end', e => {
         console.log('test')
     })
 */

	decay: function decay(callback) {
		var _this = this;

		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var id = window.performance.now();
		var e = new _index.event.Machine('Decay', false);
		var job, _stop;
		var types = {
			vec: {
				calculate: function calculate(a, b, c) {
					return a.add(b.sub(a).scale(c), 1);
				},
				isEqual: function isEqual(a, b, c) {
					return _index.math.isEqual(b.sub(a).len(), 0);
				}
			},
			num: {
				calculate: function calculate(a, b, c) {
					return a += (b - a) * c;
				},
				isEqual: function isEqual(a, b, c) {
					return _index.math.isEqual(a, set);
				}
			}
		};
		var out = {
			to: function to(value) {
				if (!_index.val.exists(job)) {
					job = {
						value: value,
						type: types[value instanceof _index.vec ? 'vec' : 'num']
					};
					_stop = false;
					e.emit('start');
				}
				_this.jobs(id, function () {
					if (!_stop) {
						job.type.calculate(job.value, value, options.speed || .1);
						callback(job.value);
						if (job.type.isEqual(job.value, value)) {
							// job  = undefined
							_stop = true;
							e.emit('end');
						}
					}
					var stopped = _stop;
					_stop = false;
					return stopped;
				});
			},
			set: function set(value) {
				job.value = value;
				callback(value);
			},
			stop: function stop() {
				_stop = true;
				e.emit('stop');
				return out;
			},
			on: function on(topic, fn) {
				e.on(topic, fn);
				return out;
			}
		};
		return out;
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

var _index = __webpack_require__(0);

exports.default = {

    // _splitQuery('parent.child.element')
    _splitQuery: function _splitQuery(query) {
        var levels = query.split('.');
        return {
            level: levels,
            last: levels.length - 1
        };
    },


    // level({id: [10, 15]}, _splitQuery('id.0'), 20); -> {id: [20, 15]}
    _level: function _level(object, query, value) {
        var path = object;
        for (var n = 0; n < query.last; n++) {
            path = path[query.level[n]];
        }if (value) path[query.level[query.last]] = value;else return path[query.level[query.last]];
    },


    // map(workspaces, 'workspace.items.1')
    map: function map(array, query) {
        var _this = this;

        var levels = this._splitQuery(query);
        return array.map(function (list) {
            return _this._level(list, levels);
        });
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
    delete: function _delete(array, query) {
        var deleted;
        if (_index.val.isObj(query)) {
            deleted = this.find(array, query);
            deleted.forEach(function (found) {
                return array.splice(array.indexOf(found), 1);
            });
        } else {
            var i = array.indexOf(query);
            deleted = array.splice(i, 1);
        }
        return deleted;
    },


    // updateColumn([{id: 15}, {id: 30}], {id: [20, 15]}); -> [{id: 20}, {id: 15}]
    updateColumn: function updateColumn(array, query) {
        var _this2 = this;

        for (var i in query) {
            if (array.length == query[i].length) {
                var levels = this._splitQuery(i);
                array.forEach(function (object, index) {
                    return _this2._level(object, levels, query[i][index]);
                });
            } else console.log('different lenghtes');
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(0);

exports.default = {
    applyTransformation: function applyTransformation(element, p, type) {
        if (type == 'origin') {
            element.style[this.vendor.transformOrigin] = p.origin.x + ' ' + p.origin.y;
            element.style[this.vendor.perspectiveOrigin] = '' + p.origin.z;
        } else element.style[this.vendor.transform] = 'matrix3d(' + p.matrix3d.toString() + ')\n                translate(' + p.translate.x + ', ' + p.translate.y + ')\n                rotate(' + p.rotate + ')\n                scale(' + p.scale.x + ', ' + p.scale.y + ')';
    },
    computed: function computed(element, prop) {
        return parseFloat(document.defaultView.getComputedStyle(element, null).getPropertyValue(prop));
    },


    vendor: function (props) {
        var out = {};
        if (!_index.val.exists(document)) return out;
        var prefix = [null, 'ms', 'webkit', 'moz', 'o'];
        var div = document.createElement('div');
        props.forEach(function (prop) {
            for (var i = 0; i < prefix.length; i++) {
                var p = prefix[i] + prefix[i] ? _index.text.capitalize(prop) : prop;
                if (_index.val.exists(div.style[p])) {
                    out[prop] = p;break;
                }
            }
        });
        return out;
    }(['transform', 'transformOrigin', 'perspectiveOrigin', 'columnCount', 'transition'])

};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(0);

exports.default = {

    // create ('div#id .class .class')
    create: function create() {
        var query = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        var classes = query.replace(/ /g, '').split('.');
        var tagAndId = [];
        if (classes[0].length == 0) tagAndId = classes[0].split('#');
        classes.shift();
        var element = document.createElement(tagAndId[0] || 'div');
        if (tagAndId.length > 1) element.id = tagAndId[1];
        classes.forEach(function (style) {
            return element.classList.add(style);
        });
        return element;
    },
    template: function template(model, tmp, callback) {
        var init = true;
        var active = true;
        var render = function render() {
            var result = tmp.replace(/{([A-z 0-9]+)}/g, function ($1, $2) {
                if (init) {
                    var val = model[$2];
                    Object.defineProperty(model, $2, {
                        set: function set(value) {
                            val = value;
                            if (active) render();
                        },

                        get: function get() {
                            return val;
                        }
                    });
                }
                return model[$2];
            });
            callback(result);
            init = false;
        };
        render();
        return {
            on: function on() {
                active = true;
                return this;
            },
            off: function off() {
                active = false;
                return this;
            },

            get active() {
                return active;
            }
        };
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = __webpack_require__(0);

exports.default = {
	clone: function clone(object, methods) {
		return Object.assign(Object.assign({}, object), methods);
		//return JSON.parse(JSON.stringify(_object))
	},
	uuid: function uuid() {
		return 'dd-d-d-d-ddd'.replace(/d/g, function () {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		});
	},
	uploadFile: function uploadFile(input, onready) {
		var _this = this;

		input.onchange = function () {
			var event = window.event;
			var files = event.target.files;
			var output = [];
			for (var i = 0; i < files.length; i++) {
				_this.readFile(files[i], function (file) {
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
		if (_index.val.isArr(list)) list.forEach(function (url, i) {
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(0);

exports.default = {
    Machine: function Machine() {
        var namespace = arguments.length <= 0 || arguments[0] === undefined ? 'event' : arguments[0];
        var debug = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        var log = function log(msg, topic, payload) {
            if (out.debug) {
                var obj = {
                    topic: topic,
                    timestamp: new Date().getTime()
                };
                if (_index.val.exists(payload)) Object.assign(obj, { payload: payload });
                console.log('[' + namespace + '] ' + msg, obj);
            }
        };
        var topics = {};
        var out = {
            debug: debug,
            on: function on(topic, callback) {
                if (!topics[topic]) topics[topic] = [];
                return {
                    get active() {
                        return topics[topic] && topics[topic].indexOf(callback) > -1;
                    },
                    on: function on() {
                        if (!this.active) {
                            log('subscribed to', topic);
                            topics[topic].push(callback);
                        }
                        return this;
                    },
                    off: function off() {
                        if (this.active) {
                            log('unsubscribed from', topic);
                            _index.array.delete(topics[topic], callback);
                        }
                        return this;
                    }
                }.on();
            },
            emit: function emit(topic, payload) {
                log('fired', topic, payload);
                if (topics[topic]) topics[topic].forEach(function (callback) {
                    return callback(payload);
                });
                return this;
            }
        };
        return out;
    },
    listener: function listener(dom, type, callback, flag) {
        var fn = function fn(e) {
            e.undef = function () {
                e.preventDefault();return e;
            };
            e.stop = function () {
                e.stopPropagation();return e;
            };
            e.both = function () {
                return e.undef().stop();
            };
            return callback(e);
        };
        return {
            active: false,
            on: function on() {
                if (!this.active) {
                    this.active = true;
                    dom.addEventListener(type, fn, flag);
                }
                return this;
            },
            off: function off() {
                if (this.active) {
                    this.active = false;
                    dom.removeEventListener(type, fn, flag);
                }
                return this;
            }
        };
    },
    support: function support(element, type) {
        var supported = 'on' + type in element;
        if (!supported) {
            element.setAttribute(type, null);
            supported = typeof element[type] === 'function';
        }
        return supported;
    },


    types: function () {
        if (_index.val.exists(window)) {
            var isTouch = 'ontouchstart' in window; // window.PointerEvent
            return {
                isTouch: isTouch,
                tap: 'click',
                down: isTouch ? 'touchstart' : 'mousedown',
                move: isTouch ? 'touchmove' : 'mousemove',
                up: isTouch ? 'touchend' : 'mouseup',
                in: isTouch ? null : 'mouseenter',
                out: isTouch ? null : 'mouseleave',
                cancel: isTouch ? 'touchcancel' : null,
                scroll: 'scroll',
                change: 'change'
            };
        }
    }(),

    /*
        var dropZone = layer.on('file', {
            in () {
                layer.bg({color: 'red'})
            },
            out () {
                layer.bg({color: null})
            },
            drop (data) {
                console.log(data)
            }
        }).on()    
    */

    fileDrop: function fileDrop(layer) {
        var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var over = this.listener(layer.dom, 'dragover', function (e) {
            t.in && t.in({ e: e });
            leave.on();
            drop.on();
            e.preventDefault();
        });
        var leave = this.listener(layer.dom, 'dragleave', function (e) {
            t.out && t.out({ e: e });
            leave.off();
            drop.off();
            e.preventDefault();
        });
        var drop = this.listener(layer.dom, 'drop', function (e) {
            t.out && t.out({ e: e });
            var read = function read(file, callback) {
                if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        callback({
                            name: file.name,
                            data: this.result
                        });
                    };
                    reader.readAsDataURL(file);
                }
            };
            var files = e.dataTransfer.files;
            var out = [];
            for (var i = 0; i < files.length; i++) {
                read(files[i], function (data) {
                    out.push(data);
                    if (out.length == files.length && t.drop) t.drop(out);
                });
            }e.preventDefault();
        });
        return {
            get active() {
                return over.active;
            },
            on: function on() {
                over.on();
                return this;
            },
            off: function off() {
                over.off();
                return this;
            }
        };
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

var _index = __webpack_require__(0);

exports.default = {

	// viewport offset
	vpo: function vpo(dom) {
		var rect = dom.getBoundingClientRect();
		return {
			position: new _index.vec(rect.left, rect.top),
			opposite: new _index.vec(rect.right, rect.bottom),
			size: new _index.vec(rect.width, rect.height)
		};
	},
	vp: function vp() {
		return new _index.vec(document.documentElement.clientWidth, document.documentElement.clientHeight);
	},
	center: function center(params) {
		// for regular vector system
		if (_index.val.isVec(params)) return params.position.add(params.size.scale(.5));
		// for dimension system
		else if (_index.val.isDim(params)) {
				var rect = this.dimvec(params);
				return rect.position.add(rect.size.scale(.5));
			}
	},
	dimvec: function dimvec(dims) {
		var size = dims.w ? new _index.vec(dims.w, dims.h) : dims.r ? new _index.vec(dims.r - dims.l, dims.b - dims.t) : null;
		return { size: size, position: new _index.vec(dims.l, dims.t) };
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
	},
	getSide: function getSide(pointer, size, border) {
		var border = .5 * border;
		return {
			x: pointer.x < border ? 'l' : size.x - pointer.x < border ? 'r' : 'c',
			y: pointer.y < border ? 't' : size.y - pointer.y < border ? 'b' : 'c'
		};
	},


	// {x: 'l|c|r', y: 't|m|b'}
	getCursor: function getCursor(side) {
		return side ? {
			t: { l: 'nw-resize', c: 'n-resize', r: 'ne-resize' },
			c: { l: 'w-resize', c: 'move', r: 'e-resize' },
			b: { l: 'sw-resize', c: 's-resize', r: 'se-resize' }
		}[side.y][side.x] : null;
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

var _index = __webpack_require__(0);

var animationPreset = {
    time: .3,
    ease: 'cubic-bezier(.1, .5, .1, 1.2)'
};

exports.default = {
    wheel: function wheel(layer) {
        var transport = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return layer.on('mousewheel', function (e) {
            var vector = 0;
            var w = e.wheelDelta;
            var d = e.detail;
            if (d) {
                // Opera
                if (w) vector = w / d / 40 * d > 0 ? 1 : -1;
                // Firefox
                else vector = -d / 3;
                // IE / Safari / Chrome
            } else vector = w / 120;
            transport({ e: e, vector: vector });
        });
    },
    resize: function resize(layer) {
        var transport = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


        return {
            get active() {},
            on: function on() {
                return this;
            },
            off: function off() {
                return this;
            },
            cancel: function cancel() {}
        };
    },


    // resize (layer, transport = {}) {
    //     var border = 20
    //     var side = {x: null, y: null}
    //     var cursorHover = event.listener(layer.dom, 'mousemove', e => {
    //         var rect    = layer.rect
    //         var pointer = new vec(e.clientX, e.clientY)
    //         side = geo.getSide(pointer.sub(rect.position), rect.size, border)
    //         layer.dom.style.cursor = geo.getCursor(side)
    //     })
    //     var drag = this._dragMouse(layer, {
    //         down (t) {
    //             cursorHover.off()
    //         },
    //         move (t) {
    // 
    //         },
    //         up (t) {
    //             
    //         },
    //         cancel (t) {
    //             cursorHover.on()
    //         }
    //     })
    //     return {
    //         get active () {
    //             return cursorHover.status
    //         },
    //         on () {
    //             drag.on()
    //             cursorHover.on()
    //             return this
    //         },
    //         off () {
    //             drag.off()
    //             cursorHover.off()
    //             return this
    //         },
    //         cancel () {
    //             
    //         },
    //     }
    // },

    drag: function drag(layer) {
        var transport = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var translate = new _index.vec();
        var method = _index.event.types.isTouch ? '_initMultitouchGesture' : '_dragMouse';
        return this[method](layer, _index.etc.clone(transport, {
            move: function move(t) {
                if (transport.move && transport.move(t) !== false || !transport.move) {
                    translate = t.translate;
                    if (t.constraints) translate.range(t.constraints, true);
                    _index.animation.draw(layer.identifier + ': translate.move', function () {
                        return layer.matrix = new _index.matrix().translate(translate);
                    });
                }
            },
            cancel: function cancel(t) {
                t.translate = translate;
                if (transport.cancel && transport.cancel(t) !== false || !transport.cancel) _index.animation.draw(layer.identifier + ': translate.cancel', function () {
                    return layer.animate(animationPreset, { matrix: new _index.matrix() });
                });
            }
        }), 'translate');
    },
    pinchToRotate: function pinchToRotate(layer) {
        var transport = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return this._initMultitouchGesture(layer, _index.etc.clone(transport, {
            move: function move(t) {
                if (transport.move && transport.move(t) !== false || !transport.move) _index.animation.draw(layer.identifier + ': rotate.move', function () {
                    return layer.rotate = t.rotate;
                });
            },
            cancel: function cancel(t) {
                if (transport.cancel && transport.cancel(t) !== false || !transport.cancel) _index.animation.draw(layer.identifier + ': rotate.cancel', function () {
                    return layer.animate(animationPreset, { rotate: 0 });
                });
            }
        }), 'rotate');
    },
    pinchToZoom: function pinchToZoom(layer) {
        var transport = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return this._initMultitouchGesture(layer, _index.etc.clone(transport, {
            move: function move(t) {
                if (transport.move && transport.move(t) !== false || !transport.move) _index.animation.draw(layer.identifier + ': scale.move', function () {
                    layer.scale = t.scale;
                });
            },
            cancel: function cancel(t) {
                if (transport.cancel && transport.cancel(t) !== false || !transport.cancel) _index.animation.draw(layer.identifier + ': scale.cancel', function () {
                    layer.animate(animationPreset, {
                        scale: 1
                    });
                });
            }
        }), 'scale');
    },


    /*
        this is the second layer of interaction
        for mouse are separate functions for dragging
        for touch is one single that splits translation, rotation and scale
    */

    _dragMouse: function _dragMouse(layer, transport) {
        var _down = new _index.vec();
        var velocity = new _index.vec();
        return this._dragMouseEventPattern(layer, _index.etc.clone(transport, {
            down: function down(t) {
                velocity;
                _down = velocity = t.pointer;
                transport.down && transport.down({
                    event: t.event,
                    down: _down
                });
            },
            move: function move(t) {
                var translate = t.pointer.sub(_down);
                transport.move && transport.move({
                    event: t.event,
                    translate: translate,
                    velocity: translate.sub(velocity)
                });
                velocity = translate;
            },
            cancel: function cancel(t) {
                transport.cancel(t);
                _down.reset();
                velocity.reset();
            }
        }));
    },
    _initMultitouchGesture: function _initMultitouchGesture(layer, transport, type) {
        var address = 'transformationTouchEventLink';
        if (!layer._props[address]) {
            var listener = new _index.event.Machine('transformationTouchEventLink');
            var transport_ = { constraints: {} };['init', 'down', 'move', 'up', 'cancel'].forEach(function (key) {
                return transport_[key] = function (t) {
                    return listener.emit(key, t);
                };
            });
            var toggle = this._multitouch(layer, transport_);
            layer._props[address] = {
                listener: listener,
                transport: transport_,
                cancel: toggle.cancel,
                checkToggle: function checkToggle() {
                    var flag = 'off';
                    var property = ['translate', 'rotate', 'scale'];
                    for (var i = 0; i < property.length; i++) {
                        if (transport_[property[i]]) {
                            flag = 'on';break;
                        }
                    }toggle[flag]();
                }
            };
        }
        var link = layer._props[address];
        for (var key in transport) {
            link.listener.on(key, function (method, key) {
                return key == 'move' ? function (t) {
                    // adapt output for every type
                    if (type == 'translate') t.translate = t.transformation.getTranslation();
                    if (type == 'rotate') t.rotate = t.transformation.getRotation().z;
                    if (type == 'scale') t.scale = t.transformation.getScale().z;
                    // execute event function
                    method(t);
                    // apply new transport to the whole
                    // transformation multitouch event
                    link.transport.constraints[type] = t.constraints;
                    delete t.constraints;
                } : method;
            }(transport[key], key));
        }return {
            get active() {
                return link.transport[type];
            },
            on: function on() {
                link.transport[type] = true;
                link.checkToggle();
                return this;
            },
            off: function off() {
                link.transport[type] = false;
                link.checkToggle();
                return this;
            },

            cancel: link.cancel
        };
    },
    _multitouch: function _multitouch(layer, transport) {
        // some shared values
        var touches = {};
        var scale_rotate = new _index.matrix();
        var lastState = new _index.matrix();
        var origin = new _index.vec();
        var center = new _index.vec();
        var translate = new _index.vec();
        // export control interface for gesture events
        return this._dragTouchEventPattern(layer, {
            init: function init(t) {
                // get at start of a session 
                // a center of a layer
                center = layer.center;
            },
            down: function down(t) {
                // fire interface function
                transport.down && transport.down(t);
                // calculate average vector aka origin and
                // bring this origin on rotated and scaled object back
                origin = _index.vec.prototype.mix(t.pointers).sub(center).sub(translate);
            },
            move: function move(t) {
                // define max and min movement for rotation and scale
                // translation constraints happens later on touch and mouse together
                var rotate = t.event.rotation;
                var rConst = transport.constraints.rotate;
                if (rConst) {
                    var last = lastState.getRotation().z;
                    rotate = _index.math.rubberRange(rotate + last, rConst.min, rConst.max, rConst.length || 10, rConst.onLimit) - last;
                }
                var scale = t.event.scale;
                var sConst = transport.constraints.scale;
                if (sConst) {
                    var last = lastState.getScale().z;
                    scale = _index.math.rubberRange(scale + last, sConst.min + 1, sConst.max + 1, sConst.length || .2, sConst.onLimit) - last;
                }
                // calculate drag difference
                var velocity = new _index.vec();
                for (var id in t.pointers) {
                    // if a touch is not initialized, 
                    // save its vector to the list
                    if (!touches[id]) touches[id] = t.pointers[id];
                    // calculate difference between frames
                    velocity.add(t.pointers[id], true).sub(touches[id], true);
                    // save value for the next time
                    touches[id] = t.pointers[id];
                }
                // calculate average difference between every dragged touch
                velocity.div(new _index.vec().fill(t.event.targetTouches.length), true);
                // apply difference to persistent translation vector
                translate.add(velocity, true);
                // modify scale and rotation matrix
                var drag = new _index.matrix();
                var pinch = new _index.matrix().translate(origin.scale(-1));
                if (transport.translate) drag.translate(translate, true);
                if (transport.rotate) pinch.rotate(rotate, true);
                if (transport.scale) pinch.scale(scale, true);
                scale_rotate = lastState.multiply(pinch.translate(origin));
                // get final transformation
                var transformation = scale_rotate.multiply(drag);
                // export values
                transport.move && transport.move({
                    event: t.event,
                    transformation: transformation,
                    velocity: velocity
                });
            },
            up: function up(t) {
                // apply matrix for the next drag action
                if (t.event.targetTouches.length > 0) lastState = scale_rotate;
                transport.up && transport.up(t);
            },
            cancel: function cancel(t) {
                // export up event
                transport.cancel && transport.cancel(t);
                center.reset();
                lastState.reset();
                translate.reset();
                touches = {};
            }
        });
    },


    /*
        this is the lowest level of mouse and touch interaction principles
        support of four main methods: down, move, up and cancel
    */

    _dragMouseEventPattern: function _dragMouseEventPattern(layer, transport) {
        var down = _index.event.listener(layer.dom, 'mousedown', function (e) {
            if (!move.active) {
                move.on();
                up.on();
            }
            transport.down && transport.down({
                event: e,
                pointer: new _index.vec(e.clientX, e.clientY)
            });
            e.preventDefault();
        });
        var move = _index.event.listener(document, 'mousemove', function (e) {
            transport.move && transport.move({
                event: e,
                pointer: new _index.vec(e.clientX, e.clientY)
            });
            e.preventDefault();
        });
        var up = _index.event.listener(document, 'mouseup', function (e) {
            var t = {
                event: e,
                pointer: new _index.vec(e.clientX, e.clientY)
            };
            transport.up && transport.up(t);
            cancel(t);
            e.preventDefault();
        });
        var cancel = function cancel() {
            var t = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            move.off();
            up.off();
            transport.cancel && transport.cancel(t);
        };
        return {
            get active() {
                return down.active;
            },
            on: function on() {
                down.on();
                return this;
            },
            off: function off() {
                cancel();
                down.off();
                return this;
            },

            cancel: cancel
        };
    },
    _dragTouchEventPattern: function _dragTouchEventPattern(layer, transport) {
        var convertTouches = function convertTouches(fingers) {
            var out = {};
            for (var i = 0; i < fingers.length; i++) {
                out[fingers[i].identifier] = new _index.vec(fingers[i].clientX, fingers[i].clientY);
            }return out;
        };
        var down = _index.event.listener(layer.dom, 'touchstart', function (e) {
            if (!move.active) {
                move.on();
                up.on();
                transport.init({ event: e });
            }
            transport.down && transport.down({
                event: e,
                pointers: convertTouches(e.targetTouches)
            });
            e.preventDefault();
        });
        var move = _index.event.listener(layer.dom, 'touchmove', function (e) {
            transport.move && transport.move({
                event: e,
                pointers: convertTouches(e.targetTouches)
            });
            e.preventDefault();
        });
        var up = _index.event.listener(layer.dom, 'touchend', function (e) {
            var t = { event: e };
            transport.up && transport.up(t);
            if (e.targetTouches.length == 0) cancel(t);
            e.preventDefault();
        });
        var cancel = function cancel() {
            var t = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            move.off();
            up.off();
            transport.cancel && transport.cancel(t);
        };
        return {
            get active() {
                return down.active;
            },
            on: function on() {
                down.on();
                return this;
            },
            off: function off() {
                cancel();
                down.off();
                return this;
            },

            cancel: cancel
        };
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	isEqual: function isEqual(a, b) {
		var tolerance = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

		var shit = Math.pow(10, -tolerance);
		return a - shit < b && b < a + shit;
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
	getValueFromDictionary: function getValueFromDictionary(value, list) {
		var out;
		for (var i = 0; i < list.length; i++) {
			if (value >= list[i][0]) out = list[i][1];
		}return out;
	},
	rubberRange: function rubberRange(value, min, max, range, state) {
		// https://www.desmos.com/calculator
		// Based on 1-pow(1+x,-1)
		var factor = 1.3;
		var isMax = _index.val.exists(min);
		var isMin = _index.val.exists(max);
		if (isMax || isMin) {
			var dir = value < min;
			var range = (dir ? 1 : -1) * range;
			var len = dir ? min : max;
			var x = (len - value) / range;
			var y = len - range * (1 - Math.pow(1 + x, -factor));
		}
		var maxState = isMax && value < min;
		var minState = isMin && value > max;
		if (state) state(maxState ? 'max' : minState ? 'min' : null);
		return maxState || minState ? y : value;
	},


	// var buffer = new Buffer(10) then var value = buffer.get(23.445) 
	buffer: function () {
		function buffer(size) {
			_classCallCheck(this, buffer);

			this.array = [];
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    // TODO: http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
    http://www.alanzucconi.com/2016/02/10/tranfsormation-matrix/
    https://github.com/infamous/boxer/blob/master/src/math/Quaternion.js
    http://jsfiddle.net/dFrHS/1/
    http://keithclark.co.uk/articles/calculating-element-vertex-data-from-css-transforms/
*/

var init = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

var Matrix = function () {
    function Matrix(value) {
        _classCallCheck(this, Matrix);

        this.value = !_index.val.exists(value) ? init : _index.val.isStr(value) ? this.fromString(value) : value;
    }

    _createClass(Matrix, [{
        key: 'multiply',
        value: function multiply(matrix, set) {
            var a = this.value;
            var b = matrix instanceof Matrix ? matrix.value : matrix;
            // 4x4 Matrix Multiplication
            var result = [a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12], a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13], a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14], a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15], a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12], a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13], a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14], a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15], a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12], a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13], a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14], a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15], a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12], a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13], a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14], a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]];
            if (set) {
                this.value = result;
                return this;
            } else return new Matrix(result);
        }

        /* 
            extract floats 
            from 'matrix3d(0, -1, 0.182, -0.465)'
            to [0, -1, 0.182, -0.46]
        */

    }, {
        key: 'fromCss',
        value: function fromCss(string) {
            return string.match(/-?(\d+(.\d+)?)(?=,|\))/g).map(parseFloat);
        }
    }, {
        key: 'toCss',
        value: function toCss() {
            return 'matrix3d(' + this.toString() + ')';
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.value.join(',');
        }
    }, {
        key: 'translate',
        value: function translate(v, set) {
            var x = v.x;
            var y = v.y;
            var z = v.z;

            return this.multiply([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1], set);
        }
    }, {
        key: 'getTranslation',
        value: function getTranslation() {
            return new _index.vec(this.value[12], this.value[13], this.value[14]);
        }
    }, {
        key: 'scale',
        value: function scale(v, set) {
            if (_index.val.isNum(v)) return this.scale(new _index.vec().fill(v), set);else {
                var x = v.x;
                var y = v.y;
                var z = v.z;

                return this.multiply([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1], set);
            }
        }
    }, {
        key: 'getScale',
        value: function getScale() {
            return new _index.vec(this.value[0], this.value[5], this.value[10]);
        }
    }, {
        key: 'rotateX',
        value: function rotateX(angle, set) {
            return this._rotate(angle, function (c, s) {
                return [1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1];
            }, set);
        }
    }, {
        key: 'rotateY',
        value: function rotateY(angle, set) {
            return this._rotate(angle, function (c, s) {
                return [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1];
            }, set);
        }
    }, {
        key: 'rotateZ',
        value: function rotateZ(angle, set) {
            return this._rotate(angle, function (c, s) {
                return [c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            }, set);
        }
    }, {
        key: '_rotate',
        value: function _rotate(deg, template, set) {
            var rad = -deg * Math.PI / 180;
            return this.multiply(template(Math.cos(rad), Math.sin(rad)), set);
        }
    }, {
        key: 'rotate',
        value: function rotate(v, set) {
            if (_index.val.isNum(v)) return this.rotateZ(v, set);else {
                return this.rotateX(v.x, set).rotateY(v.y, set).rotateZ(v.z, set);
            }
        }
    }, {
        key: 'getRotation',
        value: function getRotation() {
            return new _index.vec(Math.atan2(this.value[9], this.value[10]), Math.asin(-this.value[8]), Math.atan2(this.value[4], this.value[0])).apply(function (axis) {
                return -axis.value * 180 / Math.PI;
            });
        }
    }, {
        key: 'resetRotation',
        value: function resetRotation() {
            var _this = this;

            [0, 1, 2, 4, 5, 6, 8, 9, 10].forEach(function (i) {
                return _this.value[i] = init[i];
            });
            return this;
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

    }, {
        key: 'reset',
        value: function reset() {
            this.value = init;
            return this;
        }
    }]);

    return Matrix;
}();

exports.default = Matrix;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(0);

var assets = {
    signs: ['', ',', '.', '?', '!'],
    words: 'accusam aliquyam amet at clita consetetur diam dolor dolore dolores duo ea eirmod elitr eos erat est et gubergren invidunt ipsum justo kasd labore lorem magna no nonumy rebum sad sanctus sea sed sit stet takimata tempor ut vero voluptua'.split(' '),
    image: {
        mac: ['Abstract', 'Antelope Canyon', 'Bahamas Aerial', 'Beach', 'Blue Pond', 'Bristle Grass', 'Brushes', 'Circles', 'Death Valley', 'Desert', 'Ducks on a Misty Pond', 'Eagle & Waterfall', 'Earth and Moon', 'Earth Horizon', 'El Capitan 2', 'El Capitan', 'Elephant', 'Flamingos', 'Floating Ice', 'Floating Leaves', 'Foggy Forest', 'Forest in Mist', 'Foxtail Barley', 'Frog', 'Galaxy', 'Grass Blades', 'Hawaiian Print', 'Isles', 'Lake', 'Lion', 'Milky Way', 'Moon', 'Mountain Range', 'Mt. Fuji', 'Pink Forest', 'Pink Lotus Flower', 'Poppies', 'Red Bells', 'Rice Paddy', 'Rolling Waves', 'Shapes', 'Sierra 2', 'Sierra', 'Sky', 'Snow', 'Underwater', 'Wave', 'Yosemite 2', 'Yosemite 3', 'Yosemite 4', 'Yosemite 5', 'Yosemite', 'Zebras'],
        windows: ['...'],
        linux: ['...']
    }
};

var expressions = {

    // {type: int, mode: cycle, from: 1}
    // {type: int, mode: forward, from: 1}
    // {type: int, mode: random, min: 1, max: 10}
    int: function int(opt) {
        return { i: 0, method: 'int', mode: opt.mode, render: function render() {
                return opt.mode == 'forward' || opt.mode == 'loop' ? opt.from + this.i++ : opt.mode == 'random' ? Math.floor(_index.math.to(Math.random(), opt.min, opt.max)) : this.i;
            }
        };
    },


    // {type: string, mode: text, count: 20}
    // {type: string, mode: text, min: 20, max 100}
    string: function string(opt) {
        return {
            render: function render() {
                var count = opt.count ? opt.count : Math.floor(_index.math.to(Math.random(), opt.min, opt.max));
                var capitalize = true;
                var sentence = '';
                for (var i = 0; i < count; i++) {
                    var randomWord = assets.words[Math.floor(Math.random() * assets.words.length)];
                    var signIndex = Math.floor(Math.pow(Math.random(), 20) * assets.signs.length);
                    var sign = assets.signs[_index.math.min(signIndex, i < count - 1 ? 0 : 2)] + ' ';
                    var word = capitalize ? _index.text.capitalize(randomWord) : randomWord;
                    sentence += word + sign;
                    capitalize = signIndex > 1;
                }
                return sentence.substring(0, sentence.length - 1);
            }
        };
    },


    // {type: image, source: local}
    image: function image(opt) {
        var source = {
            remote: function remote(i) {
                return 'https://unsplash.it/500?image=' + i;
            },
            local: function local(i) {
                return 'file:///Library/Desktop%20Pictures/' + escape(assets.image.mac[i % assets.image.mac.length]) + '.jpg';
            }
        };
        var seed = _index.math.randInt(0, 1000);
        return { i: 0, render: function render() {
                return source[opt.source || 'local'](seed + this.i++);
            }
        };
    },


    // get(i => {return custom[i]})
    iterate: function iterate(callback) {
        return { type: 'expression', i: 0, render: function render() {
                return callback(this.i++);
            }
        };
    }
};

exports.default = {

    /*
        model.on('make', item => {
            return new fw.Layer({
                parent : scroller,
                size   : new fw.vec(100, 100),
                margin : 10
            })
        })
        
        model.on('destroy', item => {
            item.layer.animate({}, {
                margin : {x: -item.layer.size.x / 2},
                scale  : {x: 0}
            },{
                destroy : true
            })
        })
    */

    init: function init(model) {
        var destroy = function destroy(layer) {
            layer.destroy();
        };
        var make = function make(item) {/* no initial value */};
        var methods = {
            on: function on(topic, callback) {
                if (topic == 'make') {
                    make = function make(item) {
                        var layer = callback(item);
                        layer.data = item;
                        Object.defineProperty(item, 'layer', {
                            value: layer,
                            enumerable: false
                        });
                    };
                    model.forEach(make);
                } else if (topic == 'destroy') destroy = callback;
                return model;
            },
            push: function push() {
                make(arguments[0]);
                Array.prototype.push.apply(this, arguments);
            },
            splice: function splice() {
                var deleted = Array.prototype.splice.apply(this, arguments);
                deleted.forEach(function (a) {
                    return destroy(a.layer);
                });
                return deleted;
            },
            find: function find(query) {
                return _index.arr.find(model, query);
            },
            delete: function _delete(query) {
                return _index.arr.delete(model, query);
            },
            filterMap: function filterMap(query) {
                return _index.arr.filterMap(model, query);
            }
        };
        for (var key in methods) {
            Object.defineProperty(model, key, { enumerable: false, value: methods[key] });
        }return model;
    },


    /*
        var boxes = fw.model.put({
            count : 10,
            model : {
                album  : fw.model.iterate(i => {return custom[i].album}),
                id     : '{type: int, mode: forward, from: 1}',
            },
            shuffle : [{
                someParam : 'testest'
            },{
                others : '{type: int, mode: random, min: 1, max: 10}',
                image  : '{type: image, source: local}' 
            }]
        })
    */

    put: function put(opt) {
        // modify values
        for (var key in opt.model) {
            var value = opt.model[key];
            // reset integer with count type
            if (value.type == 'expression' && value.expressions) value.expressions.forEach(function (expression) {
                // reset int expression if loop
                if (expression.method == 'int' && expression.mode == 'loop') expression.i = 0;
            });
        }
        // render content
        var model = [];
        for (var i = 0; i < (opt.count || 1); i++) {
            // copy raw model
            var property = this.render(opt.model);
            // make shuffle on model
            if ('shuffle' in opt) {
                var index = _index.math.randInt(0, opt.shuffle.length);
                Object.assign(property, this.render(opt.shuffle[index]));
            }
            // add rendered version of model to the output list
            model.push(property);
        }
        // make watchable
        return this.init(model);
    },
    render: function render(model) {
        var out = {};
        for (var key in model) {
            // init expression
            if (_index.val.isStr(model[key]) && model[key].match(/{.*?}/)) model[key] = this._parseExpressions(model[key]);
            // render value if expression
            if (model[key].type == 'expression') out[key] = model[key].render();
            // transfer value
            else out[key] = model[key];
        }
        return out;
    },
    _parseExpressions: function _parseExpressions(string) {
        var out = { type: 'expression', expressions: [] };
        // find all the queries and replace them with functions
        var string = string.replace(/{.*?}/g, function (match) {
            var query = {};
            // parse match
            match.replace(/{| |}/g, '').split(',').forEach(function (p) {
                p = p.split(':');
                query[p[0]] = parseInt(p[1]) || p[1];
            });
            // find method of this and push generated expression
            out.expressions.push(expressions[query.type](query));
            // save index of array {1}
            return '{' + (out.expressions.length - 1) + '}';
        });
        out.render = function () {
            var _this = this;

            // replace all {1} with expression result
            var result = string.replace(/{.*?}/g, function (i) {
                // bundle.expressions[{1}]
                return _this.expressions[i.match(/\d+/)[0]].render();
            });
            // convert to int if no characters
            return result.match(/[^\d+]/) ? result : parseInt(result);
        };
        return out;
    }
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(0);

exports.default = {
    ellipsis: function ellipsis(dom, lineCount, symbol) {
        // set target height
        dom.style.height = this.getLineHeight(dom) * lineCount + 'px';
        var domRect = dom.getBoundingClientRect();
        var multiColumn = _index.css.computed(dom, 'column-count') > 1;
        // check if iteration is necessary
        if (multiColumn && dom.scrollWidth > domRect.width + 1 || dom.scrollHeight > domRect.height + 1) {
            // init range selection
            var string = dom.firstChild;
            var length = dom.innerHTML.length;
            var range = document.createRange();
            range.setEnd(string, length);
            // search for position
            _index.math.binarySearch(length, function (i, end) {
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(0);

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
        value: function div(vec, set) {
            if (set) {
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
            if (_index.val.exists(this.x)) data.x = this.x + _unit;
            if (_index.val.exists(this.y)) data.y = this.y + _unit;
            if (_index.val.exists(this.z)) data.z = this.z + _unit;
            return data;
        }
    }, {
        key: 'ununit',
        value: function ununit() {
            if (_index.val.exists(this.x)) this.x = parseFloat(this.x);
            if (_index.val.exists(this.y)) this.y = parseFloat(this.y);
            if (_index.val.exists(this.z)) this.z = parseFloat(this.z);
            return this;
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (_index.val.exists(this.x)) this.x = 0;
            if (_index.val.exists(this.y)) this.y = 0;
            if (_index.val.exists(this.z)) this.z = 0;
            return this;
        }
    }, {
        key: 'log',
        value: function log(name) {
            var data = { x: this.x };
            if (_index.val.exists(this.y)) data.y = this.y;
            if (_index.val.exists(this.z)) data.z = this.z;
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
            return new Vec(fn({ dimension: 'x', value: this.x }), fn({ dimension: 'y', value: this.y }), fn({ dimension: 'z', value: this.z }));
        }
    }, {
        key: 'fill',
        value: function fill(value) {
            this.x = value;
            this.y = value;
            this.z = value;
            return this;
        }
    }, {
        key: 'mix',
        value: function mix(list) {
            var sum = new Vec();
            var len = 1;
            if (_index.val.isArr(list)) {
                len = list.length;
                for (var i = 0; i < len; i++) {
                    sum.add(list[i], true);
                }
            } else if (_index.val.isObj(list)) {
                len = Object.keys(list).length;
                for (var v in list) {
                    sum.add(list[v], true);
                }
            }
            return sum.div(new Vec().fill(len));
        }
    }, {
        key: 'range',
        value: function range(rect, set) {
            var range = _index.val.exists(rect.length) ? _index.val.isNum(rect.length) ? { x: rect.length, y: rect.length } : rect.length : { x: 100, y: 100 };
            rect.onLimit = rect.onLimit || {};
            var vec = new Vec(_index.math.rubberRange(this.x, rect.l, rect.r, range.x, rect.onLimit.x), _index.math.rubberRange(this.y, rect.t, rect.b, range.y, rect.onLimit.y));
            if (set) {
                this.x = vec.x;
                this.y = vec.y;
            } else return vec;
        }
    }]);

    return Vec;
}();

exports.default = Vec;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(22)(content, {});
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n  box-sizing: border-box; }\n\nhtml {\n  height: 100%; }\n  html body {\n    background-color: #1f2428;\n    perspective: 500px;\n    height: 100%; }\n\n.layer {\n  font-family: 'arial';\n  font-size: 13;\n  transition: box-shadow .2s; }\n  .layer.default {\n    position: relative;\n    display: inline-block;\n    width: 100px;\n    height: 100px;\n    background-color: rgba(255, 255, 255, 0.7);\n    background-size: cover;\n    background-position: center; }\n  .layer.drag {\n    box-shadow: 0 0 100px 0 rgba(0, 0, 0, 0.5) !important; }\n\n.scroller {\n  width: 100%;\n  height: 100%;\n  -webkit-scroll-snap-type: mandatory;\n  -webkit-scroll-snap-destination: 50% 50%; }\n  .scroller > .layer {\n    width: 100%;\n    height: 100%;\n    -webkit-scroll-snap-coordinate: 50% 50%; }\n  .scroller.x {\n    overflow-y: hidden;\n    white-space: nowrap; }\n    .scroller.x > .layer {\n      display: inline-block;\n      white-space: normal; }\n  .scroller.y {\n    overflow-x: hidden; }\n", ""]);

// exports


/***/ },
/* 21 */
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
/* 22 */
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
//# sourceMappingURL=index.js.map