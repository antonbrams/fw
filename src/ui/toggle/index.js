


import './style.sass'
import {Layer, animation, math} from '../../index'

/*
    toggle = Toggle
        color    : off:'#BECADD', on:'#00aaff'
        onChange : (state) ->
            console.log 'slider', state
*/

export default function (transport = {}) {
    var state  = false
    var params = {
        left       : 0,
        opacityOff : 0,
        opacityOn  : 0
    }
    
    var template = `<defs>
            <mask id="masterMask">
                <circle fill="white" cx="33.33" cy="33.33" r="33.33" />
                <circle fill="white" cx="66.66" cy="33.33" r="33.33" />
                  <rect fill="white"  x="33.33" width="33.33" height="66.66" />
                <circle fill="black" cx="{left}" cy="33.33" r="30.33" />
            </mask>
        </defs>
        <g mask="url(#masterMask)">
            <rect width="100" height="66.66" opacity="{opacityOff}" />
            <rect width="100" height="66.66" opacity="{opacityOn}" />
        </g>`
    
    var toggle = new Layer({
        dom      : '<svg class="toggle" viewBox="0 0 100 66.66" width="45" height="30"></svg>',
        content  : {html:template, bind:params},
    })
    
    var slide = animation.decay({speed: .3, float: 2, value: 0}, value => { 
        params.left       = math.to(value, 33.33, 66.66)
        params.opacityOff = math.to(value, .3, .0)
        params.opacityOn  = math.to(value, .0, 1)
    })
    
    var onDrag = toggle.on('drag', {
        move (t) {
            slide.value = t.translate.x / 16.66 + (state? 1: 0)
            transport.onDrag && transport.onDrag(slide.value)
        },
        up (t) {
            state = slide.value > .5
            slide.to(state? 1: 0)
            transport.onChange && transport.onChange(state)
        },
        click (t) {
            state = !state
            slide.to(state? 1: 0)
            transport.onChange && transport.onChange(state)
        }
    })
    
    return {
        toggle,
        enable () {
            onDrag.on()
            toggle.dom.classList.remove('disabled')
            return this
        },
        disable () {
            onDrag.off()
            toggle.dom.classList.add('disabled')
            return this
        },
        on () {
            slide.to(state = true)
            return this
        },
        off () {
            slide.to(state = false)
            return this
        }
    }
}


