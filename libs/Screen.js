


import {vec, event, gesture, Layer} from './fw'

class Screen extends Layer {
    
    constructor () {
        super({
            dom    : document.body,
            parent : null
        })
    }
    
    // external event interface
    on (topic, fn, options) {
        // gestures
        if (topic in event)
           return gesture[topic](this, fn)
       // dom events
        else if (event.support(document, topic))
            return event.listener(document, topic, fn, options)
        // dom css
        else
            return this.event.on(topic, fn)
    }
    
    get size () {
        return new vec(window.innerWidth, window.innerHeight)
    }
    
    get center () {
        return this.size.scale(.5)
    }
    
}

export default new Screen()


