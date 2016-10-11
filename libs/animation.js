


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
	
	fps  : 60,
	jobs : new Array(),
	loop : false,

	Job  : class {
		constructor (_duration, _easing, _onUpdate, _onEnd) {
			this.onEnd	= _onEnd
			var start 	= new Date()
			_onUpdate(0.0)
			this.count = () => {
				var time = (new Date() - start) / 1000 / _duration
				_onUpdate(time < 1.0? _easing(time): 1.0)
				return time < 1.0? time: 1.0
			}
		}
	},

	start () {
		window.requestAnimationFrame(this.render)
	},
	
	render () {
		// Count Jobs
		var jobsTemp = new Array ()	
		for (var i = 0; i < this.jobs.length; i ++)
			if (this.jobs[i].count() == 1.0) {
				if (this.jobs[i].onEnd) 
					this.jobs[i].onEnd()
			} else 
				jobsTemp.push(this.jobs[i])
		this.jobs = jobsTemp
		// If List is Empty > Stop Loop
		if (this.jobs.length > 0) {
			window.requestAnimationFrame(this.render)
		} else {
			this.loop = null
		}
	},

	play (_duration, _type, _onUpdate, _onEnd) {
		this.jobs.push(new this.Job(
			_duration, 
			this.easing[_type], 
			_onUpdate,
			_onEnd
		))
		if (!this.loop) this.start()
	},

	// Other Functions
	getSinus : function (from, to, speed) {
		var time 	= new Date().getTime() * 0.001;
		var sin		= Math.sin(time * (speed || 1))
		return 		this.root.math.map(sin, -1, 1, from, to)
	}
}


