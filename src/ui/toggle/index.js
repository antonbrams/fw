


import './style.sass'
import {Layer, animation, math} from '../../index'

/*
    toggle = new Toggle
        onChange : (state) ->
            console.log 'slider', state
*/

export default function (transport = {}) {
    // states
    var state  = false
    var params = {
        left       : 0,
        opacityOff : 0,
        opacityOn  : 0
    }
    // template
    var template = `<defs>
            <mask id="masterMask">
                <circle/><circle/><rect/><circle cx="{left}"/>
            </mask>
        </defs>
        <g mask="url(#masterMask)">
            <rect opacity="{opacityOff}" />
            <rect opacity="{opacityOn}" />
        </g>`
    // toggle object
    var toggle = new Layer({
        dom      : '<svg class="toggle" viewBox="0 0 100 66.66"></svg>',
        content  : {html:template, bind:params},
    })
    // slide function
    var slide = animation.decay({speed: .3, float: 2, value: 0}, value => { 
        params.left       = math.to(value, 33.33, 66.66)
        params.opacityOff = math.to(value, .3, .0)
        params.opacityOn  = math.to(value, .0, 1)
    })
    // ondrag event
    var onDrag = toggle.on('drag', {
        move (t) {
            slide.value = t.translate.x / 16.66 + (state? 1: 0)
            transport.onDrag && transport.onDrag(slide.value)
            return false
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
    // export of the interface
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


