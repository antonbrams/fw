


import './style.sass'
import {
    dom, Layer, Screen, Scroller, 
    vec, etc, model, matrix, 
    animation, event, css, math, Toggle, Device
} from '../src/index.js'

# Device
if 0
    Screen.set 
        image : 'http://www.1designshop.com/wp-content/uploads/2015/12/1dsp-20151221-backgroung007.png'
        overflow : 'hidden'
    
    iPhone = new Device
        type   : 'iphone'
        color  : 'black'
        scale  : 0.3
    
    scroller = new Scroller
        flow   : 'y'
        parent : iPhone
    
    mockup = model.put count: 5, model: 
            image : '{type: image, source: server}'
    
    # on events
    mockup.on 'make', (item) ->
        layer = new Layer
            parent : scroller
            size   : new vec('100', '25').unit '%'
        etc.compressImage item.image, .1, (url) -> layer.image url
        return layer

# projection matrix
if 0
    points = []
    
    [
        [100,  50],
        [100, 400],
        [300, 100],
        [300, 300]
    ].forEach (point) ->
        points.push(new Layer(
            position : 'absolute'
            size     : new vec(10, 10).unit 'px'
            bg       : color:'red'
            border   : radius:'5px'
            move     : new vec(point[0], point[1]).unit 'px'
            align    : new vec('c', 'c')
        ).move)
    
    a = new Layer
        position : 'absolute'
        size     : new vec(100, 100).unit 'px'
        project  : points
        
    window.a = a

# toggle test
if 1
    masterSwitch = new Toggle
        onChange : (state) ->
            console.log 'slider', state
            
    masterSwitch.toggle.set
        center: Screen.center
        
    window.masterSwitch = masterSwitch

# animation css
if 0
    layer = new Layer
        center : Screen.center
    
    layer.on 'click', (e) ->
        animation.animate(layer.dom)

# drag n drop file
if 0
    layer = new Layer
            center : Screen.center
    
    dnd = layer.on 'fileDrop',
        drop : (data) ->
            console.log data

# dynamic templates
if 0
    mod = 
        name : 'this is my name'
        id   : 'some_id'
    
    layer = new Layer
            center  : Screen.center
            content :
                html : "<div id='{id}'>{name}</div>"
                bind : mod
        .on 'click', (e) ->
            mod.name = 'this is something different!'
    
# model
if 0
    scroller = new Scroller
        position  : 'relative'
        center    : Screen.center
        flow      : 'x'
        size      : new vec(200, 200).unit 'px'
        border    : radius : 5
        boxShadow : '0 2px 10px 0 rgba(0,0,0, .2)'
    
    mockup = model.put
            count : 3
            model :
                id    : '{type: int, mode: forward, from: 1}'
                image : '{type: image, source: server}'
        .on 'make', (item) ->
            new Layer
                parent : scroller
                size   : new vec 200, 200
            .bind item,
                identifier : 
                    to  : 'id'
                    get : (layer) -> layer.identifier
                image :
                    to   : 'image'
                    from : 'backgroundImage'
                    set  : (value, layer) ->
                        etc.compressImage value, .1, (url) -> layer.image url
        .on 'destroy', (layer) ->
            layer.animate time : .3,
                opacity : 0
                scale   : new vec 0, 1
                margin  : l : layer.size.scale(-1).unit('px').x,
                () -> layer.destroy()
    
    console.log mockup
    scroller.on 'click', (e) ->
        console.log mockup.delete id : 1

# drag n drop
if 0
    mockup = model.put(count:1, model:
        image : '{type: image, source: remote}'
    )[0]
    
    layer = new Layer
            position : 'absolute'
            zIndex   : 1
            size     : new vec(300, 300).unit 'px'
            move     : new vec(300, 300).unit 'px'
        .bind mockup,
            image    : 'image'
    
    onDrag = layer.on 'drag',
        move : (t) ->
            t.constraints = 
                l : 250
                t : 250
                r : 650
                b : 650
            return true
        click : (t) ->
            console.log 'click'
            
    onZoom = layer.on 'pinchToZoom',
        move : (t) ->
            t.constraints = 
                min: 1,
                max: 2
                
    onRotate = layer.on 'pinchToRotate',
        move : (t) ->
            t.constraints = 
                min: -10,
                max:  10
        up : (t) ->
            console.log 'tight'
    
    outter = new Layer
        position : 'absolute'
        move     : new vec(250, 250).unit 'px'
        size     : new vec(400, 400).unit 'px'
        bg       : color : 'transparent'
        border   : '1px red solid'
    
    # inner = new Layer
    #     position : 'absolute'
    #     move     : new vec(370, 370).unit 'px'
    #     size     : new vec(130, 130).unit 'px'
    #     bg       : color : 'transparent'
    #     border   : '1px red solid'
    
    onResize = layer.on 'resize',
        # edges : ['rb']
        move : (t) ->
            t.constraints =
                max : {l: 250, t: 250, r: 650, b: 650}
                min : {l: 370, t: 370, r: 500, b: 500}
            # t.constraints =
            #     min : {w: 300, h: 300}
            #     max : {w: 500, h: 500}
    # onResize.off()
    
    
    onResize = layer.on 'rotate',
        move : (t) ->
            t.constraints =
                min : -10
                max : 10

if 0
    button = new Layer
        position    : 'absolute'
        size        : new vec(300, 200).unit 'px'
        center      : Screen.center
        bg          : 'none'
        perspective : '500px'
        
    layer = new Layer
        position : 'absolute'
        overflow : 'hidden'
        parent   : button
        size     : new vec(100, 100).unit '%'
        border   : radius : '10px'
        center   : button.center
    
    background = new Layer
        position : 'absolute'
        parent   : layer
        size     : new vec(100, 100).unit '%'
        bg       : 'radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0))'
    
    foreground = new Layer
        parent   : button
        position : 'absolute'
        size     : new vec(200, 100).unit 'px'
        center   : button.center
        border   : radius : '10px'
        bg       : color : 'red'
    
    decay = animation.decay {value: new vec()}, (pointer) ->
        rotate = (obj) ->
            offset = obj.size.scale .5
            new matrix()
                .translate offset
                .rotate new vec(-pointer.y, pointer.x).scale(.1)
                .translate offset.scale -1
        layer.matrix = rotate layer
        foreground.matrix = new matrix()
            .translate new vec 0, 0, 100
            .multiply rotate foreground
        background.translate = new vec(-pointer.x, -pointer.y).unit 'px'
    
    move = button.on event.types.move, (e) ->
        decay.to new vec(e.clientX, e.clientY).sub layer.center
    
    out = button.on event.types.out, (e) ->
        decay.to new vec()


