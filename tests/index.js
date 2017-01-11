var Layer, Screen, Scroller, animation, background, button, decay, dom, etc, event, foreground, knob, layer, layer1, matrix, mockup, mod, model, move, onDrag, onRotate, onZoom, out, scroller, states, toggle, vec;

dom = fw.dom, Layer = fw.Layer, Screen = fw.Screen, Scroller = fw.Scroller, vec = fw.vec, etc = fw.etc, model = fw.model, matrix = fw.matrix, animation = fw.animation, event = fw.event;

if (1) {
  layer = new Layer({
    position: 'relative',
    dom: '<video></video>',
    center: Screen.center,
    src: 'test'
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
  mod = {
    name: 'this is my name',
    id: 'some_id'
  };
  layer = new Layer({
    center: Screen.center,
    content: {
      html: "<div id='{id}'>{name}</div>",
      bind: mod
    }
  }).on('click', function(e) {
    return mod.name = 'this is something different!';
  });
}

if (0) {
  scroller = new Scroller({
    position: 'relative',
    center: Screen.center,
    flow: 'x',
    size: new vec(200, 200),
    border: {
      radius: 5
    },
    boxShadow: '0 2px 10px 0 rgba(0,0,0, .2)'
  });
  mockup = model.put({
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
  }).on('destroy', function(layer) {
    return layer.animate({
      time: .3
    }, {
      opacity: 0,
      scale: new vec(0, 1),
      margin: {
        l: layer.size.scale(-1).unit('px').x
      }
    }, function() {
      return layer.destroy();
    });
  });
  console.log(mockup);
  scroller.on('click', function(e) {
    return console.log(mockup["delete"]({
      id: 1
    }));
  });
}

if (0) {
  model = model.put({
    count: 1,
    model: {
      image: '{type: image}'
    }
  });
  layer1 = new Layer({
    position: 'absolute',
    zIndex: 1,
    size: new vec(300, 300),
    center: Screen.center
  }).bind(model[0], {
    image: 'image'
  });
  onDrag = layer1.on('drag', {
    move: function(t) {
      return t.constraints = {
        l: -10,
        r: 10
      };
    }
  });
  onZoom = layer1.on('pinchToZoom', {
    move: function(t) {
      return t.constraints = {
        min: 1,
        max: 2
      };
    }
  });
  onRotate = layer1.on('pinchToRotate', {
    move: function(t) {
      return t.constraints = {
        min: -10,
        max: 10
      };
    },
    cancel: function(t) {
      return console.log('tight');
    }
  });
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
    perspective: '500px'
  });
  layer = new Layer({
    position: 'absolute',
    overflow: 'hidden',
    parent: button,
    size: new vec(100, 100).unit('%'),
    border: {
      radius: 10
    },
    center: button.center
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
    center: button.center,
    border: {
      radius: 10
    },
    bg: {
      color: 'red'
    }
  });
  decay = animation.decay(function(pointer) {
    var rotate;
    rotate = function(obj) {
      var offset;
      offset = obj.size.scale(.5);
      return new matrix().translate(offset).rotate(new vec(-pointer.y, pointer.x).scale(.1)).translate(offset.scale(-1));
    };
    layer.matrix = rotate(layer);
    foreground.matrix = new matrix().translate(new vec(0, 0, 100)).multiply(rotate(foreground));
    return background.translate = new vec(-pointer.x, -pointer.y).unit('px');
  });
  move = button.on(event.types.move, function(e) {
    return decay.to(new vec(e.clientX, e.clientY).sub(layer.center));
  });
  out = button.on(event.types.out, function(e) {
    return decay.to(new vec());
  });
}
