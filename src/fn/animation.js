


import {css, vec, math, val, event} from '../index'


export default {
	
	animate (dom) {
		var name = `_${new Date().getTime()}`
		var keyframes = `@keyframes ${name} {
            to   {transform : translate(100%)}
        }`
		// from {transform : rotate(0.0deg)}
        document.styleSheets[0].insertRule(keyframes, 0)
        dom.style[css.vendor.animation] = `${name} 1s`
		var end = e => {
			if (e.animationName == name) {
				document.styleSheets[0].removeRule(name)
				dom.style[css.vendor.animation] = null
				dom.removeEventListener('animationend', end)
			}
		}
		dom.addEventListener('animationend', end)
	},
	
	/*
		fw.animation.request.on('move', () => {
			scroller.translate = pointer
		})
		fw.animation.request.draw()
	*/
	
	draw : (() => {
		var thread = true
		var jobs   = {}
		return (key, fn) => {
			jobs[key] = fn
			if (thread) {
				thread = false
				window.requestAnimationFrame(() => {
					thread = true
					for (var i in jobs) {jobs[i](); delete jobs[i]}
				})
			}
		}
	})(),
	
	/*
		dom.set({
			translate  : new fw.vec(0, -100),
		}).flow(1.5, 'ease', 1, {
			translate  : new fw.vec(0, 53.5),
		}, function () {
			console.log('done')
		})
	*/
	
	flow (layer, time, ease, delay, next, end) {
		onEnd = e => {
			layer.dom.removeEventListener('transitionend', onEnd)
			layer.dom.style[css.vendor.transition] = null
			if (end) {
				if (val.isFn(end)) 
					end()
				else if (val.isObj(end)) 
					layer.set(end)
				end = null
			}
		}
		layer.dom.addEventListener('transitionend', onEnd)
		layer.dom.style[css.vendor.transition] = `${time}s ${ease} ${delay}s`
		setTimeout(() => {
			if (val.isFn(next))
				next()
			else if (val.isObj(next))
				layer.set(next)
		}, 0)
	},
	
	jobs : (() => {
		var fps    = 60
		var active = false
		var jobs   = {}
		return (id, job) => {
			var running = id in jobs
			jobs[id] = job
			if (!active) {
				active = true
				var loop = setInterval(() => {
					for (var i in jobs) 
						if (jobs[i] && jobs[i]() === 'false') delete jobs[i]
					if (Object.keys(jobs).length == 0) {
						active = false
						clearTimeout(loop)
					}
				}, 1000 / fps)
			}
			return running
		}
	})(),
	
	// Other Functions
	getSinus (from, to, speed) {
		var time = new Date().getTime() * 0.001;
		var sin  = Math.sin(time * (speed || 1))
		return math.map(sin, -1, 1, from, to)
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
	
	decay (options, callback) {
		var id    = window.performance.now()
		var e     = new event.Machine('Decay', false)
		var types = {
			vec : {
				calculate : (a, b, c) => a.value.add(b.sub(a.value).scale(c), 1),
				isEqual   : (a, b, c) => math.isEqual(b.sub(a.value).len, c)
			},
			num : {
				calculate : (a, b, c) => a.value += (b - a.value) * c,
				isEqual   : (a, b, c) => math.isEqual(a.value, b, c)
			}
		}
		var value  = options.value || 0
		var job    = {value, type: types[value instanceof vec? 'vec': 'num']}
		var active = false
		callback(value)
		var out   = {
			to : value => {
				this.jobs(id, () => {
					if (!active) {
						job.type.calculate(job, value, options.speed || .1)
						callback(job.value)
						if (job.type.isEqual(job, value, options.float || 1)) {
							active = true
							e.emit('end')
						}
					}
					var stopped = !active
					active = false
					return stopped
				})
			},
			set value (value) {
				job.value = value
				callback(value)
			},
			get value () {
				return job.value
			},
			stop () {
				active = true
				e.emit('stop')
				return out
			},
			on (topic, fn) {
				e.on(topic, fn)
				return out
			},
			set debug (value) {e.debug = value}
		}
		return out
	},
	
	// easing : {
	// 
	// 	linear (t) {
	// 		return t
	// 	},
	// 
	//     easeOutExpo (t) { 
	// 	   return 1 - Math.pow(2, -10 * t)
	// 	},
	// 	
	// 	easeInQuad (t) { 
	// 		return Math.sin(t * (Math.PI/2))
	// 	},
	// 	
	// 	easeOutQuad (t) { 
	// 		return t*(2-t)
	// 	},
	// 		
	// 	easeInOutQuint (t) {
	// 		return (
	// 			t < 0.5 ? 
	// 			16 * Math.pow(t, 5) : (--t) * 
	// 			16 * Math.pow(t, 4) + 1
	// 		)
	// 	},
	// 	
	// 	easeOutElastic (t) {
	// 		var p = 0.8
	// 		return (
	// 			Math.pow(2, -10 * t) * 
	// 			Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1
	// 		) 
	// 	},
	// 
	// 	easeOutBounce (t) {
	// 			 if (t < 1.0 / 2.75) return 7.5625 * t *  t
	// 		else if (t < 2.0 / 2.75) return 7.5625 * t * (t -= (1.500 / 2.75)) + 0.750000 
	// 		else if (t < 2.5 / 2.75) return 7.5625 * t * (t -= (2.250 / 2.75)) + 0.937500
	// 		else 					 return 7.5625 * t * (t -= (2.625 / 2.75)) + 0.984375
	// 	}
	// },
	// 
	// /*
	// 	animation.play(0.5, 'linear', t => {
	// 		element.style.opacity = 1-t
	// 	}, () => {
	// 		obj.style.display = 'none'	
	// 	})
	// */
	// 
	// jobs   : [],
	// active : false,
	// 
	// Job : class {
	// 	constructor (time, easing, loop, end) {
	// 		this.end	= end || function () {}
	// 		var start 	= new Date()
	// 		loop(.0)
	// 		this.run = () => {
	// 			var clock = (new Date() - start) / 1000 / time
	// 			loop(clock < 1.? easing(clock): 1.)
	// 			return (clock < 1.? clock: 1.)
	// 		}
	// 	}
	// },
	// 
	// loop () {
	// 	var jobs = []
	// 	this.jobs.forEach(job => {
	// 		if (job.run() == 1.)
	// 			job.end()
	// 		else 
	// 			jobs.push(job)
	// 	})
	// 	this.jobs = jobs
	// 	if (this.jobs.length > 0)
	// 		window.requestAnimationFrame(this.loop.bind(this))
	// 	else 
	// 		this.active = null
	// },
	// 
	// play (time, type, loop, end) {
	// 	this.jobs.push(new this.Job(
	// 		time, this.easing[type], 
	// 		loop, end
	// 	))
	// 	if (!this.active) {
	// 		this.active = true
	// 		window.requestAnimationFrame(this.loop.bind(this))
	// 	}
	// },
}


