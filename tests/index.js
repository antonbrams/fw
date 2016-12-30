var Layer, Screen, Scroller, animation, background, button, decay, dom, etc, event, foreground, knob, layer, layer1, link, matrix, model, move, onDrag, onRotate, onZoom, out, scroller, states, toggle, vec;

dom = fw.dom, Layer = fw.Layer, Screen = fw.Screen, Scroller = fw.Scroller, vec = fw.vec, etc = fw.etc, model = fw.model, matrix = fw.matrix, animation = fw.animation, event = fw.event;

if (0) {
  layer = new Layer({
    center: Screen.center
  }).on('resize');
}

if (0) {
  layer = new Layer({
    center: Screen.center
  }).on('fileDrop', {
    drop: function(data) {
      return console.log(data);
    }
  });
}

if (0) {
  scroller = new Scroller({
    flow: 'x',
    position: 'absolute',
    size: new vec(200, 200),
    border: {
      radius: 5
    },
    boxShadow: '0 2px 10px 0 rgba(0,0,0, .2)',
    center: Screen.center
  });
  model = model.put({
    count: 3,
    model: {
      id: '{type: int, mode: forward, from: 1}',
      image: '{type: image}'
    }
  }).on('make', function(item) {
    return new Layer({
      parent: scroller,
      size: new vec(200, 200)
    }).bind(item, {
      identifier: {
        to: 'id',
        get: function(layer) {
          return layer.identifier;
        }
      },
      image: {
        to: 'image',
        from: 'backgroundImage',
        set: function(value, layer) {
          return etc.compressImage(value, .1, function(url) {
            return layer.image(url);
          });
        }
      }
    });
  }).on('destroy', function(item) {
    var l;
    l = item.layer;
    return l.animate({
      time: .3
    }, {
      opacity: 0,
      scale: new vec(0, 1),
      margin: {
        l: l.size.scale(-1).unit('px').x
      }
    }, function() {
      return l.destroy();
    });
  });
  console.log(model);
  scroller.on('click', function(e) {
    return console.log(model["delete"]({
      id: 1
    }));
  });
}

if (1) {
  link = 'http://www.springfieldinterchange.com/wp-content/themes/thesis_16b2/custom-sample/rotator/sample-4.jpg';
  layer1 = new Layer({
    position: 'absolute',
    zIndex: 1,
    size: new vec(300, 300),
    center: Screen.center,
    image: link
  });
  onDrag = layer1.on('drag');
  onZoom = layer1.on('pinchToZoom');
  onRotate = layer1.on('pinchToRotate');
}

if (0) {
  toggle = new Layer({
    position: 'absolute',
    size: new vec(100, 50),
    center: Screen.center,
    border: {
      radius: 25
    },
    padding: 10
  });
  knob = new Layer({
    parent: toggle,
    size: new vec(40, 100).unit('%'),
    border: {
      radius: 25
    }
  });
  knob.on('drag', {
    move: function(t) {
      var move;
      matrix = t.transformation;
      move = matrix.getTranslation();
      move.y = 0;
      t.transformation = new matrix().translate(move);
      return true;
    }
  });
  states = {
    current: 'on',
    on: {
      left: '0px'
    },
    off: {
      left: '50px'
    }
  };
  toggle.on('click', function(e) {
    states.current = states.current === 'on' ? 'off' : 'on';
    return knob.animate({
      time: .2
    }, states[states.current]);
  });
}

if (0) {
  button = new Layer({
    position: 'absolute',
    size: new vec(300, 200),
    center: Screen.center,
    bg: 'none',
    perspective: 500
  });
  layer = new Layer({
    position: 'absolute',
    overflow: 'hidden',
    parent: button,
    size: new vec(100, 100).unit('%'),
    border: {
      radius: 10
    }
  });
  background = new Layer({
    position: 'absolute',
    parent: layer,
    size: new vec(100, 100).unit('%'),
    bg: 'radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0))'
  });
  foreground = new Layer({
    parent: button,
    position: 'absolute',
    size: new vec(200, 100),
    center: layer.center,
    border: {
      radius: 10
    },
    bg: {
      color: 'red'
    }
  });
  decay = animation.decay(function(pointer) {
    var tilt;
    tilt = new matrix().rotate(new vec(-pointer.y, pointer.x).scale(.2));
    layer.matrix = tilt;
    foreground.matrix = new matrix().translate(new vec(0, 0, 200)).multiply(tilt);
    return background.translate = new vec(-pointer.x, -pointer.y).unit('px');
  });
  move = button.on(event.types.move, function(e) {
    return decay.to(new vec(e.clientX, e.clientY).sub(layer.center));
  });
  out = button.on(event.types.out, function(e) {
    return decay.to(new vec());
  });
}
