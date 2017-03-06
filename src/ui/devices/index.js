


import './style.sass'
import {Layer} from '../../index'

export default class Device extends Layer {
    
    constructor (options = {}) {
        options.type = options.type || 'iphone'
        options.dom  = '.device'
        super(options)
        this.align = {x: 'c', y: 'c'}
    }
    
    set type (value) {
        this.dom.classList.add(value)
    }
    
    set color (value) {
        this.dom.classList.add(value)
    }
    
    set ori (value) {
        this.dom.classList.add(value)
    }
    
}


