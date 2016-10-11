


/*
	animation.play(0.5, 'linear', t => {
		dom.style.opacity = 1-t
	}, () => {
		obj.style.display = 'none'	
	})
*/

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
	
	jobs : [],
	loop : false,

	Job  : class {
		constructor (time, easing, loop, end) {
			this.end	= end || function () {}
			var start 	= new Date()
			loop(0.0)
			this.run = () => {
				var time = (new Date() - start) / 1000 / time
				loop(time < 1.0? easing(time): 1.0)
				return (time < 1.0? time: 1.0)
			}
		}
	},
	
	loop () {
		var jobs = []
		this.jobs.forEach(job => {
			if (job.run() == 1.0)
				job.end()
			else 
				jobs.push(job)
		})
		this.jobs = jobs
		if (this.jobs.length > 0)
			window.requestAnimationFrame(this.loop.bind(this))
		else 
			this.loop = null
	},

	play (time, type, loop, end) {
		this.jobs.push(new this.Job(
				time, this.easing[type], 
				loop, end
		))
		if (!this.loop) {
			this.loop = true
			window.requestAnimationFrame(this.loop.bind(this))
		}
	},

	// Other Functions
	getSinus : function (from, to, speed) {
		var time 	= new Date().getTime() * 0.001;
		var sin		= Math.sin(time * (speed || 1))
		return 		this.root.math.map(sin, -1, 1, from, to)
	}
}


