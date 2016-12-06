


import {val, vec, Layer} from './fw'

class Screen extends Layer {
    
    constructor () {
        super(document.body)
    }
    
    get size () {
        return new vec(window.innerWidth, window.innerHeight)
    }
    
    get center () {
        return this.size.scale(.5)
    }
    
}

export default new Screen()


