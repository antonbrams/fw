


import {val, text, math, etc} from './fw'

var assets = {
    signs : ['', ',', '.', '?', '!'],
    words : 'accusam aliquyam amet at clita consetetur diam dolor dolore dolores duo ea eirmod elitr eos erat est et gubergren invidunt ipsum justo kasd labore lorem magna no nonumy rebum sad sanctus sea sed sit stet takimata tempor ut vero voluptua'.split(' '),
    image : {
        mac : ['Abstract', 'Antelope Canyon', 'Bahamas Aerial', 'Beach', 'Blue Pond', 'Bristle Grass', 'Brushes', 'Circles', 'Death Valley', 'Desert', 'Ducks on a Misty Pond', 'Eagle & Waterfall', 'Earth and Moon', 'Earth Horizon', 'El Capitan 2', 'El Capitan', 'Elephant', 'Flamingos', 'Floating Ice', 'Floating Leaves', 'Foggy Forest', 'Forest in Mist', 'Foxtail Barley', 'Frog', 'Galaxy', 'Grass Blades', 'Hawaiian Print', 'Isles', 'Lake', 'Lion', 'Milky Way', 'Moon', 'Mountain Range', 'Mt. Fuji', 'Pink Forest', 'Pink Lotus Flower', 'Poppies', 'Red Bells', 'Rice Paddy', 'Rolling Waves', 'Shapes', 'Sierra 2', 'Sierra', 'Sky', 'Snow', 'Underwater', 'Wave', 'Yosemite 2', 'Yosemite 3', 'Yosemite 4', 'Yosemite 5', 'Yosemite', 'Zebras']
    }
}

class Expression {
    constructor (options) {
        if (val.isFn(options))
            this.render = options
        else if (val.isObj(options))
            for (var key in options)
                this[key] = options[key]
    }
}

export default {
    
    // int ({type: 'all', from: 1})
    // int ({type: 'count', from: 1})
    // int ({type: 'random', min: 1, max: 10})
    int (opt) {
        return new Expression({i: 0, method: 'int', type: opt.type, render () {
            return opt.type == 'forward' || opt.type == 'loop'?
                opt.from + this.i ++:
            opt.type == 'random'?
                Math.floor(math.to(Math.random(), opt.min, opt.max)):
                this.i
        }})
    },
    
    // str ({type: 'text', count: 20})
    // str ({type: 'text', min: 20, max 100})
    str (opt) {
        return new Expression(() => {
            var count = 
                opt.count? opt.count:
                Math.floor(math.to(Math.random(), opt.min, opt.max))
            var capitalize = true
            var sentence   = ''
            for (var i = 0; i < count; i ++) {
                var randomWord = assets.words[Math.floor(Math.random() * assets.words.length)]
                var signIndex  = Math.floor(Math.pow(Math.random(), 20) * assets.signs.length)
                var sign       = assets.signs[math.min(signIndex, i < count - 1? 0: 2)] + ' '
                var word       = capitalize? text.capitalize(randomWord): randomWord
                sentence += word + sign
                capitalize = signIndex > 1
            }
            return sentence.substring(0, sentence.length - 1)
        })
    },
    
    img (opt) {
        var source = {
            remote (i) {return `https://unsplash.it/500?image=${i}`},
            local  (i) {return `file:///Library/Desktop%20Pictures/${
                escape(assets.image.mac[i % assets.image.mac.length])}.jpg`}
        }
        return new Expression(() => {
            return source[opt.source](math.randInt(0, 1000))
        })
    },
    
    // get(i => {return custom[i]})
    merge (callback) {
        return new Expression({i: 0, render () {
            return callback(this.i ++)
        }})
    },
    
    put (opt) {
        var cycle = val.isArr(opt.count)
        return new Expression(() => {
            var length = cycle? opt.count[0]: (opt.count || 1)
            var get    = null
            var items  = []
            // modify values
            for (var key in opt.item)
                // reset integer with count type
                if (opt.item[key].method == 'int' && opt.item[key].type == 'loop')
                    opt.item[key].i = 0
            // render content
            for (var i = 0; i < length; i ++)
                items.push(this.render(opt.item))
            if (cycle) opt.count.shift()
            return items
        })
    },
    
    render (object) {
        var out = {}
        for (var i in object)
            if (object[i] instanceof Expression)
                out[i] = object[i].render()
            else
                out[i] = object[i]
        return out
    },
    
}


