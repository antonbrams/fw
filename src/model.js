


import {val, text, math, etc, arr} from './index'

var assets = {
    signs : ['', ',', '.', '?', '!'],
    words : 'accusam aliquyam amet at clita consetetur diam dolor dolore dolores duo ea eirmod elitr eos erat est et gubergren invidunt ipsum justo kasd labore lorem magna no nonumy rebum sad sanctus sea sed sit stet takimata tempor ut vero voluptua'.split(' '),
    image : {
        mac : ['Abstract', 'Antelope Canyon', 'Bahamas Aerial', 'Beach', 'Blue Pond', 'Bristle Grass', 'Brushes', 'Circles', 'Death Valley', 'Desert', 'Ducks on a Misty Pond', 'Eagle & Waterfall', 'Earth and Moon', 'Earth Horizon', 'El Capitan 2', 'El Capitan', 'Elephant', 'Flamingos', 'Floating Ice', 'Floating Leaves', 'Foggy Forest', 'Forest in Mist', 'Foxtail Barley', 'Frog', 'Galaxy', 'Grass Blades', 'Hawaiian Print', 'Isles', 'Lake', 'Lion', 'Milky Way', 'Moon', 'Mountain Range', 'Mt. Fuji', 'Pink Forest', 'Pink Lotus Flower', 'Poppies', 'Red Bells', 'Rice Paddy', 'Rolling Waves', 'Shapes', 'Sierra 2', 'Sierra', 'Sky', 'Snow', 'Underwater', 'Wave', 'Yosemite 2', 'Yosemite 3', 'Yosemite 4', 'Yosemite 5', 'Yosemite', 'Zebras'],
        windows : [
            '...'
        ],
        linux : [
            '...'
        ]
    }
}

var expressions = {
    
    // {type: int, mode: cycle, from: 1}
    // {type: int, mode: forward, from: 1}
    // {type: int, mode: random, min: 1, max: 10}
    int (opt) {
        return {i: 0, method: 'int', mode: opt.mode, render () {
            return opt.mode == 'forward' || opt.mode == 'loop'?
                opt.from + this.i ++:
            opt.mode == 'random'?
                Math.floor(math.to(Math.random(), opt.min, opt.max)):
                this.i
        }}
    },
    
    // {type: string, mode: text, count: 20}
    // {type: string, mode: text, min: 20, max 100}
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
    
    // {type: image, source: local}
    image (opt) {
        var source = {
            remote (i) {return `https://unsplash.it/500?image=${i}`},
            local  (i) {return `file:///Library/Desktop%20Pictures/${
                escape(assets.image.mac[i % assets.image.mac.length])}.jpg`}
        }
        var seed = math.randInt(0, 1000)
        return {i: 0, render () {
            return source[opt.source || 'local'](seed + this.i ++)
        }}
    },
    
    // get(i => {return custom[i]})
    iterate (callback) {
        return {type: 'expression', i: 0, render () {
            return callback(this.i ++)
        }}
    },
}

export default {
    
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
    
    init (model) {
        var destroy = layer => {layer.destroy()}
        var make    = item  => {/* no initial value */}
        var methods = {
            on (topic, callback) {
                if (topic == 'make') {
                    make = item => {
                        var layer  = callback(item)
                        layer.data = item
                        Object.defineProperty(item, 'layer', {
                            value      : layer, 
                            enumerable : false
                        })
                    }
                    model.forEach(make)
                } else if (topic == 'destroy')
                    destroy = callback
                return model
            },
            push () {
                make(arguments[0])
                Array.prototype.push.apply(this, arguments)
            },
            splice () {
                var deleted = Array.prototype.splice.apply(this, arguments)
                deleted.forEach(a => destroy(a.layer))
                return deleted
            },
            find (query) {
                return arr.find(model, query)
            },
            delete (query) {
                return arr.delete(model, query)
            },
            filterMap (query) {
                return arr.filterMap(model, query)
            },
        }
        for (var key in methods)
            Object.defineProperty(model, key,
                {enumerable: false, value: methods[key]})
        return model
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
    
    put (opt) {
        // modify values
        for (var key in opt.model) {
            var value = opt.model[key]
            // reset integer with count type
            if (value.type == 'expression' && value.expressions)
                value.expressions.forEach(expression => {
                    // reset int expression if loop
                    if (expression.method == 'int' && expression.mode == 'loop')
                        expression.i = 0
                })
        }
        // render content
        var model = []
        for (var i = 0; i < (opt.count || 1); i ++) {
            // copy raw model
            var property = this.render(opt.model)
            // make shuffle on model
            if ('shuffle' in opt) {
                var index = math.randInt(0, opt.shuffle.length)
                Object.assign(property, this.render(opt.shuffle[index]))
            }
            // add rendered version of model to the output list
            model.push(property)
        }
        // make watchable
        return this.init(model)
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
            out.expressions.push(expressions[query.type](query))
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
    
}


