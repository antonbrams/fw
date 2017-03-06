


import './style.sass'
import {vec, event, gesture, Layer} from '../../index'

class Screen extends Layer {
    
    // external event interface
    on (topic, fn, options) {
        // gestures
        if (topic in event)
           return gesture[topic](this, fn).on()
        // dom events
        else if (event.support(document, topic))
            return event.listener(document, topic, fn, options).on()
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

export default new Screen(document.body)


