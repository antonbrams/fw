


import './style.sass'
import {Layer} from '../index'

export default class Scroller extends Layer {
    
    constructor (options) {
        // this.dom[this.dom.tagName === 'A'? 'href': 'src'] = value
        options.dom = '.scroller'
        super(options)
    }
    
    flow (value) {
        this.dom.classList.add(value || 'y')
    }
}


