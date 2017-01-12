


{
    dom, Layer, Screen, Scroller, 
    vec, etc, model, matrix, 
    animation, event
} = fw

if 1
    layer = new Layer
        center : Screen.center
        src    : 'test'
    
    layer.on 'resize'

# drag n drop file
if 0
    layer = new Layer
            center : Screen.center
        .on 'fileDrop',
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
        size      : new vec 200, 200
        border    : radius : 5
        boxShadow : '0 2px 10px 0 rgba(0,0,0, .2)'
    
    mockup = model.put
            count : 3
            model :
                id    : '{type: int, mode: forward, from: 1}'
                image : '{type: image}'
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
    m = model.put
            count : 1
            model :
                image : '{type: image}'
    
    layer1 = new Layer
            position : 'absolute'
            zIndex   : 1
            size     : new vec 300, 300
            center   : Screen.center
        .bind m[0],
            image: 'image'
    
    onDrag   = layer1.on 'drag',
        move : (t) ->
            t.constraints = 
                l: -10,
                r: 10
            # layer1.rect.position.log('tight')
            
    onZoom   = layer1.on 'pinchToZoom',
        move : (t) ->
            t.constraints = 
                min: 1,
                max: 2
    onRotate = layer1.on 'pinchToRotate',
        move : (t) ->
            t.constraints = 
                min: -10,
                max: 10
        cancel : (t) ->
            console.log 'tight'
    
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
        perspective : '500px'
    
    layer = new Layer
        position : 'absolute'
        overflow : 'hidden'
        parent   : button
        size     : new vec(100, 100).unit '%'
        border   : radius : 10
        center   : button.center
    
    background = new Layer
        position : 'absolute'
        parent   : layer
        size     : new vec(100, 100).unit '%'
        bg       : 'radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0))'
    
    foreground = new Layer
        parent   : button
        position : 'absolute'
        size     : new vec 200, 100
        center   : button.center
        border   : radius : 10
        bg       : color : 'red'
    
    decay = animation.decay (pointer) ->
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


