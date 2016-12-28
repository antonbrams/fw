


{dom, Layer, Screen, Scroller, vec, etc, model, matrix, animation} = fw

if 1
    layer = new Layer
        center : Screen.center
    .on 'resize'

# drag n drop file
if 0
    layer = new Layer
        center : Screen.center
    .on 'fileDrop',
        drop : (data) ->
            console.log data

# model
if 0
    scroller = new Scroller
        flow      : 'x'
        position  : 'absolute'
        size      : new vec 200, 200
        border    : radius: 5
        boxShadow : '0 2px 10px 0 rgba(0,0,0, .2)'
        center    : Screen.center
    
    model = model.put 
        count : 3
        model :
            id    : '{type: int, mode: forward, from: 1}',
            image : '{type: image}'
    
    model.on 'make', (item) ->
        new Layer
            parent : scroller
            size   : new vec 200, 200
        .bind(item, {
            image :
                key  : 'image'
                read : 'backgroundImage'
                set  : (value, layer) ->
                    etc.compressImage value, .1, (url) ->
                        layer.image url
        })

# drag n drop
if 0
    layer1 = new Layer
        position : 'absolute'
        zIndex   : 1
        size     : new vec 300, 300
        center   : Screen.center
    
    layer1.append new Layer
        position : 'absolute'
        size     : new vec 10, 10
        border   : radius: 10
        bg       : color: 'red'
    
    onDrag = layer1.on 'drag',
        rotate : true
        scale  : true
        move   : (t) ->
            t.transformation.rotate new vec(-t.velocity.y, t.velocity.x), 1
            return true

# toggle
if 0
    toggle = new Layer
        position : 'absolute'
        size     : new vec 100, 50
        center   : Screen.center
        border   : radius: 25
        padding  : 10

    knob = new Layer
        parent : toggle
        size   : new vec(40, 100).unit '%'
        border : 
            radius : 25

    knob.on 'drag',
        move : (t) ->
            matrix = t.transformation
            move   = matrix.getTranslation()
            move.y = 0
            t.transformation = new matrix().translate move
            return true
    
    states =
        current : 'on'
        on      : left : '0px'
        off     : left : '50px'
    
    toggle.on 'click', (e) ->
        states.current = if states.current == 'on' then 'off' else 'on'
        knob.animate time : .2, states[states.current]

if 0
    button = new Layer
        position    : 'absolute'
        size        : new vec 300, 200
        center      : Screen.center
        bg          : 'none'
        perspective : 500
    
    layer = new Layer
        position : 'absolute'
        overflow : 'hidden'
        parent   : button
        size     : new vec(100, 100).unit '%'
        border   : radius : 10
    
    background = new Layer
        position : 'absolute'
        parent   : layer
        size     : new vec(100, 100).unit '%'
        bg       : 'radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0))'
    
    foreground = new Layer
        parent   : button
        position : 'absolute'
        size     : new vec 200, 100
        center   : layer.center
        border   : radius : 10
        bg       : color : 'red'
    
    decay = animation.decay (pointer) ->
        tilt = new matrix()
            .rotate new vec(-pointer.y, pointer.x).scale .1
        layer.matrix = tilt
        foreground.matrix = new matrix()
            .translate new vec 0, 0, 30
            .multiply tilt
        background.translate = new vec(-pointer.x, -pointer.y).unit 'px'
    
    move = button.on 'mousemove', (e) ->
        pointer = new vec e.clientX, e.clientY
            .sub layer.center
        decay.to pointer
    
    out = button.on 'mouseleave', (e) ->
        decay.to new vec()


