


import {vec, event, Layer} from './fw'

class Screen extends Layer {
    
    constructor () {
        super({
            dom    : document.body,
            parent : null
        })
    }
    
    // external event interface
    on (topic, fn, options) {
        // dom events
        if (event.support(document, topic))
            return event.listener(document, topic, fn, options)
        // gestures
        else if (topic in event)
            return event[topic](this, fn)
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


