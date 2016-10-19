


import {default as fwCss} from './css'

export default {

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
				 if (t < 1.0 / 2.75) { return 7.5625 * t *  t }
			else if (t < 2.0 / 2.75) { return 7.5625 * t * (t -= (1.500 / 2.75)) + 0.750000 } 
			else if (t < 2.5 / 2.75) { return 7.5625 * t * (t -= (2.250 / 2.75)) + 0.937500 } 
			else 					 { return 7.5625 * t * (t -= (2.625 / 2.75)) + 0.984375 }
		}
	},

	/*
		animation.play(0.5, 'linear', t => {
			dom.style.opacity = 1-t
		}, () => {
			obj.style.display = 'none'	
		})
	*/
	
	jobs   : [],
	active : false,

	Job  : class {
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

	// Other Functions
	getSinus : function (from, to, speed) {
		var time 	= new Date().getTime() * 0.001;
		var sin		= Math.sin(time * (speed || 1))
		return 		this.root.math.map(sin, -1, 1, from, to)
	},
	
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
	
	flow : function (dom) {
		dom.flow = function (time, ease, next, end) {
	        var bang = function () {
	            dom.removeEventListener('transitionend', bang)
	            dom.style[fwCss.vendor.transition] = null
	            if (end) {
	                if (typeof end === "function") 
						end() 
					else 
						if (dom.set) dom.set(end)
	                end = null
	            }
	        }
	        setTimeout(function () {
	            dom.addEventListener('transitionend', bang)
	            dom.style[fwCss.vendor.transition] = time +'s '+ ease
	            if (typeof next === "function") next(); else dom.set(next)
	        }, 0)
	    }
	    return dom
	}
}


