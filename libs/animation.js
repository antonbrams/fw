


import {css, math, val} from './fw'

export default {

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

	flow (layer, time, ease, delay, next, end) {
		// will be deprecated
		var bang = () => {
			layer.dom.removeEventListener('transitionend', bang)
			layer.dom.style[css.vendor.transition] = null
			if (end) {
				if (val.isFn(end))
					end()
				else if (val.isObj(end))
					layer.set(end)
				end = null
			}
		}
		layer.dom.addEventListener('transitionend', bang)
		layer.dom.style[css.vendor.transition] = `${time}s ${ease} ${delay}s`
		setTimeout(() => {
			if (val.isFn(next))
				next()
			else if (val.isObj(next))
				layer.set(next)
		}, 0)
	},

	// Other Functions
	getSinus (from, to, speed) {
		var time = new Date().getTime() * 0.001;
		var sin  = Math.sin(time * (speed || 1))
		return math.map(sin, -1, 1, from, to)
	},

	easing : {

		linear (t) {
			return t
		},

	    easeOutExpo (t) { 
		   return 1 - Math.pow(2, -10 * t)
		},
		
		easeInQuad (t) { 
			return Math.sin(t * (Math.PI/2))
		},
		
		easeOutQuad (t) { 
			return t*(2-t)
		},
			
		easeInOutQuint (t) {
			return (
				t < 0.5 ? 
				16 * Math.pow(t, 5) : (--t) * 
				16 * Math.pow(t, 4) + 1
			)
		},
		
		easeOutElastic (t) {
			var p = 0.8
			return (
				Math.pow(2, -10 * t) * 
				Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1
			) 
		},
	
		easeOutBounce (t) {
				 if (t < 1.0 / 2.75) return 7.5625 * t *  t
			else if (t < 2.0 / 2.75) return 7.5625 * t * (t -= (1.500 / 2.75)) + 0.750000 
			else if (t < 2.5 / 2.75) return 7.5625 * t * (t -= (2.250 / 2.75)) + 0.937500
			else 					 return 7.5625 * t * (t -= (2.625 / 2.75)) + 0.984375
		}
	},

	/*
		animation.play(0.5, 'linear', t => {
			element.style.opacity = 1-t
		}, () => {
			obj.style.display = 'none'	
		})
	*/
	
	jobs   : [],
	active : false,

	Job : class {
		constructor (time, easing, loop, end) {
			this.end	= end || function () {}
			var start 	= new Date()
			loop(.0)
			this.run = () => {
				var clock = (new Date() - start) / 1000 / time
				loop(clock < 1.? easing(clock): 1.)
				return (clock < 1.? clock: 1.)
			}
		}
	},

	loop () {
		var jobs = []
		this.jobs.forEach(job => {
			if (job.run() == 1.)
				job.end()
			else 
				jobs.push(job)
		})
		this.jobs = jobs
		if (this.jobs.length > 0)
			window.requestAnimationFrame(this.loop.bind(this))
		else 
			this.active = null
	},

	play (time, type, loop, end) {
		this.jobs.push(new this.Job(
			time, this.easing[type], 
			loop, end
		))
		if (!this.active) {
			this.active = true
			window.requestAnimationFrame(this.loop.bind(this))
		}
	},
}


