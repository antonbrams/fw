


export default {

    hsva : class {

	    constructor (hue, saturation, value, alpha) {
		    this.hue 		= hue
		    this.saturation = saturation
		    this.value 		= value
		    this.alpha 		= alpha
		}

		get () {
	    	var trn = 100 - 50 * this.saturation;
		    return 'hsla('+
		    	360 * this.hue +', '+
		    	100 * this.saturation +'%, '+ 
		    	trn * this.value +'%, '+
		    	this.alpha + ')'
		}
    },

	rand (_alpha) {
		var rgb 	= () => {return parseInt(Math.random() * 200 + 55)}
		return  'rgba('+ rgb() +', '+ rgb() +', '+ rgb() +', '+ (_alpha? _alpha: 0.3) +')'
	},
}


