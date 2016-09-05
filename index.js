/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animation__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freespace__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_geometry__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_transformation__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_array__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vector__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_math__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_color__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_event__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_etc__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_style__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_text__ = __webpack_require__(11);
/* unused harmony reexport animation */
/* unused harmony reexport freespace */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2_geometry__, "a")) __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_2_geometry__["a"]; });
/* unused harmony reexport transform */
/* unused harmony reexport arr */
/* unused harmony reexport vec */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_6_math__, "a")) __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_6_math__["a"]; });
/* unused harmony reexport color */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_8_dom__, "a")) __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_8_dom__["a"]; });
/* unused harmony reexport event */
/* unused harmony reexport etc */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_11_style__, "a")) __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_11_style__["a"]; });
/* unused harmony reexport text */
















/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
	animation.play(0.5, 'linear', t => {
		dom.style.opacity = 1-t
	}, () => {
		obj.style.display = 'none'	
	})
*/

/* unused harmony default export */ var _unused_webpack_default_export = {

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

	fps: 60,
	jobs: new Array(),
	loop: false,

	Job: function Job(_duration, _easing, _onUpdate, _onEnd) {
		_classCallCheck(this, Job);

		this.onEnd = _onEnd;
		var start = new Date();
		_onUpdate(0.0);
		this.count = function () {
			var time = (new Date() - start) / 1000 / _duration;
			_onUpdate(time < 1.0 ? _easing(time) : 1.0);
			return time < 1.0 ? time : 1.0;
		};
	},

	start: function start() {
		var _this = this;

		// Start Loop
		this.loop = setInterval(function () {
			// Count Jobs
			var jobsTemp = new Array();
			for (var i = 0; i < _this.jobs.length; i++) {
				if (_this.jobs[i].count() == 1.0) {
					if (_this.jobs[i].onEnd) _this.jobs[i].onEnd();
				} else {
					jobsTemp.push(_this.jobs[i]);
				}
			}_this.jobs = jobsTemp;
			// If List is Empty > Stop Loop
			if (_this.jobs.length == 0) {
				clearInterval(_this.loop);
				_this.loop = null;
			}
		}.bind(this), 1000 / this.fps);
	},
	play: function play(_duration, _type, _onUpdate, _onEnd) {
		this.jobs.push(new this.Job(_duration, this.easing[_type], _onUpdate, _onEnd));
		if (!this.loop) this.start();
	}
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* unused harmony default export */ var _unused_webpack_default_export = {

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* unused harmony default export */ var _unused_webpack_default_export = {

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


/* harmony default export */ exports["a"] = {
	fromString: function fromString(html) {
		var parent = document.createElement('div');
		parent.innerHTML = html;
		return parent.firstChild;
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
		var _this = this;

		var clone = dom.cloneNode(true);
		clone.remove = function () {
			return _this.parentNode.removeChild(_this);
		};
		dom.parentNode.appendChild(clone);
		return clone;
	},
	getDimensions: function getDimensions(dom) {
		var _this2 = this;

		return {
			l: dom.offsetLeft,
			w: dom.offsetWidth,
			t: dom.offsetTop,
			h: dom.offsetHeight,
			r: function () {
				return _this2.l + _this2.w;
			}(),
			b: function () {
				return _this2.t + _this2.h;
			}()
		};
	}
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


/* unused harmony default export */ var _unused_webpack_default_export = {
	argExist: function argExist(_argument) {
		return typeof _argument !== 'undefined';
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fw__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/* unused harmony default export */ var _unused_webpack_default_export = {

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
			__WEBPACK_IMPORTED_MODULE_0_fw__["c" /* dom */].selection(false);
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
			__WEBPACK_IMPORTED_MODULE_0_fw__["c" /* dom */].selection(true);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fw__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/* unused harmony default export */ var _unused_webpack_default_export = {

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

	get: function get(_max, _boxes) {
		var boxes = new Array();
		var area = _max.w * _max.h;
		for (var nCell = 0; nCell < area; nCell++) {
			// Head
			var head = new this.box();
			head.l = nCell % _max.w;
			head.t = parseInt(nCell / _max.w);
			// Check only free Positions
			if (!this.collide(_boxes, head)) {
				// Expansion to Right and Bottom
				var expansion = { x: true, y: true };
				// Start Expansion to Right
				while (expansion.x) {
					// Start Expansion to Bottom
					while (expansion.y) {
						// Check future Ranges
						if (this.collide(_boxes, this.shift(head, 'y', 1)) || head.b() == _max.h) {
							// Stop expansion to Bottom
							expansion.y = false;
						} else {
							// Expand to Bottom
							head.h += 1;
						}
					}
					// Check current Range
					if (this.collide(_boxes, head) || head.r() > _max.w) {
						// Stop Expansion to Right
						expansion.x = false;
						boxes = this.detach(boxes);
					} else {
						// Start new Expansion to Bottom
						expansion.y = true;
						boxes = this.append(boxes, head);
						// Reset Height and Expand to Right
						head.h = 1;
						head.w += 1;
					}
				}
			}
		}
		boxes = this.filter(boxes);
		if (0) {
			this.test(boxes);
		}
		return boxes;
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
		prev = boxes.length - 2;
		last = boxes.length - 1;
		if (boxes[prev] && boxes[prev].h == boxes[last].h && boxes[prev].r() == boxes[last].r()) boxes.pop();
		return boxes;
	},
	filter: function filter(boxes) {
		var boxesLength = boxes.length;
		for (var i = 0; i < boxesLength; i++) {
			for (var n = 0; n < boxesLength; n++) {
				if (i != n && boxes[i] && boxes[n] && boxes[i].l <= boxes[n].l && boxes[i].r() >= boxes[n].r() && boxes[i].t <= boxes[n].t && boxes[i].b() >= boxes[n].b()) {
					boxes[n] = undefined;
				}
			}
		}
		return boxes.filter(function (_box) {
			return _box;
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
		var listLength = _list.length;
		for (var i = 0; i < listLength; i++) {
			if (__WEBPACK_IMPORTED_MODULE_0_fw__["a" /* geometry */].boxCollision(_list[i], _box)) return true;
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
		var rgb = function rgb() {
			return parseInt(Math.random() * 200 + 55);
		};
		for (var i = 0; i < box.length; i++) {
			var test = document.createElement("div");
			test.className = 'collider';
			test.style.backgroundColor = fw.getRandomColor();
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fw__ = __webpack_require__(0);




/* harmony default export */ exports["a"] = {
	viewPortOffset: function viewPortOffset(dom) {
		var params = dom.getBoundingClientRect();
		return {
			l: params.left,
			t: params.top
		};
	},
	offset: function offset(dom, parent) {
		var dom = _dom;
		var offset = { l: 0, t: 0 };
		var parent = parent || document.body;
		while (dom && dom.parentNode && dom != parent) {
			var position = {
				l: dom.offsetLeft,
				t: dom.offsetTop
			};
			var scroll = {
				l: dom.parentNode.scrollLeft,
				t: dom.parentNode.scrollTop
			};
			var margin = {
				l: __WEBPACK_IMPORTED_MODULE_0_fw__["b" /* style */].computed(dom, 'margin-left'),
				t: __WEBPACK_IMPORTED_MODULE_0_fw__["b" /* style */].computed(dom, 'margin-top')
			};
			offset.l += position.l - scroll.l - margin.l;
			offset.t += position.t - scroll.t - margin.t;
			dom = dom.parentNode;
		}
		return offset;
	},
	domCollision: function domCollision(a, b) {
		return this.boxCollision(__WEBPACK_IMPORTED_MODULE_0_fw__["c" /* dom */].getDimensions(a), __WEBPACK_IMPORTED_MODULE_0_fw__["c" /* dom */].getDimensions(b));
	},
	boxCollision: function boxCollision(a, b) {
		return a.l < b.l + b.w && a.t < b.t + b.h && b.l < a.l + a.w && b.t < a.t + a.h;
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


/* harmony default export */ exports["a"] = {
	map: function map(value, aMin, aMax, bMin, bMax, clamp) {
		var x = clamp == true ? value < aMin ? aMin : value > aMax ? aMax : value : value;
		return (x - aMin) / (aMax - aMin) * (bMax - bMin) + bMin;
	},


	// Binary Search
	binarySearch: function binarySearch(max, min, check, set) {
		var target = length = max;
		while (length >= min) {
			length *= 0.5;
			target += length * (check() ? 1 : -1);
			set(target);
		}
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
	getValueBySize: function getValueBySize(value, sizes) {
		var lineCounts = null;
		for (var i = 0; i < sizes.length; i++) {
			if (value >= sizes[i][0]) lineCounts = sizes[i][1];
		}return lineCounts;
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


/* harmony default export */ exports["a"] = {
	computed: function computed(dom, prop) {
		return parseInt(document.defaultView.getComputedStyle(dom, null).getPropertyValue(prop));
	},


	vendor: function () {
		var getSupportedPropertyName = function getSupportedPropertyName(properties) {
			if (typeof document !== "undefined") {
				var div = document.createElement('div');
				properties.forEach(function (property) {
					if (typeof div.style[property] !== 'undefined') return property;
				});
			}
		};
		return {
			transform: getSupportedPropertyName(['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform']),
			origin: getSupportedPropertyName(['transformOrigin', 'msTransformOrigin', 'webkitTransformOrigin', 'mozTransformOrigin', 'oTransformOrigin']),
			columnCount: getSupportedPropertyName(['columnCount', 'msColumnCount', 'webkitColumnCount', 'mozColumnCount', 'oColumnCount'])
		};
	}()
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fw__ = __webpack_require__(0);




/* unused harmony default export */ var _unused_webpack_default_export = {
	ellipsis: function ellipsis(dom, text, ellpsis, check) {
		dom.innerHTML = text;
		if (!check()) {
			var words = text.split(' ');
			var length = words.length;
			var set = function set(_i) {
				dom.innerHTML = words.slice(0, _i).join(' ') + ellpsis;
			};
			for (var i = 0; i < length; i++) {
				set(i);
				if (!check()) {
					set(i - 1);
					break;
				}
			}
		}
	},
	lineCount: function lineCount(dom) {
		return dom.offsetHeight / parseInt(__WEBPACK_IMPORTED_MODULE_0_fw__["b" /* style */].computed(dom, 'line-height'));
	},
	capitalize: function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	hash: function hash(string) {
		var hash = 0;
		for (i = 0; i < string.length; i++) {
			hash += string.charCodeAt(i);
		}return hash;
	}
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fw__ = __webpack_require__(0);




/* unused harmony default export */ var _unused_webpack_default_export = function (element) {

	// Methods
	var setTransformation = function setTransformation(dom) {
		var translate = 'translate(' + dom.value.translation.x + 'px, ' + dom.value.translation.y + 'px)';
		var scale = 'scale(' + dom.value.scale.x + ',   ' + dom.value.scale.y + ')';
		dom.style[__WEBPACK_IMPORTED_MODULE_0_fw__["b" /* style */].vendorPrefix + 'Transform'] = translate + ' ' + scale;
	};

	var setOrigin = function setOrigin(dom) {
		dom.style[__WEBPACK_IMPORTED_MODULE_0_fw__["b" /* style */].vendorPrefix + 'TransformOrigin'] = dom.value.origin.x + ' ' + dom.value.origin.y;
	};

	// Store Values
	element.value = {
		origin: { x: 0, y: 0 },
		translation: { x: 0, y: 0 },
		scale: { x: 1, y: 1 },
		rotation: { z: 0 }
	};

	// Origin
	element.originXY = function (x, y) {
		this.value.origin.x = x;
		this.value.origin.y = y;
		setOrigin(this);
		return this;
	};

	element.originX = function (value) {
		this.value.origin.x = value;
		setOrigin(this);
		return this;
	};

	element.originY = function (value) {
		this.value.origin.y = value;
		setOrigin(this);
		return this;
	};

	// Translate
	element.translateXY = function (x, y) {
		this.value.translation.x = x;
		this.value.translation.y = y;
		setTransformation(this);
		return this;
	};

	element.translateX = function (value) {
		this.value.translation.x = value;
		setTransformation(this);
		return this;
	};

	element.translateY = function (value) {
		this.value.translation.y = value;
		setTransformation(this);
		return this;
	};

	// Scale
	element.scale = function (value) {
		this.value.scale.x = this.value.scale.y = value;
		setTransformation(this);
		return this;
	};

	element.scaleXY = function (x, y) {
		this.value.scale.x = x;
		this.value.scale.y = y;
		setTransformation(this);
		return this;
	};

	element.scaleX = function (value) {
		this.value.scale.x = value;
		setTransformation(this);
		return this;
	};

	element.scaleY = function (value) {
		this.value.scale.y = value;
		setTransformation(this);
		return this;
	};

	// Rotate
	element.rotate = function (value) {
		this.value.rotation.z = value;
		setTransformation(this);
		return this;
	};
};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
								console.log('vector not cutted');
				}

				_createClass(Vec, [{
								key: 'copy',
								value: function copy() {
												return new Vec(this.x, this.y, this.z);
								}
				}, {
								key: 'add',
								value: function add(vec, set) {
												if (set) {
																this.x += vec.x;
																this.y += vec.y;
																this.z += vec.z;
																return this;
												} else return new Vec(this.x + vec.x, this.y + vec.y, this.z + vec.z);
								}
				}, {
								key: 'sub',
								value: function sub(vec, set) {
												if (set) {
																this.x -= vec.x;
																this.y -= vec.y;
																this.z -= vec.z;
																return this;
												} else return new Vec(this.x - vec.x, this.y - vec.y, this.z - vec.z);
								}
				}, {
								key: 'len',
								value: function len() {
												return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
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
												} else var len = 1 / this.len();
												return new Vec(this.x * len, this.y * len, this.z * len);
								}
				}, {
								key: 'resize',
								value: function resize(len) {
												var norm = this.getNorm();
												return new Vec(norm.x * len, norm.y * len, norm.z * len);
								}
				}, {
								key: 'getTween',
								value: function getTween(vec, i) {
												return new Vec(i * (vec.x - this.x) + this.x, i * (vec.y - this.y) + this.y, i * (vec.z - this.z) + this.z);
								}
				}, {
								key: 'getAngle2D',
								value: function getAngle2D() {
												return Math.atan2(this.x, this.y) * 180 / Math.PI;
								}
				}]);

				return Vec;
}();

/* unused harmony default export */ var _unused_webpack_default_export = Vec;
;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fw__ = __webpack_require__(0);


setInterval(function () {
  return console.log(__WEBPACK_IMPORTED_MODULE_0_fw__["d" /* math */]);
}, 1000);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGRhMGRkZDI0YmVkZGQ2MzEwMzEiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL2Z3LmpzIiwid2VicGFjazovLy8vVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9hbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL2FycmF5LmpzIiwid2VicGFjazovLy8vVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9jb2xvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2FudG9ua2x1ZXYvRGVza3RvcC9EZXYvd2ViL2xpYnMvZncvMy4wLjAvZG9tLmpzIiwid2VicGFjazovLy8vVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9ldGMuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL2V2ZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9mcmVlc3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL2dlb21ldHJ5LmpzIiwid2VicGFjazovLy8vVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9tYXRoLmpzIiwid2VicGFjazovLy8vVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9zdHlsZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2FudG9ua2x1ZXYvRGVza3RvcC9EZXYvd2ViL2xpYnMvZncvMy4wLjAvdGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2FudG9ua2x1ZXYvRGVza3RvcC9EZXYvd2ViL2xpYnMvZncvMy4wLjAvdHJhbnNmb3JtYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL3ZlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDWEE7Ozs7Ozs7O0FBUUEseUVBQWU7O0FBRWQsU0FBUztBQUVSLFFBRlEsa0JBRUEsQ0FGQSxFQUVHO0FBQ1YsVUFBTyxDQUFQO0FBQ0EsR0FKTztBQU1MLGFBTkssdUJBTVEsQ0FOUixFQU1XO0FBQ2hCLFVBQU8sSUFBSSxLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBQyxFQUFELEdBQU0sQ0FBbEIsQ0FBWDtBQUNGLEdBUk87QUFVUixZQVZRLHNCQVVJLENBVkosRUFVTztBQUNkLFVBQU8sS0FBSyxHQUFMLENBQVMsS0FBSyxLQUFLLEVBQUwsR0FBUSxDQUFiLENBQVQsQ0FBUDtBQUNBLEdBWk87QUFjUixhQWRRLHVCQWNLLENBZEwsRUFjUTtBQUNmLFVBQU8sS0FBRyxJQUFF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QUFLLEdBQUwsRUFBZDtBQUNHLHFCQUFLLENBQUwsSUFBVSxHQUFWO0FBQ0EscUJBQUssQ0FBTCxJQUFVLEdBQVY7QUFDQSxxQkFBSyxDQUFMLElBQVUsR0FBVjtBQUNBLHVCQUFPLElBQVA7QUFDSCxhQU5ELE1BT0MsSUFBSSxNQUFNLElBQUksS0FBSyxHQUFMLEVBQWQ7QUFDRyxtQkFBTyxJQUFJLEdBQUosQ0FDSCxLQUFLLENBQUwsR0FBUyxHQUROLEVBRUgsS0FBSyxDQUFMLEdBQVMsR0FGTixFQUdILEtBQUssQ0FBTCxHQUFTLEdBSE4sQ0FBUDtBQUtKOzs7K0JBRU8sRyxFQUFLO0FBQ1QsZ0JBQUksT0FBTyxLQUFLLE9BQUwsRUFBWDtBQUNBLG1CQUFPLElBQUksR0FBSixDQUNILEtBQUssQ0FBTCxHQUFTLEdBRE4sRUFFSCxLQUFLLENBQUwsR0FBUyxHQUZOLEVBR0gsS0FBSyxDQUFMLEdBQVMsR0FITixDQUFQO0FBS0g7OztpQ0FFUyxHLEVBQUssQyxFQUFHO0FBQ2pCLG1CQUFPLElBQUksR0FBSixDQUNOLEtBQUssSUFBSSxDQUFKLEdBQVEsS0FBSyxDQUFsQixJQUF1QixLQUFLLENBRHRCLEVBRU4sS0FBSyxJQUFJLENBQUosR0FBUSxLQUFLLENBQWxCLElBQXVCLEtBQUssQ0FGdEIsRUFHTixLQUFLLElBQUksQ0FBSixHQUFRLEtBQUssQ0FBbEIsSUFBdUIsS0FBSyxDQUh0QixDQUFQO0FBS0E7OztxQ0FFYTtBQUNiLG1CQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssQ0FBaEIsRUFBbUIsS0FBSyxDQUF4QixJQUE2QixHQUE3QixHQUFtQyxLQUFLLEVBQS9DO0FBQ0E7Ozs7Ozt5RUFsR2dCLEc7QUFtR3BCLEM7Ozs7Ozs7O0FDdEdEOztBQUVBLFlBQVk7QUFBQSxTQUFNLFFBQVEsR0FBUixDQUFZLGdEQUFaLENBQU47QUFBQSxDQUFaLEVBQXFDLElBQXJDLEUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9yeSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb3J5IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGRhMGRkZDI0YmVkZGQ2MzEwMzEiLCJcblxuXG5leHBvcnQge2RlZmF1bHQgYXMgYW5pbWF0aW9ufVx0ZnJvbSAnYW5pbWF0aW9uJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIGZyZWVzcGFjZX1cdGZyb20gJ2ZyZWVzcGFjZSdcbmV4cG9ydCB7ZGVmYXVsdCBhcyBnZW9tZXRyeX0gICBcdGZyb20gJ2dlb21ldHJ5J1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRyYW5zZm9ybX1cdGZyb20gJ3RyYW5zZm9ybWF0aW9uJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIGFycn0gXHRcdGZyb20gJ2FycmF5J1xuZXhwb3J0IHtkZWZhdWx0IGFzIHZlY30gXHRcdGZyb20gJ3ZlY3RvcidcbmV4cG9ydCB7ZGVmYXVsdCBhcyBtYXRofSBcdFx0ZnJvbSAnbWF0aCdcbmV4cG9ydCB7ZGVmYXVsdCBhcyBjb2xvcn1cdFx0ZnJvbSAnY29sb3InXG5leHBvcnQge2RlZmF1bHQgYXMgZG9tfSAgICAgXHRmcm9tICdkb20nXG5leHBvcnQge2RlZmF1bHQgYXMgZXZlbnR9XHRcdGZyb20gJ2V2ZW50J1xuZXhwb3J0IHtkZWZhdWx0IGFzIGV0Y30gICAgIFx0ZnJvbSAnZXRjJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIHN0eWxlfVx0XHRmcm9tICdzdHlsZSdcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0ZXh0fSBcdFx0ZnJvbSAndGV4dCdcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gL1VzZXJzL2FudG9ua2x1ZXYvRGVza3RvcC9EZXYvd2ViL2xpYnMvZncvMy4wLjAvZncuanMiLCJcblxuXG4vKlxuXHRhbmltYXRpb24ucGxheSgwLjUsICdsaW5lYXInLCB0ID0+IHtcblx0XHRkb20uc3R5bGUub3BhY2l0eSA9IDEtdFxuXHR9LCAoKSA9PiB7XG5cdFx0b2JqLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcdFxuXHR9KVxuKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdGVhc2luZyA6IHtcblxuXHRcdGxpbmVhciAodCkge1xuXHRcdFx0cmV0dXJuIHRcblx0XHR9LFxuXG5cdCAgICBlYXNlT3V0RXhwbyAodCkgeyBcblx0XHQgICByZXR1cm4gMSAtIE1hdGgucG93KDIsIC0xMCAqIHQpXG5cdFx0fSxcblx0XHRcblx0XHRlYXNlSW5RdWFkICh0KSB7IFxuXHRcdFx0cmV0dXJuIE1hdGguc2luKHQgKiAoTWF0aC5QSS8yKSlcblx0XHR9LFxuXHRcdFxuXHRcdGVhc2VPdXRRdWFkICh0KSB7IFxuXHRcdFx0cmV0dXJuIHQqKDItdClcblx0XHR9LFxuXHRcdFx0XG5cdFx0ZWFzZUluT3V0UXVpbnQgKHQpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdHQgPCAwLjUgPyBcblx0XHRcdFx0MTYgKiBNYXRoLnBvdyh0LCA1KSA6ICgtLXQpICogXG5cdFx0XHRcdDE2ICogTWF0aC5wb3codCwgNCkgKyAxXG5cdFx0XHQpXG5cdFx0fSxcblx0XHRcblx0XHRlYXNlT3V0RWxhc3RpYyAodCkge1xuXHRcdFx0dmFyIHAgPSAwLjhcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdE1hdGgucG93KDIsIC0xMCAqIHQpICogXG5cdFx0XHRcdE1hdGguc2luKCh0IC0gcCAvIDQpICogKDIgKiBNYXRoLlBJKSAvIHApICsgMVxuXHRcdFx0KSBcblx0XHR9LFxuXHRcblx0XHRlYXNlT3V0Qm91bmNlICh0KSB7XG5cdFx0XHRcdCBpZiAodCA8IDEuMCAvIDIuNzUpIHsgcmV0dXJuIDcuNTYyNSAqIHQgKiAgdCB9XG5cdFx0XHRlbHNlIGlmICh0IDwgMi4wIC8gMi43NSkgeyByZXR1cm4gNy41NjI1ICogdCAqICh0IC09ICgxLjUwMCAvIDIuNzUpKSArIDAuNzUwMDAwIH0gXG5cdFx0XHRlbHNlIGlmICh0IDwgMi41IC8gMi43NSkgeyByZXR1cm4gNy41NjI1ICogdCAqICh0IC09ICgyLjI1MCAvIDIuNzUpKSArIDAuOTM3NTAwIH0gXG5cdFx0XHRlbHNlIFx0XHRcdFx0XHQgeyByZXR1cm4gNy41NjI1ICogdCAqICh0IC09ICgyLjYyNSAvIDIuNzUpKSArIDAuOTg0Mzc1IH1cblx0XHR9XG5cdH0sXG5cdFxuXHRmcHMgIDogNjAsXG5cdGpvYnMgOiBuZXcgQXJyYXkoKSxcblx0bG9vcCA6IGZhbHNlLFxuXG5cdEpvYiAgOiBjbGFzcyB7XG5cdFx0Y29uc3RydWN0b3IgKF9kdXJhdGlvbiwgX2Vhc2luZywgX29uVXBkYXRlLCBfb25FbmQpIHtcblx0XHRcdHRoaXMub25FbmRcdD0gX29uRW5kXG5cdFx0XHR2YXIgc3RhcnQgXHQ9IG5ldyBEYXRlKClcblx0XHRcdF9vblVwZGF0ZSgwLjApXG5cdFx0XHR0aGlzLmNvdW50ID0gKCkgPT4ge1xuXHRcdFx0XHR2YXIgdGltZSA9IChuZXcgRGF0ZSgpIC0gc3RhcnQpIC8gMTAwMCAvIF9kdXJhdGlvblxuXHRcdFx0XHRfb25VcGRhdGUodGltZSA8IDEuMD8gX2Vhc2luZyh0aW1lKTogMS4wKVxuXHRcdFx0XHRyZXR1cm4gdGltZSA8IDEuMD8gdGltZTogMS4wXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHN0YXJ0ICgpIHtcblx0XHQvLyBTdGFydCBMb29wXG5cdFx0dGhpcy5sb29wID0gc2V0SW50ZXJ2YWwoKCgpID0+IHtcblx0XHRcdC8vIENvdW50IEpvYnNcblx0XHRcdHZhciBqb2JzVGVtcCA9IG5ldyBBcnJheSAoKVx0XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuam9icy5sZW5ndGg7IGkgKyspXG5cdFx0XHRcdGlmICh0aGlzLmpvYnNbaV0uY291bnQoKSA9PSAxLjApIHtcblx0XHRcdFx0XHRpZiAodGhpcy5qb2JzW2ldLm9uRW5kKSB0aGlzLmpvYnNbaV0ub25FbmQoKVxuICAgIFx0XHRcdH0gZWxzZSB7XG5cdCAgICBcdFx0XHRqb2JzVGVtcC5wdXNoKHRoaXMuam9ic1tpXSlcbiAgICBcdFx0XHR9XG5cdFx0XHR0aGlzLmpvYnMgPSBqb2JzVGVtcFxuXHRcdFx0Ly8gSWYgTGlzdCBpcyBFbXB0eSA+IFN0b3AgTG9vcFxuXHRcdFx0aWYgKHRoaXMuam9icy5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHRjbGVhckludGVydmFsKHRoaXMubG9vcClcblx0XHRcdFx0dGhpcy5sb29wID0gbnVsbFxuXHRcdFx0fVxuXHRcdH0pLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLmZwcylcblx0fSxcblxuXHRwbGF5IChfZHVyYXRpb24sIF90eXBlLCBfb25VcGRhdGUsIF9vbkVuZCkge1xuXHRcdHRoaXMuam9icy5wdXNoKG5ldyB0aGlzLkpvYihcblx0XHRcdF9kdXJhdGlvbiwgXG5cdFx0XHR0aGlzLmVhc2luZ1tfdHlwZV0sIFxuXHRcdFx0X29uVXBkYXRlLFxuXHRcdFx0X29uRW5kXG5cdFx0KSlcblx0XHRpZiAoIXRoaXMubG9vcCkgdGhpcy5zdGFydCgpXG5cdH0sXG59XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL2FuaW1hdGlvbi5qcyIsIlxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBcbiAgICAvLyBzcGxpdFF1ZXJ5KCdwYXJlbnQuY2hpbGQuZWxlbWVudCcpXG4gICAgc3BsaXRRdWVyeSAocXVlcnkpIHtcbiAgICAgICAgdmFyIGxldmVscyA9IHF1ZXJ5LnNwbGl0KCcuJylcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxldmVsIDogbGV2ZWxzLFxuICAgICAgICAgICAgbGFzdCAgOiBsZXZlbHMubGVuZ3RoIC0gMVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGxldmVsKHtpZDogWzEwLCAxNV19LCBzcGxpdFF1ZXJ5KCdpZC4wJyksIDIwKTsgLT4ge2lkOiBbMjAsIDE1XX1cbiAgICBsZXZlbCAob2JqZWN0LCBxdWVyeSwgdmFsdWUpIHtcblx0ICAgIHZhciBwYXRoID0gb2JqZWN0XG5cdCAgICBmb3IgKHZhciBuID0gMDsgbiA8IHF1ZXJ5Lmxhc3Q7IG4gKyspXG5cdCAgICBcdHBhdGggPSBwYXRoW3F1ZXJ5LmxldmVsW25dXVxuXHQgICAgaWYgKHZhbHVlKSB7XG5cdFx0ICAgIHBhdGhbcXVlcnkubGV2ZWxbcXVlcnkubGFzdF1dID0gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHBhdGhbcXVlcnkubGV2ZWxbcXVlcnkubGFzdF1dXG5cdFx0fVxuICAgIH0sXG5cbiAgICAvLyBtYXAod29ya3NwYWNlcywgJ3dvcmtzcGFjZS5pdGVtcy4xJylcbiAgICBtYXAgKGFycmF5LCBxdWVyeSkge1xuICAgICAgICB2YXIgbGV2ZWxzID0gdGhpcy5zcGxpdFF1ZXJ5KHF1ZXJ5KVxuICAgICAgICByZXR1cm4gYXJyYXkubWFwKChsaXN0ID0+IHRoaXMubGV2ZWwobGlzdCwgbGV2ZWxzKSkuYmluZCh0aGlzKSlcbiAgICB9LFxuXG4gICAgLy8gdmFyIGJ1bmRsZSA9IGZpbmQod29ya3NwYWNlcywge2lkOiBpZH0pO1xuICAgIGZpbmQgKGFycmF5LCBxdWVyeSkge1xuXHQgICAgdmFyIG91dHB1dCA9IGFycmF5LnNsaWNlKClcbiAgICAgICAgZm9yICh2YXIgaSBpbiBxdWVyeSkge1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBbXVxuICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMubWFwKG91dHB1dCwgaSlcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgbWFwLmxlbmd0aDsgbiArKylcbiAgICAgICAgICAgICAgICBpZiAobWFwW25dID09IHF1ZXJ5W2ldKSB0ZW1wLnB1c2gob3V0cHV0W25dKVxuICAgICAgICAgICAgb3V0cHV0ID0gdGVtcC5zbGljZSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgIH0sXG5cbiAgICAvLyB2YXIgZGVsZXRlZCA9IGRlbCh3b3Jrc3BhY2VzLCB7J3RpdGxlLmNvbG9yJzogY29sb3J9KTtcbiAgICBkZWwgKGFycmF5LCBxdWVyeSkge1xuICAgICAgICB2YXIgZGVsZXRlZCA9IHRoaXMuZmluZChhcnJheSwgcXVlcnkpXG4gICAgICAgIGRlbGV0ZWQuZm9yRWFjaCgoZm91bmQpID0+IGFycmF5LnNwbGljZShhcnJheS5pbmRleE9mKGZvdW5kKSwgMSkpO1xuICAgICAgICByZXR1cm4gZGVsZXRlZDtcbiAgICB9LFxuXG5cdC8vIHVwZGF0ZUNvbHVtbihbe2lkOiAxNX0sIHtpZDogMzB9XSwge2lkOiBbMjAsIDE1XX0pOyAtPiBbe2lkOiAyMH0sIHtpZDogMTV9XVxuICAgIHVwZGF0ZUNvbHVtbiAoYXJyYXksIHF1ZXJ5KSB7XG5cdCAgICBmb3IgKHZhciBpIGluIHF1ZXJ5KSB7XG5cdCAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PSBxdWVyeVtpXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWxzID0gdGhpcy5zcGxpdFF1ZXJ5KGkpXG5cdCAgICAgICAgICAgIGFycmF5LmZvckVhY2goKChvYmplY3QsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsKG9iamVjdCwgbGV2ZWxzLCBxdWVyeVtpXVtpbmRleF0pKS5iaW5kKHRoaXMpKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaWZmZXJlbnQgbGVuZ2h0ZXMnKVxuXHQgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgLy9maWx0ZXJNYXAod29ya3NwYWNlcywge19pZCwgJ2lkJywgYWxpYXM6ICduYW1lJ30pO1xuICAgIGZpbHRlck1hcCAoYXJyYXksIGtleXMpIHtcbiAgICBcdHZhciBvdXRwdXQgPSBbXVxuICAgIFx0YXJyYXkuZm9yRWFjaCgob3JpZ2luYWwpID0+IHtcblx0ICAgIFx0dmFyIG9iamVjdCA9IHt9XG5cdCAgICBcdGZvciAodmFyIGtleSBpbiBrZXlzKSBcblx0ICAgIFx0XHRvYmplY3Rba2V5c1trZXldXSA9IG9yaWdpbmFsW2tleV1cblx0ICAgIFx0b3V0cHV0LnB1c2gob2JqZWN0KVxuICAgIFx0fSlcbiAgICBcdHJldHVybiBvdXRwdXRcbiAgICB9LFxuXHRcblx0Ly8gdmFyIGJ1ZmZlciA9IG5ldyBCdWZmZXIoMTApIHRoZW4gdmFyIHZhbHVlID0gYnVmZmVyLmdldCgyMy40NDUpIFxuICAgIGJ1ZmZlciA6IGNsYXNzIHtcblxuXHRcdGNvbnN0cnVjdG9yIChzaXplKSB7XG4gICAgICAgIFx0dGhpcy5hcnJheSAgPSBuZXcgQXJyYXkgKCk7XG4gICAgICAgIFx0dGhpcy5zaXplICAgPSBzaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHN1bSAgICA9IDA7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5hcnJheS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobGVuZ3RoID4gdGhpcy5zaXplKSB0aGlzLmFycmF5LnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLmFycmF5LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspIFxuICAgICAgICAgICAgXHRpZiAoaXNGaW5pdGUodGhpcy5hcnJheVtpXSkpIHN1bSArPSBwYXJzZUZsb2F0KHRoaXMuYXJyYXlbaV0pXG4gICAgICAgICAgICByZXR1cm4gc3VtIC8gbGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAvVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9hcnJheS5qcyIsIlxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGhzdmEgOiBjbGFzcyB7XG5cblx0ICAgIGNvbnN0cnVjdG9yIChodWUsIHNhdHVyYXRpb24sIHZhbHVlLCBhbHBoYSkge1xuXHRcdCAgICB0aGlzLmh1ZSBcdFx0PSBodWVcblx0XHQgICAgdGhpcy5zYXR1cmF0aW9uID0gc2F0dXJhdGlvblxuXHRcdCAgICB0aGlzLnZhbHVlIFx0XHQ9IHZhbHVlXG5cdFx0ICAgIHRoaXMuYWxwaGEgXHRcdD0gYWxwaGFcblx0XHR9XG5cblx0XHRnZXQgKCkge1xuXHQgICAgXHR2YXIgdHJuID0gMTAwIC0gNTAgKiB0aGlzLnNhdHVyYXRpb247XG5cdFx0ICAgIHJldHVybiAnaHNsYSgnK1xuXHRcdCAgICBcdDM2MCAqIHRoaXMuaHVlICsnLCAnK1xuXHRcdCAgICBcdDEwMCAqIHRoaXMuc2F0dXJhdGlvbiArJyUsICcrIFxuXHRcdCAgICBcdHRybiAqIHRoaXMudmFsdWUgKyclLCAnK1xuXHRcdCAgICBcdHRoaXMuYWxwaGEgKyAnKSdcblx0XHR9XG4gICAgfSxcblxuXHRyYW5kIChfYWxwaGEpIHtcblx0XHR2YXIgcmdiIFx0PSAoKSA9PiB7cmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAyMDAgKyA1NSl9XG5cdFx0cmV0dXJuICAncmdiYSgnKyByZ2IoKSArJywgJysgcmdiKCkgKycsICcrIHJnYigpICsnLCAnKyAoX2FscGhhPyBfYWxwaGE6IDAuMykgKycpJ1xuXHR9LFxufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAvVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9jb2xvci5qcyIsIlxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGZyb21TdHJpbmcgKGh0bWwpIHtcblx0XHR2YXIgcGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ICAgIHBhcmVudC5pbm5lckhUTUwgPSBodG1sXG5cdCAgICByZXR1cm4gcGFyZW50LmZpcnN0Q2hpbGRcblx0fSxcblxuXHQvLyBBZGQgRE9NIEVsZW1lbnQgYXQgQmVnaW4gb2YgdGhlIExpc3Rcblx0cHJlcGVuZCAocGFyZW50LCBjaGlsZCkge1xuICAgIFx0aWYgKHBhcmVudC5maXJzdENoaWxkKSBcbiAgICBcdFx0cGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgcGFyZW50LmZpcnN0Q2hpbGQpIFxuICAgIFx0ZWxzZSBcbiAgICBcdFx0cGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuXHR9LFxuXG5cdHNlbGVjdGlvbiAobW9kZSkge1xuXHRcdGRvY3VtZW50Lm9uZHJhZ3N0YXJ0ICAgPVxuXHRcdGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBtb2RlID8gbnVsbCA6ICgpID0+IGZhbHNlXG5cdH0sXG5cblx0Y2xvbmUgKGRvbSkge1xuXHRcdHZhciBjbG9uZSA9IGRvbS5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0Y2xvbmUucmVtb3ZlID0gKCkgPT4gdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG5cdFx0ZG9tLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRnZXREaW1lbnNpb25zIChkb20pIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bDogZG9tLm9mZnNldExlZnQsIFxuXHRcdFx0dzogZG9tLm9mZnNldFdpZHRoLFxuXHRcdFx0dDogZG9tLm9mZnNldFRvcCwgIFxuXHRcdFx0aDogZG9tLm9mZnNldEhlaWdodCxcblx0XHRcdHI6ICgoKSA9PiB0aGlzLmwgKyB0aGlzLncpKCksXG5cdFx0XHRiOiAoKCkgPT4gdGhpcy50ICsgdGhpcy5oKSgpXG5cdFx0fVxuXHR9LFxufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAvVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9kb20uanMiLCJcblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0YXJnRXhpc3QgKF9hcmd1bWVudCkge1xuXHRcdHJldHVybiB0eXBlb2YgX2FyZ3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXHR9LFxuXG5cdGNsb25lT2JqZWN0IChfb2JqZWN0KSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX29iamVjdCkpXG5cdH0sXG5cblx0cmVhZEZpbGUgKGZpbGUsIGNhbGxiYWNrKSB7XG5cdCAgICBpZiAoL1xcLihqcGU/Z3xwbmd8Z2lmKSQvaS50ZXN0KGZpbGUubmFtZSkpIHtcblx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cdFx0XHRyZWFkZXIub25sb2FkID0gKCkgPT4geyBcblx0XHRcdFx0Y2FsbGJhY2soe1xuXHRcdFx0XHRcdG5hbWU6IGZpbGUubmFtZSxcblx0XHRcdFx0XHRkYXRhOiB0aGlzLnJlc3VsdFxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSlcblx0ICAgIH1cblx0fSxcblxuXHRkcm9wRmlsZSAoem9uZSwgb25yZWFkeSkge1xuXHRcdHpvbmUub25kcmFnb3Zlclx0XHQ9ICgpID0+IHsgem9uZS5jbGFzc0xpc3QuYWRkKCdkcm9wJyk7IHJldHVybiBmYWxzZSB9XG5cdFx0em9uZS5vbmRyYWdsZWF2ZVx0PSAoKSA9PiB7IHpvbmUuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcCcpIH1cblx0XHR6b25lLm9uZHJvcCBcdFx0PSAoKCkgPT4ge1xuXHRcdFx0em9uZS5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wJylcblx0XHRcdHZhciBldmVudCBcdD0gd2luZG93LmV2ZW50XG5cdFx0XHR2YXIgZmlsZXMgXHQ9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXHRcdFx0dmFyIG91dHB1dFx0PSBbXVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkgKyspXG5cdFx0XHRcdHRoaXMucmVhZEZpbGUoZmlsZXNbaV0sIGZ1bmN0aW9uIChmaWxlKSB7XG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goZmlsZSk7XG5cdFx0XHRcdFx0aWYgKG91dHB1dC5sZW5ndGggPT0gZmlsZXMubGVuZ3RoKSBvbnJlYWR5KG91dHB1dClcblx0XHRcdFx0fSlcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblx0XHR9KS5iaW5kKHRoaXMpXG5cdH0sXG5cdFxuXHR1cGxvYWRGaWxlIChpbnB1dCwgb25yZWFkeSkge1xuXHRcdGlucHV0Lm9uY2hhbmdlID0gKCgpID0+IHtcblx0XHRcdHZhciBldmVudCBcdD0gd2luZG93LmV2ZW50XG5cdFx0XHR2YXIgZmlsZXMgXHQ9IGV2ZW50LnRhcmdldC5maWxlc1xuXHRcdFx0dmFyIG91dHB1dFx0PSBbXVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkgKyspXG5cdFx0XHRcdHRoaXMucmVhZEZpbGUoZmlsZXNbaV0sIGZ1bmN0aW9uIChmaWxlKSB7XG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goZmlsZSlcblx0XHRcdFx0XHRpZiAob3V0cHV0Lmxlbmd0aCA9PSBmaWxlcy5sZW5ndGgpIG9ucmVhZHkob3V0cHV0KVxuXHRcdFx0XHR9KVxuXHRcdH0pLmJpbmQodGhpcylcblx0fSxcblx0XG5cdGNvbXByZXNzSW1hZ2UgKGxpc3QsIHNjYWxlLCBxdWFsaXR5LCBjYWxsYmFjaykge1xuXHRcdHZhciBvdXRwdXQgPSBbXVxuXHRcdGxpc3QuZm9yRWFjaChkYXRhID0+IHtcblx0XHRcdHZhciBpbWFnZVx0XHQ9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG5cdFx0XHRpbWFnZS5vbmxvYWQgXHQ9ICgpID0+IHtcblx0XHRcdFx0dmFyIGNhbnZhcyBcdFx0PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRcdFx0XHR2YXIgY29udGV4dCBcdD0gY2FudmFzLmdldENvbnRleHQoJzJkJylcblx0XHRcdFx0dmFyIHdpZHRoIFx0XHQ9IHRoaXMud2lkdGggICogc2NhbGVcblx0XHRcdFx0dmFyIGhlaWdodCBcdFx0PSB0aGlzLmhlaWdodCAqIHNjYWxlXG5cdFx0XHRcdGNhbnZhcy53aWR0aCBcdD0gd2lkdGhcblx0XHRcdFx0Y2FudmFzLmhlaWdodCBcdD0gaGVpZ2h0XG5cdFx0XHQgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcywgMCwgMCwgd2lkdGgsIGhlaWdodClcblx0XHRcdCAgICBvdXRwdXQucHVzaChjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvanBlZ1wiLCBxdWFsaXR5KSlcblx0XHRcdCAgICBpZiAob3V0cHV0Lmxlbmd0aCA9PSBsaXN0Lmxlbmd0aCkgY2FsbGJhY2sob3V0cHV0KVxuXHRcdFx0fVxuXHRcdFx0aW1hZ2Uuc3JjID0gZGF0YVxuXHRcdH0pXG5cdH0sXG5cbi8qXG5cdGRlY29kZUJhc2U2NCAoZGF0YVN0cmluZykge1xuXHRcdGlmICh0eXBlb2YgQnVmZmVyICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHZhciBtYXRjaGVzID0gZGF0YVN0cmluZy5tYXRjaCgvXmRhdGE6KFtBLVphLXotK1xcL10rKTtiYXNlNjQsKC4rKSQvKVxuXHRcdFx0aWYgKG1hdGNoZXMubGVuZ3RoICE9PSAzKSByZXR1cm4gbmV3IEVycm9yKCdpbnZhbGlkIGlucHV0IHN0cmluZycpXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlIDogbWF0Y2hlc1sxXSxcblx0XHRcdFx0ZGF0YSA6IG5ldyBCdWZmZXIobWF0Y2hlc1syXSwgJ2Jhc2U2NCcpXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuKi9cbiAgICBcbiAgICBjb29raWUgOiB7XG5cblx0ICAgIGdldCAoY29va2llcykge1xuXHQgICAgICAgIHZhciBvYmplY3QgPSB7fVxuXHRcdFx0aWYgKGNvb2tpZXMpIHtcblx0XHQgICAgICAgIHZhciBwYXJhbXMgPSBjb29raWVzLnNwbGl0KCc7ICcpXG5cdFx0ICAgICAgICBwYXJhbXMuZm9yRWFjaChwYXJhbSA9PiB7XG5cdFx0ICAgICAgICAgICAgdmFyIGJ1bmRsZSA9IHBhcmFtLnNwbGl0KCc9Jylcblx0XHQgICAgICAgICAgICBvYmplY3RbYnVuZGxlWzBdXSA9IGJ1bmRsZVsxXVxuXHRcdCAgICAgICAgfSlcblx0XHQgICAgfVxuXHQgICAgICAgIHJldHVybiBvYmplY3Rcblx0ICAgIH0sXG5cdCAgICBcblx0ICAgIHNldCAoY29va2llcykge1xuXHQgICAgICAgIHZhciBzdHJpbmcgPSAnJ1xuXHQgICAgICAgIGZvciAodmFyIGtleSBpbiBjb29raWVzKSBzdHJpbmcgKz0ga2V5ICsnPScrIGNvb2tpZXNba2V5XSArJzsgJ1xuXHQgICAgICAgIHJldHVybiBzdHJpbmdcblx0ICAgIH0sXG5cdFxuXHQgICAgZGVsIChjb29raWVzLCBrZXkpIHtcblx0XHQgICAgY29va2llc1trZXldID0gJzsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAxIEdNVCdcblx0ICAgIH0sXG4gICAgfSxcblxuXHRzZWFyY2ggOiB7XG5cblx0XHRnZXQgKGFkZHJlc3MpIHtcblx0ICAgICAgICB2YXIgb2JqZWN0ID0ge31cblx0ICAgICAgICB2YXIgcXVlcnkgPSBhZGRyZXNzLnNwbGl0KCc/JylbMV1cblx0XHRcdGlmIChxdWVyeSAmJiBxdWVyeS5sZW5ndGggPiAwKSB7XG5cdFx0ICAgICAgICB2YXIgcGFyYW1zID0gcXVlcnkuc3BsaXQoJyYnKVxuXHRcdCAgICAgICAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuXHRcdCAgICAgICAgICAgIHZhciBidW5kbGUgPSBwYXJhbS5zcGxpdCgnPScpXG5cdFx0ICAgICAgICAgICAgb2JqZWN0W2J1bmRsZVswXV0gPSBidW5kbGVbMV1cblx0XHQgICAgICAgIH0pXG5cdFx0ICAgIH1cblx0ICAgICAgICByZXR1cm4gb2JqZWN0XG5cdCAgICB9LFxuXHRcblx0ICAgIHNldCAocXVlcnkpIHtcblx0ICAgICAgICB2YXIgc3RyaW5nID0gJydcblx0ICAgICAgICBmb3IgKHZhciBrZXkgaW4gcXVlcnkpXG5cdCAgICAgICAgICAgIHN0cmluZyArPSBrZXkgKyc9JysgcXVlcnlba2V5XSArXG5cdCAgICAgICAgICAgICAgICAoT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCA+IDE/ICcmJzogJycpXG5cdCAgICAgICAgcmV0dXJuIHN0cmluZ1xuXHQgICAgfSxcblx0fSxcblxuICAgIHRpbWVvdXQgOiBmdW5jdGlvbiAoZHVyYXRpb24sIGludGVydmFsLCBjaGVjaywgZXhlY3V0ZSwgdGltZW91dCkge1xuICAgICAgICB2YXIgY291bnRcdD0gZHVyYXRpb24gLyBpbnRlcnZhbDtcbiAgICAgICAgdmFyIGxvb3AgXHQ9IHNldEludGVydmFsICgoKSA9PiB7XG4gICAgICAgICAgICBjaGVjayAoc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGxvb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAoY291bnQgPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0KSB0aW1lb3V0KCk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChsb29wKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnQgLS07XG4gICAgICAgIH0sIGludGVydmFsICogMTAwMCk7XG4gICAgfSxcbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gL1VzZXJzL2FudG9ua2x1ZXYvRGVza3RvcC9EZXYvd2ViL2xpYnMvZncvMy4wLjAvZXRjLmpzIiwiXG5cblxuaW1wb3J0IHtkb20gYXMgZndEb219IGZyb20gJ2Z3J1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICB0eXBlIDogKCgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgdmFyIGlzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3dcblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0b3VjaDogIGlzVG91Y2gsXG5cdCAgICAgICAgICAgIGRvd246ICAgaXNUb3VjaD8gJ29udG91Y2hzdGFydCcgOiAnb25tb3VzZWRvd24nLFxuXHQgICAgICAgICAgICBtb3ZlOiAgIGlzVG91Y2g/ICdvbnRvdWNobW92ZScgIDogJ29ubW91c2Vtb3ZlJyxcblx0ICAgICAgICAgICAgdXA6ICAgICBpc1RvdWNoPyAnb250b3VjaGVuZCcgICA6ICdvbm1vdXNldXAnLFxuXHQgICAgICAgICAgICBvdXQ6XHQnb25tb3VzZWxlYXZlJ1xuXHQgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKCksXG5cbiAgICBkcmFnIChkb20sIGRvd24sIG1vdmUsIHVwKSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgIHZhciB0b3VjaHN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgZndEb20uc2VsZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgIHBhcmFtcy5ldmVudCA9IHRoaXMudHlwZS50b3VjaD9cbiAgICAgICAgICAgICAgICB3aW5kb3cuZXZlbnQudGFyZ2V0VG91Y2hlc1swXTpcbiAgICAgICAgICAgICAgICB3aW5kb3cuZXZlbnRcbiAgICAgICAgICAgIGRvd24ocGFyYW1zKVxuICAgICAgICAgICAgZG9tW3RoaXMudHlwZS5kb3duXSAgICAgICAgICAgID0gbnVsbFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keVt0aGlzLnR5cGUubW92ZV0gID0gdG91Y2htb3ZlLmJpbmQodGhpcylcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHlbdGhpcy50eXBlLnVwXSAgICA9IHRvdWNoZW5kLmJpbmQodGhpcylcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHlbdGhpcy50eXBlLm91dF0gICA9IHRvdWNoZW5kLmJpbmQodGhpcylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIHRvdWNobW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBwYXJhbXMuZXZlbnQgPSB0aGlzLnR5cGUudG91Y2g/XG4gICAgICAgICAgICAgICAgd2luZG93LmV2ZW50LnRhcmdldFRvdWNoZXNbMF06XG4gICAgICAgICAgICAgICAgd2luZG93LmV2ZW50XG4gICAgICAgICAgICBtb3ZlKHBhcmFtcylcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaGVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgXHRmd0RvbS5zZWxlY3Rpb24odHJ1ZSlcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHlbdGhpcy50eXBlLm1vdmVdICAgID0gbnVsbFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keVt0aGlzLnR5cGUudXBdICAgICAgPSBudWxsXG4gICAgICAgICAgICBkb21bdGhpcy50eXBlLmRvd25dICAgICAgICAgICAgICA9IHRvdWNoc3RhcnQuYmluZCh0aGlzKVxuICAgICAgICAgICAgdXAocGFyYW1zKVxuICAgICAgICB9XG4gICAgICAgIGRvbVt0aGlzLnR5cGUuZG93bl0gPSB0b3VjaHN0YXJ0LmJpbmQodGhpcylcbiAgICB9LFxuICAgIFxuXHRyZXNpemUgOiBjbGFzcyB7XG5cdFx0XG5cdFx0Y29uc3RydWN0b3IgKG9uRHJhZ1N0YXJ0LCBvbkRyYWdVcGRhdGUsIG9uRHJhZ1JlbGVhc2UpIHtcblx0XHRcdHRoaXMudGltZW91dCBcdFx0XHQ9IG51bGxcblx0XHRcdHRoaXMub25EcmFnU3RhcnRGbGFnIFx0PSBudWxsXG5cdFx0XHR0aGlzLm9uRHJhZ1N0YXJ0XHRcdD0gb25EcmFnU3RhcnRcblx0XHRcdHRoaXMub25EcmFnVXBkYXRlIFx0XHQ9IG9uRHJhZ1VwZGF0ZVxuXHRcdFx0dGhpcy5vbkRyYWdSZWxlYXNlIFx0XHQ9IG9uRHJhZ1JlbGVhc2Vcblx0XHR9XG5cblx0XHRjYWxsICgpIHtcblx0XHRcdHRoaXMuY2hlY2tTdGFydCgpXG5cdFx0XHRpZiAodGhpcy5vbkRyYWdVcGRhdGUpIHRoaXMub25EcmFnVXBkYXRlKClcblx0ICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxuXHQgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5vbkVuZC5iaW5kKHRoaXMpLCAyMDApXG5cdFx0fVxuXHRcdFxuXHRcdGNoZWNrU3RhcnQgKCkge1xuXHRcdFx0aWYgKCF0aGlzLm9uRHJhZ1N0YXJ0RmxhZykge1xuXHRcdFx0ICAgIHRoaXMub25EcmFnU3RhcnRGbGFnID0gdHJ1ZVxuXHRcdFx0ICAgIGlmICh0aGlzLm9uRHJhZ1N0YXJ0KSB0aGlzLm9uRHJhZ1N0YXJ0KClcblx0XHQgICAgfVxuXHRcdH1cblxuXHRcdG9uRW5kICgpIHtcblx0XHRcdGlmICh0aGlzLm9uRHJhZ1N0YXJ0RmxhZykge1xuXHRcdFx0XHR0aGlzLm9uRHJhZ1N0YXJ0RmxhZyA9IGZhbHNlXG5cdFx0XHRcdGlmICh0aGlzLm9uRHJhZ1JlbGVhc2UpIHRoaXMub25EcmFnUmVsZWFzZSgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAvVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC9ldmVudC5qcyIsIlxuXG5cbmltcG9ydCB7Z2VvbWV0cnkgYXMgZndHZW9tZXRyeX0gZnJvbSAnZncnXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuXHRib3ggOiBjbGFzcyB7XG5cdFx0Y29uc3RydWN0b3IgKCkge1xuXHRcdFx0dGhpcy5sID0gMFxuXHRcdFx0dGhpcy53ID0gMFxuXHRcdFx0dGhpcy50ID0gMCBcblx0XHRcdHRoaXMuaCA9IDBcblx0XHR9XG5cdFx0ciAoKSB7cmV0dXJuIHRoaXMubCArIHRoaXMud31cblx0XHRiICgpIHtyZXR1cm4gdGhpcy50ICsgdGhpcy5ofVxuXHR9LFxuXG5cdGdldCAoX21heCwgX2JveGVzKSB7XG5cdFx0dmFyIGJveGVzXHQ9IG5ldyBBcnJheSgpXG5cdFx0dmFyIGFyZWEgXHQ9IF9tYXgudyAqIF9tYXguaFxuXHRcdGZvciAodmFyIG5DZWxsID0gMDsgbkNlbGwgPCBhcmVhOyBuQ2VsbCArKykge1xuXHRcdFx0Ly8gSGVhZFxuXHRcdFx0dmFyIGhlYWQgXHQ9IG5ldyB0aGlzLmJveCgpXG5cdFx0XHRoZWFkLmwgXHRcdD0gbkNlbGwgJSBfbWF4Lndcblx0XHRcdGhlYWQudCBcdFx0PSBwYXJzZUludChuQ2VsbCAvIF9tYXgudylcblx0XHRcdC8vIENoZWNrIG9ubHkgZnJlZSBQb3NpdGlvbnNcblx0XHRcdGlmICghdGhpcy5jb2xsaWRlKF9ib3hlcywgaGVhZCkpIHtcblx0XHRcdFx0Ly8gRXhwYW5zaW9uIHRvIFJpZ2h0IGFuZCBCb3R0b21cblx0XHRcdFx0dmFyIGV4cGFuc2lvbiA9IHt4OiB0cnVlLCB5OiB0cnVlfVxuXHRcdFx0XHQvLyBTdGFydCBFeHBhbnNpb24gdG8gUmlnaHRcblx0XHRcdFx0d2hpbGUgKGV4cGFuc2lvbi54KSB7XHRcdFxuXHRcdFx0XHRcdC8vIFN0YXJ0IEV4cGFuc2lvbiB0byBCb3R0b21cblx0XHRcdFx0XHR3aGlsZSAoZXhwYW5zaW9uLnkpIHtcblx0XHRcdFx0XHRcdC8vIENoZWNrIGZ1dHVyZSBSYW5nZXNcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0dGhpcy5jb2xsaWRlKF9ib3hlcywgdGhpcy5zaGlmdChoZWFkLCAneScsIDEpKSB8fCBcblx0XHRcdFx0XHRcdFx0aGVhZC5iKCkgPT0gX21heC5oXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gU3RvcCBleHBhbnNpb24gdG8gQm90dG9tXG5cdFx0XHRcdFx0XHRcdGV4cGFuc2lvbi55ID0gZmFsc2Vcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIEV4cGFuZCB0byBCb3R0b21cbiAgICAgICAgICAgICAgICAgICAgICAgIFx0aGVhZC5oICs9IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgY3VycmVudCBSYW5nZVxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdHRoaXMuY29sbGlkZShfYm94ZXMsIGhlYWQpIHx8IFxuXHRcdFx0XHRcdFx0aGVhZC5yKCkgPiBfbWF4Lndcblx0XHRcdFx0XHQpIHtcdFxuXHRcdFx0XHRcdFx0Ly8gU3RvcCBFeHBhbnNpb24gdG8gUmlnaHRcblx0XHRcdFx0XHRcdGV4cGFuc2lvbi54ID0gZmFsc2Vcblx0XHRcdFx0XHRcdGJveGVzID0gdGhpcy5kZXRhY2goYm94ZXMpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIFN0YXJ0IG5ldyBFeHBhbnNpb24gdG8gQm90dG9tXG5cdFx0XHRcdFx0XHRleHBhbnNpb24ueSA9IHRydWVcblx0XHRcdFx0XHRcdGJveGVzID0gdGhpcy5hcHBlbmQoYm94ZXMsIGhlYWQpXG5cdFx0XHRcdFx0XHQvLyBSZXNldCBIZWlnaHQgYW5kIEV4cGFuZCB0byBSaWdodFxuXHRcdFx0XHRcdFx0aGVhZC5oICA9IDFcblx0XHRcdFx0XHRcdGhlYWQudyArPSAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGJveGVzID0gdGhpcy5maWx0ZXIoYm94ZXMpXG5cdFx0aWYgKDApIHsgdGhpcy50ZXN0KGJveGVzKSB9XG5cdFx0cmV0dXJuIGJveGVzXG5cdH0sXG5cblx0YXBwZW5kIChib3hlcywgaGVhZCkge1xuXHRcdHZhciBsYXN0ID0gYm94ZXMubGVuZ3RoIC0gMVxuXHRcdHZhciBib3ggID0gbmV3IHRoaXMuYm94KClcblx0XHRib3gubCA9IGhlYWQubDsgYm94LnQgPSBoZWFkLnRcblx0XHRib3gudyA9IGhlYWQudzsgYm94LmggPSBoZWFkLmhcblx0XHRpZiAoXG5cdFx0XHRib3hlc1tsYXN0XSAgICYmIFxuXHRcdFx0Ym94ZXNbbGFzdF0uaCA9PSBoZWFkLmggJiZcblx0XHRcdGJveGVzW2xhc3RdLmwgPT0gaGVhZC5sXG5cdFx0KVxuXHRcdFx0Ym94ZXNbbGFzdF0gPSBib3hcblx0XHRlbHNlXG5cdFx0XHRib3hlcy5wdXNoKGJveClcblx0XHRyZXR1cm4gYm94ZXNcblx0fSxcblx0XG5cdGRldGFjaCAoYm94ZXMpIHtcblx0XHRwcmV2ID0gYm94ZXMubGVuZ3RoIC0gMlxuXHRcdGxhc3QgPSBib3hlcy5sZW5ndGggLSAxXG5cdFx0aWYgKFxuXHRcdFx0Ym94ZXNbcHJldl0gICAgICYmIFxuXHRcdFx0Ym94ZXNbcHJldl0uaCBcdD09IGJveGVzW2xhc3RdLmggICAmJlxuXHRcdFx0Ym94ZXNbcHJldl0ucigpID09IGJveGVzW2xhc3RdLnIoKVxuXHRcdCkgYm94ZXMucG9wKClcblx0XHRyZXR1cm4gYm94ZXNcblx0fSxcblx0XG5cdGZpbHRlciAoYm94ZXMpIHtcblx0XHR2YXIgYm94ZXNMZW5ndGggPSBib3hlcy5sZW5ndGhcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJveGVzTGVuZ3RoOyBpICsrKSB7XG5cdFx0XHRmb3IgKHZhciBuID0gMDsgbiA8IGJveGVzTGVuZ3RoOyBuICsrKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQgaSAhPSBuICYmIFxuXHRcdFx0XHRcdGJveGVzW2ldICAgJiYgYm94ZXNbbl0gICAmJlxuXHRcdFx0XHRcdGJveGVzW2ldLmwgPD0gYm94ZXNbbl0ubCAmJiBib3hlc1tpXS5yKCkgPj0gYm94ZXNbbl0ucigpICYmXG5cdFx0XHRcdFx0Ym94ZXNbaV0udCA8PSBib3hlc1tuXS50ICYmIGJveGVzW2ldLmIoKSA+PSBib3hlc1tuXS5iKClcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Ym94ZXNbbl0gPSB1bmRlZmluZWRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYm94ZXMuZmlsdGVyKF9ib3ggPT4gX2JveClcblx0fSxcblxuXHRzaGlmdCAoaGVhZCwgZGlyZWN0aW9uLCB2YWx1ZSkge1xuXHRcdHZhciBwb2ludGVyID0gbmV3IHRoaXMuYm94KClcblx0XHRwb2ludGVyLmwgPSBoZWFkLmxcblx0XHRwb2ludGVyLnQgPSBoZWFkLnRcblx0XHRwb2ludGVyLncgPSBoZWFkLncgKyAoZGlyZWN0aW9uID09ICd4Jz8gdmFsdWU6IDApXG5cdFx0cG9pbnRlci5oID0gaGVhZC5oICsgKGRpcmVjdGlvbiA9PSAneSc/IHZhbHVlOiAwKVxuXHRcdHJldHVybiBwb2ludGVyXG5cdH0sXG5cblx0Y29sbGlkZSAobGlzdCwgYm94KSB7XG5cdFx0dmFyIGxpc3RMZW5ndGggPSBfbGlzdC5sZW5ndGhcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RMZW5ndGg7IGkgKyspIFxuXHRcdFx0aWYgKGZ3R2VvbWV0cnkuYm94Q29sbGlzaW9uKF9saXN0W2ldLCBfYm94KSkgcmV0dXJuIHRydWVcblx0XHRyZXR1cm4gZmFsc2Vcblx0fSxcblxuXHR0ZXN0IChib3gpIHtcblx0XHQvLyBEZWxldGUgT2xkIEJveGVzXHRcdFxuXHRcdHZhciBvbGRCb3hlcyA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29sbGlkZXInKVxuXHRcdHdoaWxlIChvbGRCb3hlcy5sZW5ndGggPiAwKSBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG9sZEJveGVzWzBdKVxuXHRcdC8vIENyZWF0ZSBOZXdcblx0XHR2YXIgc2hpZnRcdD0gKCkgPT4geyByZXR1cm4gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogZ2wuZ3JpZC5ndXR0ZXIgLyAyIH1cblx0XHR2YXIgcmdiIFx0PSAoKSA9PiB7IHJldHVybiBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMjAwICsgNTUpIH1cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJveC5sZW5ndGg7IGkgKyspIHtcblx0XHRcdHZhciB0ZXN0XHQ9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblx0XHRcdHRlc3QuY2xhc3NOYW1lID0gJ2NvbGxpZGVyJ1xuXHRcdFx0dGVzdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgXHQ9IGZ3LmdldFJhbmRvbUNvbG9yKClcblx0XHRcdHRlc3Quc3R5bGUucG9zaXRpb24gXHRcdD0gXCJhYnNvbHV0ZVwiXG5cdFx0XHR0ZXN0LnN0eWxlLmxlZnRcdFx0PSBzaGlmdCgpICsgZ2wuZ3JpZC5QVHRvUFgoYm94W2ldLmwgKyAxLCB0cnVlKVxuXHRcdFx0dGVzdC5zdHlsZS50b3AgXHRcdD0gc2hpZnQoKSArIGdsLmdyaWQuUFR0b1BYKGJveFtpXS50ICsgMSwgdHJ1ZSlcblx0XHRcdHRlc3Quc3R5bGUud2lkdGggXHQ9IHNoaWZ0KCkgKyBnbC5ncmlkLlBUdG9QWChib3hbaV0udywgZmFsc2UpXG5cdFx0XHR0ZXN0LnN0eWxlLmhlaWdodCBcdD0gc2hpZnQoKSArIGdsLmdyaWQuUFR0b1BYKGJveFtpXS5oLCBmYWxzZSlcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVzdClcblx0XHR9XG5cdH1cbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gL1VzZXJzL2FudG9ua2x1ZXYvRGVza3RvcC9EZXYvd2ViL2xpYnMvZncvMy4wLjAvZnJlZXNwYWNlLmpzIiwiXG5cblxuaW1wb3J0IHtcblx0c3R5bGVcdGFzIGZ3U3R5bGUsIFxuXHRkb20gIFx0YXMgZndEb21cbn0gZnJvbSAnZncnXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuXHR2aWV3UG9ydE9mZnNldCAoZG9tKSB7XG5cdFx0dmFyIHBhcmFtcyA9IGRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIFx0cmV0dXJuIHtcblx0ICAgIFx0bDogcGFyYW1zLmxlZnQsXG5cdCAgICBcdHQ6IHBhcmFtcy50b3BcbiAgICBcdH1cblx0fSxcblx0XG5cdG9mZnNldCAoZG9tLCBwYXJlbnQpIHtcblx0XHR2YXIgZG9tICAgID0gX2RvbVxuXHRcdHZhciBvZmZzZXQgPSB7bDogMCwgdDogMH1cbiAgICAgICAgdmFyIHBhcmVudCA9IHBhcmVudCB8fCBkb2N1bWVudC5ib2R5XG5cdFx0d2hpbGUgKGRvbSAmJiBkb20ucGFyZW50Tm9kZSAmJiBkb20gIT0gcGFyZW50KSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbDogZG9tLm9mZnNldExlZnQsXG4gICAgICAgICAgICAgICAgdDogZG9tLm9mZnNldFRvcFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNjcm9sbCA9IHtcbiAgICAgICAgICAgICAgICBsOiBkb20ucGFyZW50Tm9kZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHQ6IGRvbS5wYXJlbnROb2RlLnNjcm9sbFRvcFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hcmdpbiA9IHtcbiAgICAgICAgICAgICAgICBsOiBmd1N0eWxlLmNvbXB1dGVkKGRvbSwgJ21hcmdpbi1sZWZ0JyksXG4gICAgICAgICAgICAgICAgdDogZndTdHlsZS5jb21wdXRlZChkb20sICdtYXJnaW4tdG9wJyksXG4gICAgICAgICAgICB9XG5cdFx0XHRvZmZzZXQubCArPSBwb3NpdGlvbi5sIC0gc2Nyb2xsLmwgLSBtYXJnaW4ubFxuXHRcdFx0b2Zmc2V0LnQgKz0gcG9zaXRpb24udCAtIHNjcm9sbC50IC0gbWFyZ2luLnRcblx0XHRcdGRvbSA9IGRvbS5wYXJlbnROb2RlXG5cdFx0fVxuXHRcdHJldHVybiBvZmZzZXRcblx0fSxcbiAgICBcblx0ZG9tQ29sbGlzaW9uIChhLCBiKSB7XG5cdFx0cmV0dXJuIHRoaXMuYm94Q29sbGlzaW9uKFxuXHRcdFx0ZndEb20uZ2V0RGltZW5zaW9ucyhhKSxcblx0XHRcdGZ3RG9tLmdldERpbWVuc2lvbnMoYilcblx0XHQpXG5cdH0sXG5cblx0Ym94Q29sbGlzaW9uIChhLCBiKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGEubCA8IGIubCArIGIudyAmJiBhLnQgPCBiLnQgKyBiLmggJiZcblx0XHRcdGIubCA8IGEubCArIGEudyAmJiBiLnQgPCBhLnQgKyBhLmhcblx0XHQpXG5cdH0sXG5cbiAgICB2aWV3UG9ydFNpemUgKHcsIGgsIHdpblcsIHdpbkgsIG1hcmdpbiwgbWluV2lkdGhWYWwpIHtcblx0XHR2YXIgb3V0cHV0XHQgXHQ9IG5ldyBPYmplY3QoKVxuXHRcdHZhciBhc3BlY3RcdFx0PSB3IC8gaFxuXHRcdHZhciB3aW5IZWlnaHQgXHQ9IHdpbkggLSAyICogbWFyZ2luXG5cdFx0dmFyIGNhbGNIZWlnaHQgXHQ9IHdpblcgLyBhc3BlY3Rcblx0XHR2YXIgbWF4SGVpZ2h0ICBcdD0gXG5cdFx0XHR3aW5IZWlnaHQgXHQqIGFzcGVjdCA8IG1pbldpZHRoVmFsP1xuXHRcdFx0bWluV2lkdGhWYWwgLyBhc3BlY3Q6XG5cdFx0XHR3aW5IZWlnaHRcblx0XHRpZiAod2luVyA8IHcgJiYgY2FsY0hlaWdodCA8IG1heEhlaWdodCApIHtcblx0XHRcdG91dHB1dC53IFx0PSB3aW5XXG5cdFx0XHRvdXRwdXQuaCBcdD0gY2FsY0hlaWdodFxuXHRcdFx0b3V0cHV0Lm0gXHQ9IDBcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIG9yaWdDYWxjV2lkdGggXHQ9IG1heEhlaWdodCAqIGFzcGVjdFxuXHRcdFx0dmFyIG5vcm1DYWxjV2lkdGggXHQ9IG9yaWdDYWxjV2lkdGggPCB3PyBvcmlnQ2FsY1dpZHRoOiB3XG5cdFx0XHR2YXIgY2FsY1NpZGUgIFx0XHQ9ICh3aW5XIC0gbm9ybUNhbGNXaWR0aCkgLyAyXG5cdFx0XHRvdXRwdXQudyBcdD0gbm9ybUNhbGNXaWR0aFxuXHRcdFx0b3V0cHV0LmggXHQ9IG1heEhlaWdodCA8IGg/IG1heEhlaWdodDogaFxuXHRcdFx0b3V0cHV0Lm0gXHQ9IGNhbGNTaWRlICA8IG1hcmdpbj8gY2FsY1NpZGU6IG1hcmdpblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH0sXG59XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL2dlb21ldHJ5LmpzIiwiXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdG1hcCAodmFsdWUsIGFNaW4sIGFNYXgsIGJNaW4sIGJNYXgsIGNsYW1wKSB7XG5cdFx0dmFyIHggPSBjbGFtcCA9PSB0cnVlPyAoXG5cdFx0XHR2YWx1ZSA8IGFNaW4/IGFNaW46XG5cdFx0XHR2YWx1ZSA+IGFNYXg/IGFNYXg6IHZhbHVlXG5cdFx0KTogIHZhbHVlXG5cdFx0cmV0dXJuIChcblx0XHRcdCh4IC0gYU1pbikgLyBcblx0XHRcdChhTWF4IC0gYU1pbikgKiBcblx0XHRcdChiTWF4IC0gYk1pbikgKyBiTWluXG5cdFx0KVxuXHR9LFxuXG5cdC8vIEJpbmFyeSBTZWFyY2hcblx0YmluYXJ5U2VhcmNoIChtYXgsIG1pbiwgY2hlY2ssIHNldCkge1xuXHRcdHZhciB0YXJnZXQgPSBsZW5ndGggPSBtYXhcblx0XHR3aGlsZSAobGVuZ3RoID49IG1pbikge1xuXHRcdFx0bGVuZ3RoICo9IDAuNVxuXHRcdFx0dGFyZ2V0ICs9IGxlbmd0aCAqIChjaGVjaygpPyAxOiAtMSlcblx0XHRcdHNldCh0YXJnZXQpXG5cdFx0fVxuXHR9LFxuXHRcblx0bGluZWFySW50ZXJwb2xhdGlvbiAodCwgcG9pbnRzKSB7XG5cdFx0Ly8gSW5pdFxuXHRcdHZhciBwYXJhbXMgXHQ9IFtdXG5cdFx0dmFyIHggXHRcdD0gMFxuXHRcdC8vIEZpbmQgU2VjdG9yXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoIC0gMTsgaSArKykgXG5cdFx0XHRpZiAodCA+PSBwb2ludHNbaV1bMF0pIHggPSBpOyBlbHNlIGJyZWFrXG5cdFx0Ly8gRmluZCBMZWZ0IGFuZCBSaWdodCBTaWRlXG5cdFx0dmFyIGxWYWx1ZSA9IHBvaW50c1t4XVxuXHRcdHZhciByVmFsdWUgPSBwb2ludHNbeCsxXVxuXHRcdC8vIEludGVycG9sYXRlIFBhcmFtZXRlcnNcblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGxWYWx1ZS5sZW5ndGg7IGkgKyspXG5cdFx0XHRwYXJhbXMucHVzaCh0aGlzLm1hcCh0LCBsVmFsdWVbMF0sIHJWYWx1ZVswXSwgbFZhbHVlW2ldLCByVmFsdWVbaV0pKVxuXHRcdC8vIFJldHVyblxuXHRcdHJldHVybiBwYXJhbXNcblx0fSxcblxuXHRnZXRWYWx1ZUJ5U2l6ZSAodmFsdWUsIHNpemVzKSB7XG5cdFx0dmFyIGxpbmVDb3VudHMgID0gbnVsbFxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZXMubGVuZ3RoOyBpICsrKVxuXHRcdFx0aWYgXHQodmFsdWUgPj0gc2l6ZXNbaV1bMF0pIGxpbmVDb3VudHMgPSBzaXplc1tpXVsxXVxuXHRcdHJldHVybiBsaW5lQ291bnRzXG5cdH0sXG5cblx0cnViYmVyRWZmZWN0ICh2YWx1ZSwgbWluLCBtYXgsIHRocmVzaG9sZCwgc3RhdGUpIHtcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yXG4gICAgICAgIC8vIEJhc2VkIG9uIDEtcG93KDEreCwtMSlcblx0XHR2YXIgZmFjdG9yIFx0PSAxLjNcblx0XHR2YXIgbWF4VHJ1ZSA9IHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnXG5cdFx0dmFyIG1pblRydWUgPSB0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJ1xuXHRcdGlmIChtYXhUcnVlIHx8IG1pblRydWUpIHtcblx0XHRcdHZhciBkaXJlY3Rpb24gXHQ9IHZhbHVlIDwgbWF4XG5cdFx0XHR2YXIgdGhyZXNob2xkIFx0PSAoZGlyZWN0aW9uPyAxOiAtMSkgKiB0aHJlc2hvbGRcblx0XHRcdHZhciByYW5nZVx0XHQ9IGRpcmVjdGlvbj8gbWF4OiBtaW5cblx0XHRcdHZhciB4ID0gKHJhbmdlIC0gdmFsdWUpIC8gdGhyZXNob2xkXG5cdFx0XHR2YXIgeSA9IHJhbmdlIC0gdGhyZXNob2xkICogKDEgLSBNYXRoLnBvdygxICsgeCwgLWZhY3RvcikpXG5cdFx0fVxuXHRcdHZhciBtYXhTdGF0ZSA9IG1heFRydWUgJiYgdmFsdWUgPCBtYXhcblx0XHR2YXIgbWluU3RhdGUgPSBtaW5UcnVlICYmIHZhbHVlID4gbWluXG5cdFx0aWYgKHN0YXRlKSBzdGF0ZShtYXhTdGF0ZT8gJ21heCc6IG1pblN0YXRlPyAnbWluJzogbnVsbClcblx0XHRyZXR1cm4gKG1heFN0YXRlIHx8IG1pblN0YXRlPyB5OiB2YWx1ZSlcblx0fSxcbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gL1VzZXJzL2FudG9ua2x1ZXYvRGVza3RvcC9EZXYvd2ViL2xpYnMvZncvMy4wLjAvbWF0aC5qcyIsIlxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGNvbXB1dGVkIChkb20sIHByb3ApIHtcblx0ICAgIHJldHVybiBwYXJzZUludChcblx0ICAgIFx0ZG9jdW1lbnQuZGVmYXVsdFZpZXdcblx0ICAgIFx0LmdldENvbXB1dGVkU3R5bGUoZG9tLCBudWxsKVxuXHQgICAgXHQuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKVxuXHQgICAgKVxuXHR9LFxuXG5cdHZlbmRvciA6ICgoKSA9PiB7XG5cdFx0dmFyIGdldFN1cHBvcnRlZFByb3BlcnR5TmFtZSA9IHByb3BlcnRpZXMgPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdFx0cHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcblx0XHRcdCAgICAgICAgaWYgKHR5cGVvZiBkaXYuc3R5bGVbcHJvcGVydHldICE9PSAndW5kZWZpbmVkJykgXG5cdFx0XHQgICAgICAgIFx0cmV0dXJuIHByb3BlcnR5XG5cdFx0XHQgICAgfSlcblx0XHRcdH1cbiAgICBcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHJhbnNmb3JtIDogZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKFtcblx0XHRcdFx0J3RyYW5zZm9ybScsIFxuXHRcdFx0XHQnbXNUcmFuc2Zvcm0nLCBcblx0XHRcdFx0J3dlYmtpdFRyYW5zZm9ybScsIFxuXHRcdFx0XHQnbW96VHJhbnNmb3JtJywgXG5cdFx0XHRcdCdvVHJhbnNmb3JtJ1xuXHRcdFx0XSksXG5cdFx0XHRvcmlnaW4gOiBnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUoW1xuXHRcdFx0XHQndHJhbnNmb3JtT3JpZ2luJywgXG5cdFx0XHRcdCdtc1RyYW5zZm9ybU9yaWdpbicsIFxuXHRcdFx0XHQnd2Via2l0VHJhbnNmb3JtT3JpZ2luJywgXG5cdFx0XHRcdCdtb3pUcmFuc2Zvcm1PcmlnaW4nLCBcblx0XHRcdFx0J29UcmFuc2Zvcm1PcmlnaW4nXG5cdFx0XHRdKSxcblx0XHRcdGNvbHVtbkNvdW50IDogZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKFtcblx0XHRcdFx0J2NvbHVtbkNvdW50JywgXG5cdFx0XHRcdCdtc0NvbHVtbkNvdW50JywgXG5cdFx0XHRcdCd3ZWJraXRDb2x1bW5Db3VudCcsIFxuXHRcdFx0XHQnbW96Q29sdW1uQ291bnQnLCBcblx0XHRcdFx0J29Db2x1bW5Db3VudCdcblx0XHRcdF0pXG5cdFx0fVxuXHR9KSgpXG59XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL3N0eWxlLmpzIiwiXG5cblxuaW1wb3J0IHtzdHlsZSBhcyBmd1N0eWxlfSBmcm9tICdmdydcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFxuXHRlbGxpcHNpcyAoZG9tLCB0ZXh0LCBlbGxwc2lzLCBjaGVjaykge1xuXHRcdGRvbS5pbm5lckhUTUwgPSB0ZXh0XG5cdFx0aWYgKCFjaGVjaygpKSB7XG5cdFx0XHR2YXIgd29yZHMgXHQ9IHRleHQuc3BsaXQoJyAnKVxuXHRcdFx0dmFyIGxlbmd0aCBcdD0gd29yZHMubGVuZ3RoXG5cdFx0XHR2YXIgc2V0IFx0PSBmdW5jdGlvbiAoX2kpIHsgXG5cdFx0XHRcdGRvbS5pbm5lckhUTUwgPSB3b3Jkc1xuXHRcdFx0XHRcdC5zbGljZSgwLCBfaSlcblx0XHRcdFx0XHQuam9pbignICcpXG5cdFx0XHRcdFx0KyBlbGxwc2lzXG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArKykge1xuXHRcdFx0XHRzZXQoaSlcblx0XHRcdFx0aWYgXHQoIWNoZWNrKCkpIHsgXG5cdFx0XHRcdFx0c2V0KGktMSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGxpbmVDb3VudCAoZG9tKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGRvbS5vZmZzZXRIZWlnaHQgLyBcblx0XHRcdHBhcnNlSW50KGZ3U3R5bGUuY29tcHV0ZWQoZG9tLCAnbGluZS1oZWlnaHQnKSlcblx0XHQpXG5cdH0sXG5cblx0Y2FwaXRhbGl6ZSAoc3RyaW5nKSB7XG4gICAgXHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpXG5cdH0sXG5cblx0aGFzaCAoc3RyaW5nKSB7XG5cdCAgICB2YXIgaGFzaCA9IDBcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpICsrKSBcblx0ICAgIFx0aGFzaCArPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXHQgICAgcmV0dXJuIGhhc2hcblx0fVxufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAvVXNlcnMvYW50b25rbHVldi9EZXNrdG9wL0Rldi93ZWIvbGlicy9mdy8zLjAuMC90ZXh0LmpzIiwiXG5cblxuaW1wb3J0IHtzdHlsZSBhcyBmd1N0eWxlfSBmcm9tICdmdydcblxuZXhwb3J0IGRlZmF1bHQgZWxlbWVudCA9PiB7XG5cblx0Ly8gTWV0aG9kc1xuXHR2YXIgc2V0VHJhbnNmb3JtYXRpb24gPSBkb20gPT4ge1xuXHRcdHZhciB0cmFuc2xhdGUgXHQ9ICd0cmFuc2xhdGUoJysgZG9tLnZhbHVlLnRyYW5zbGF0aW9uLnggKydweCwgJysgZG9tLnZhbHVlLnRyYW5zbGF0aW9uLnkgKydweCknXG5cdFx0dmFyIHNjYWxlIFx0XHQ9IFx0ICAnc2NhbGUoJysgZG9tLnZhbHVlLnNjYWxlLnggXHQgICAgKycsICAgJysgZG9tLnZhbHVlLnNjYWxlLnkgKycpJ1xuXHRcdGRvbS5zdHlsZVtmd1N0eWxlLnZlbmRvclByZWZpeCArJ1RyYW5zZm9ybSddID0gdHJhbnNsYXRlICsnICcrIHNjYWxlXG5cdH1cblxuXHR2YXIgc2V0T3JpZ2luID0gZG9tID0+IHtcblx0XHRkb20uc3R5bGVbZndTdHlsZS52ZW5kb3JQcmVmaXggKydUcmFuc2Zvcm1PcmlnaW4nXSA9XG5cdFx0XHRkb20udmFsdWUub3JpZ2luLnggKycgJysgXG5cdFx0XHRkb20udmFsdWUub3JpZ2luLnlcblx0fVxuXG5cdC8vIFN0b3JlIFZhbHVlc1xuXHRlbGVtZW50LnZhbHVlID0ge1xuXHRcdCAgICAgb3JpZ2luOiB7eDogMCwgeTogMH0sXG5cdFx0dHJhbnNsYXRpb246IHt4OiAwLCB5OiAwfSxcblx0XHQgICAgICBzY2FsZToge3g6IDEsIHk6IDF9LFxuXHRcdCAgIHJvdGF0aW9uOiB7ejogMH1cblx0fVxuXG5cdC8vIE9yaWdpblxuXHRlbGVtZW50Lm9yaWdpblhZID0gZnVuY3Rpb24gKHgsIHkpIHtcblx0XHR0aGlzLnZhbHVlLm9yaWdpbi54ID0geFxuXHRcdHRoaXMudmFsdWUub3JpZ2luLnkgPSB5XG5cdFx0c2V0T3JpZ2luKHRoaXMpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXHRcblx0ZWxlbWVudC5vcmlnaW5YID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0dGhpcy52YWx1ZS5vcmlnaW4ueCA9IHZhbHVlXG5cdFx0c2V0T3JpZ2luKHRoaXMpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdGVsZW1lbnQub3JpZ2luWSA9IGZ1bmN0aW9uICh2YWx1ZSkge1x0XHRcblx0XHR0aGlzLnZhbHVlLm9yaWdpbi55ID0gdmFsdWVcblx0XHRzZXRPcmlnaW4odGhpcylcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0Ly8gVHJhbnNsYXRlXG5cdGVsZW1lbnQudHJhbnNsYXRlWFkgPSBmdW5jdGlvbiAoeCwgeSkge1xuXHRcdHRoaXMudmFsdWUudHJhbnNsYXRpb24ueCA9IHhcblx0XHR0aGlzLnZhbHVlLnRyYW5zbGF0aW9uLnkgPSB5XG5cdFx0c2V0VHJhbnNmb3JtYXRpb24odGhpcylcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cdFxuXHRlbGVtZW50LnRyYW5zbGF0ZVggPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHR0aGlzLnZhbHVlLnRyYW5zbGF0aW9uLnggPSB2YWx1ZVxuXHRcdHNldFRyYW5zZm9ybWF0aW9uKHRoaXMpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdGVsZW1lbnQudHJhbnNsYXRlWSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHRoaXMudmFsdWUudHJhbnNsYXRpb24ueSA9IHZhbHVlXG5cdFx0c2V0VHJhbnNmb3JtYXRpb24odGhpcylcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0Ly8gU2NhbGVcblx0ZWxlbWVudC5zY2FsZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHRoaXMudmFsdWUuc2NhbGUueCA9XG5cdFx0dGhpcy52YWx1ZS5zY2FsZS55ID0gdmFsdWVcblx0XHRzZXRUcmFuc2Zvcm1hdGlvbih0aGlzKVxuXHRcdHJldHVybiB0aGlzXG5cdH1cblx0XG5cdGVsZW1lbnQuc2NhbGVYWSA9IGZ1bmN0aW9uICh4LCB5KSB7XG5cdFx0dGhpcy52YWx1ZS5zY2FsZS54ID0geFxuXHRcdHRoaXMudmFsdWUuc2NhbGUueSA9IHlcblx0XHRzZXRUcmFuc2Zvcm1hdGlvbih0aGlzKVxuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHRlbGVtZW50LnNjYWxlWCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHRoaXMudmFsdWUuc2NhbGUueCA9IHZhbHVlXG5cdFx0c2V0VHJhbnNmb3JtYXRpb24odGhpcylcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0ZWxlbWVudC5zY2FsZVkgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHR0aGlzLnZhbHVlLnNjYWxlLnkgPSB2YWx1ZVxuXHRcdHNldFRyYW5zZm9ybWF0aW9uKHRoaXMpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdC8vIFJvdGF0ZVxuXHRlbGVtZW50LnJvdGF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHRoaXMudmFsdWUucm90YXRpb24ueiA9IHZhbHVlXG5cdFx0c2V0VHJhbnNmb3JtYXRpb24odGhpcylcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG59XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC9Vc2Vycy9hbnRvbmtsdWV2L0Rlc2t0b3AvRGV2L3dlYi9saWJzL2Z3LzMuMC4wL3RyYW5zZm9ybWF0aW9uLmpzIiwiXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjIHtcblxuICAgIGNvbnN0cnVjdG9yICh4ID0gMCwgeSA9IDAsIHogPSAwKSB7XG4gICAgICAgIHRoaXMueCA9IHhcbiAgICAgICAgdGhpcy55ID0geVxuICAgICAgICB0aGlzLnogPSB6XG5cdFx0Y29uc29sZS5sb2coJ3ZlY3RvciBub3QgY3V0dGVkJylcbiAgICB9XG5cbiAgICBjb3B5ICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWModGhpcy54LCB0aGlzLnksIHRoaXMueilcbiAgICB9XG5cbiAgICBhZGQgKHZlYywgc2V0KSB7XG5cdCAgICBpZiAoc2V0KSB7XG5cdCAgICAgICAgdGhpcy54ICs9IHZlYy54XG5cdCAgICAgICAgdGhpcy55ICs9IHZlYy55XG5cdCAgICAgICAgdGhpcy56ICs9IHZlYy56XG5cdCAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlXG5cdCAgICAgICAgcmV0dXJuIG5ldyBWZWMoXG5cdCAgICAgICAgICAgIHRoaXMueCArIHZlYy54LFxuXHQgICAgICAgICAgICB0aGlzLnkgKyB2ZWMueSxcblx0ICAgICAgICAgICAgdGhpcy56ICsgdmVjLnpcblx0ICAgICAgICApXG4gICAgfVxuXG4gICAgc3ViICh2ZWMsIHNldCkge1xuXHRcdGlmIChzZXQpwqB7ICAgXG5cdCAgICAgICAgdGhpcy54IC09IHZlYy54XG5cdCAgICAgICAgdGhpcy55IC09IHZlYy55XG5cdCAgICAgICAgdGhpcy56IC09IHZlYy56XG5cdCAgICAgICAgcmV0dXJuIHRoaXNcblx0XHR9IGVsc2Vcblx0ICAgICAgICByZXR1cm4gbmV3IFZlYyhcblx0ICAgICAgICAgICAgdGhpcy54IC0gdmVjLngsXG5cdCAgICAgICAgICAgIHRoaXMueSAtIHZlYy55LFxuXHQgICAgICAgICAgICB0aGlzLnogLSB2ZWMuelxuXHQgICAgICAgIClcbiAgICB9XG5cbiAgICBsZW4gKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54LCAyKSArXG4gICAgICAgICAgICBNYXRoLnBvdyh0aGlzLnksIDIpICtcbiAgICAgICAgICAgIE1hdGgucG93KHRoaXMueiwgMilcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHNjYWxlIChsZW4sIHNldCkge1xuXHQgICAgaWYgKHNldCkge1x0XG5cdFx0XHR0aGlzLnggKj0gbGVuXG5cdFx0XHR0aGlzLnkgKj0gbGVuXG5cdFx0XHR0aGlzLnogKj0gbGVuXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIG5ldyBWZWMoXG5cdCAgICAgICAgICAgIHRoaXMueCAqIGxlbixcblx0ICAgICAgICAgICAgdGhpcy55ICogbGVuLFxuXHQgICAgICAgICAgICB0aGlzLnogKiBsZW5cblx0ICAgICAgICApXG4gICAgfVxuXG4gICAgbm9ybSAoc2V0KSB7XG5cdCAgICBpZiAoc2V0KSB7XG5cdFx0ICAgIHZhciBsZW4gPSAxIC8gdGhpcy5sZW4oKVxuXHQgICAgICAgIHRoaXMueCAqPSBsZW5cblx0ICAgICAgICB0aGlzLnkgKj0gbGVuXG5cdCAgICAgICAgdGhpcy56ICo9IGxlblxuXHQgICAgICAgIHJldHVybiB0aGlzXG5cdCAgICB9IGVsc2Vcblx0XHQgICAgdmFyIGxlbiA9IDEgLyB0aGlzLmxlbigpXG5cdCAgICAgICAgcmV0dXJuIG5ldyBWZWMoXG5cdCAgICAgICAgICAgIHRoaXMueCAqIGxlbixcblx0ICAgICAgICAgICAgdGhpcy55ICogbGVuLFxuXHQgICAgICAgICAgICB0aGlzLnogKiBsZW5cblx0ICAgICAgICApXG4gICAgfVxuIFxuICAgIHJlc2l6ZSAobGVuKSB7XG4gICAgICAgIHZhciBub3JtID0gdGhpcy5nZXROb3JtKClcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMoXG4gICAgICAgICAgICBub3JtLnggKiBsZW4sXG4gICAgICAgICAgICBub3JtLnkgKiBsZW4sXG4gICAgICAgICAgICBub3JtLnogKiBsZW5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGdldFR3ZWVuICh2ZWMsIGkpIHtcbiAgICBcdHJldHVybiBuZXcgVmVjKFxuXHQgICAgXHRpICogKHZlYy54IC0gdGhpcy54KSArIHRoaXMueCxcblx0ICAgIFx0aSAqICh2ZWMueSAtIHRoaXMueSkgKyB0aGlzLnksXG5cdCAgICBcdGkgKiAodmVjLnogLSB0aGlzLnopICsgdGhpcy56XG4gICAgXHQpXG4gICAgfVxuXG4gICAgZ2V0QW5nbGUyRCAoKSB7XG5cdCAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLngsIHRoaXMueSkgKiAxODAgLyBNYXRoLlBJXG4gICAgfVxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gL1VzZXJzL2FudG9ua2x1ZXYvRGVza3RvcC9EZXYvd2ViL2xpYnMvZncvMy4wLjAvdmVjdG9yLmpzIiwiaW1wb3J0IHttYXRofSBmcm9tICdmdydcblxuc2V0SW50ZXJ2YWwoKCkgPT4gY29uc29sZS5sb2cobWF0aCksIDEwMDApXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=