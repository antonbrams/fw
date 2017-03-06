


import './style.sass'
import {Layer} from '../../index'

export default class Scroller extends Layer {
    
    constructor (options) {
        options.dom = '.scroller'
        super(options)
    }
    
    flow (value) {
        this.dom.classList.add(value || 'y')
    }
}


