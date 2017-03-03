


import {Layer, animation, math} from '../index'

/*
    toggle = Toggle
        color    : off:'#BECADD', on:'#00aaff'
        onChange : (state) ->
            console.log 'slider', state
*/

export default function (transport = {}) {
    var state = false
    var params = {
        left       : 0,
        opacityOff : 0,
        opacityOn  : 0
    }
    var c = transport.color
    var colorOff = c && c.off? c.off: '#BECADD'
    var colorOn  = c && c.on ? c.on : '#00aaff'
    var template = `<defs>
            <mask id="masterMask">
                <circle fill="white" cx="33.33" cy="33.33" r="33.33" />
                <circle fill="white" cx="66.66" cy="33.33" r="33.33" />
                  <rect fill="white"  x="33.33" width="33.33" height="66.66" />
                <circle fill="black" cx="{left}" cy="33.33" r="30.33" />
            </mask>
        </defs>
        <g mask="url(#masterMask)">
            <rect fill="${colorOff}" width="100" height="66.66" opacity="{opacityOff}" />
            <rect fill="${colorOn}" width="100" height="66.66" opacity="{opacityOn}" />
        </g>`
        
    var toggle = new Layer({
        position : 'relative',
        dom      : '<svg viewBox="0 0 100 66.66" width="45" height="30"></svg>',
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
        cancel (t) {
            state = t.translate && t.translate.len > 2? slide.value > .5: !state
            slide.to(state? 1: 0)
            transport.onChange && transport.onChange(state)
        }
    })
    
    return {
        toggle,
        enable () {
            onDrag.on()
            toggle.set({opacity : 1})
            return this
        },
        disable () {
            onDrag.off()
            toggle.set({opacity : .3})
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


