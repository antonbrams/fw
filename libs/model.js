


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
    
    // int ({mode: 'all', from: 1})
    // int ({mode: 'count', from: 1})
    // int ({mode: 'random', min: 1, max: 10})
    int (opt) {
        return {i: 0, method: 'int', mode: opt.mode, render () {
            return opt.mode == 'forward' || opt.mode == 'loop'?
                opt.from + this.i ++:
            opt.mode == 'random'?
                Math.floor(math.to(Math.random(), opt.min, opt.max)):
                this.i
        }}
    },
    
    // str ({mode: 'text', count: 20})
    // str ({mode: 'text', min: 20, max 100})
    string (opt) {
        return {render () {
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
        }}
    },
    
    img (opt) {
        var source = {
            remote (i) {return `https://unsplash.it/500?image=${i}`},
            local  (i) {return `file:///Library/Desktop%20Pictures/${
                escape(assets.image.mac[i % assets.image.mac.length])}.jpg`}
        }
        return {render () {
            return source[opt.source](math.randInt(0, 1000))
        }}
    },
    
    // get(i => {return custom[i]})
    merge (callback) {
        return {type: 'expression', i: 0, render () {
            return callback(this.i ++)
        }}
    },
    
    put (opt) {
        var cycle = val.isArr(opt.count)
        return {type: 'expression', render: () => {
            var length = cycle? opt.count[0]: (opt.count || 1)
            var items  = []
            // modify values
            for (var key in opt.item)
                // reset integer with count type
                if (opt.item[key].type == 'expression' && opt.item[key].expressions)
                    opt.item[key].expressions.forEach(expression => {
                        if (expression.method == 'int' && expression.mode == 'loop')
                            expression.i = 0
                    })
            // render content
            for (var i = 0; i < length; i ++)
                items.push(this.render(opt.item))
            // cycle repeats
            if (cycle) opt.count.push(opt.count.shift())
            console.log(opt.count)
            return items
        }}
    },
    
    render (model) {
        var out = {}
        for (var key in model) {
            // init expression
            if (val.isStr(model[key]) && model[key].match(/{.*?}/))
                model[key] = this._parseExpressions(model[key])
            // render value if expression
            if (model[key].type == 'expression')
                out[key] = model[key].render()
            // transfer value
            else
                out[key] = model[key]
        }
        return out
    },
    
    _parseExpressions (string) {
        var out = {type: 'expression', expressions: []}
        // find all the queries and replace them with functions
        var string = string.replace(/{.*?}/g, match => {
            var query = {}
            // parse match
            match.replace(/{| |}/g, '').split(',').forEach(p => {
                p = p.split(':')
                query[p[0]] = parseInt(p[1]) || p[1]
            })
            // find method of this and push generated expression
            out.expressions.push(this[query.type](query))
            // save index of array {1}
            return `{${out.expressions.length - 1}}`
        })
        out.render = function () {
            // replace all {1} with expression result
            var result = string.replace(/{.*?}/g, i => {
                // bundle.expressions[{1}]
                return this.expressions[i.match(/\d+/)[0]].render()
            })
            // convert to int if no characters
            return result.match(/[^\d+]/)? result: parseInt(result)
        }
        return out
    },
    
    // Model : class {
    //     
    //     constructor (model) {
    //         this.model = model
    //         this.factory  = null
    //     }
    //     
    //     init (callback) {
    //         this.factory = callback
    //         this.model.forEach((item, i, array) => {
    //             item.layer = callback(item, i, array)
    //         })
    //     }
    //     
    //     add (item) {
    //         this.model.push(item)
    //         item.layer = this.factory(item, this.model.length-1, this.model)
    //     }
    //     
    //     remove (index) {
    //         var object = null
    //         for (var i = 0; i < this.model.length; i ++)
    //             if (i == index) {
    //                 object = this.model.splice(i, 1)
    //                 break
    //             }
    //         return object
    //     }
    // }
    
}


