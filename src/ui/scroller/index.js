


import './style.sass'
import {Layer} from '../../index'

export default class Scroller extends Layer {
    
    constructor (options) {
        options.dom = '.scroller .y'
        super(options)
    }
    
    flow (value) {
        ['x', 'y'].forEach(axis => 
            this.dom.classList[value == axis? 'add': 'remove'](value))
    }
}


