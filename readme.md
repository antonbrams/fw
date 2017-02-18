


#### What is FW?
**F**rame**W**ork is a Layer above **HTML, CSS and JavaScript**, that allows you to speed up your user interface sketches and use it also in a production.
The API was inspired from a Framer.js, so it tastes best with a *CoffeeScript!*

#### How to start
All the instruments are in the global scope under a `fw` space name. If you're using ES6, then `import {Layer} from 'fw'`. To create a Layer, just type `var layer = new Layer();`, so a `<div></div>` container in the `document.body` will be created. To stylize the Layer just put an Object as an argument in a constructor like this 
```
var layer = new Layer({
    position : 'absolute',
    left     : '10px',
    top      : '10px',
    bg       : {color: 'red'},
    content  : 'hello World'
});
```