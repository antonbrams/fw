


import {
	geometry as fwGeometry,
	color    as fwColor
} from './index'

export default {

	box : class {
		constructor () {
			this.l = 0
			this.w = 0
			this.t = 0 
			this.h = 0
		}
		r () {return this.l + this.w}
		b () {return this.t + this.h}
	},

	get (_max, _boxes) {
		var boxes	= new Array()
		var area 	= _max.w * _max.h
		for (var nCell = 0; nCell < area; nCell ++) {
			// Head
			var head 	= new this.box()
			head.l 		= nCell % _max.w
			head.t 		= parseInt(nCell / _max.w)
			// Check only free Positions
			if (!this.collide(_boxes, head)) {
				// Expansion to Right and Bottom
				var expansion = {x: true, y: true}
				// Start Expansion to Right
				while (expansion.x) {		
					// Start Expansion to Bottom
					while (expansion.y) {
						// Check future Ranges
						if (
							this.collide(_boxes, this.shift(head, 'y', 1)) || 
							head.b() == _max.h
						) {
							// Stop expansion to Bottom
							expansion.y = false
						} else {
							// Expand to Bottom
                        	head.h += 1
						}
					}
					// Check current Range
					if (
						this.collide(_boxes, head) || 
						head.r() > _max.w
					) {	
						// Stop Expansion to Right
						expansion.x = false
						boxes = this.detach(boxes)
					} else {
						// Start new Expansion to Bottom
						expansion.y = true
						boxes = this.append(boxes, head)
						// Reset Height and Expand to Right
						head.h  = 1
						head.w += 1
					}
				}
			}
		}
		boxes = this.filter(boxes)
		if (0) { this.test(boxes) }
		return boxes
	},

	append (boxes, head) {
		var last = boxes.length - 1
		var box  = new this.box()
		box.l = head.l; box.t = head.t
		box.w = head.w; box.h = head.h
		if (
			boxes[last]   && 
			boxes[last].h == head.h &&
			boxes[last].l == head.l
		)
			boxes[last] = box
		else
			boxes.push(box)
		return boxes
	},
	
	detach (boxes) {
		prev = boxes.length - 2
		last = boxes.length - 1
		if (
			boxes[prev]     && 
			boxes[prev].h 	== boxes[last].h   &&
			boxes[prev].r() == boxes[last].r()
		) boxes.pop()
		return boxes
	},
	
	filter (boxes) {
		var boxesLength = boxes.length
		for (var i = 0; i < boxesLength; i ++) {
			for (var n = 0; n < boxesLength; n ++) {
				if (
					 i != n && 
					boxes[i]   && boxes[n]   &&
					boxes[i].l <= boxes[n].l && boxes[i].r() >= boxes[n].r() &&
					boxes[i].t <= boxes[n].t && boxes[i].b() >= boxes[n].b()
				) {
					boxes[n] = undefined
				}
			}
		}
		return boxes.filter(_box => _box)
	},

	shift (head, direction, value) {
		var pointer = new this.box()
		pointer.l = head.l
		pointer.t = head.t
		pointer.w = head.w + (direction == 'x'? value: 0)
		pointer.h = head.h + (direction == 'y'? value: 0)
		return pointer
	},

	collide (list, box) {
		var listLength = _list.length
		for (var i = 0; i < listLength; i ++) 
			if (fwGeometry.boxCollision(_list[i], _box)) return true
		return false
	},

	test (box) {
		// Delete Old Boxes		
		var oldBoxes = document.body.getElementsByClassName('collider')
		while (oldBoxes.length > 0) document.body.removeChild(oldBoxes[0])
		// Create New
		var shift = () => { return (Math.random() - 0.5) * gl.grid.gutter / 2 }
		for (var i = 0; i < box.length; i ++) {
			var test	= document.createElement("div")
			test.className = 'collider'
			test.style.backgroundColor 	= fwColor.rand()
			test.style.position 		= "absolute"
			test.style.left		= shift() + gl.grid.PTtoPX(box[i].l + 1, true)
			test.style.top 		= shift() + gl.grid.PTtoPX(box[i].t + 1, true)
			test.style.width 	= shift() + gl.grid.PTtoPX(box[i].w, false)
			test.style.height 	= shift() + gl.grid.PTtoPX(box[i].h, false)
			document.body.appendChild(test)
		}
	}
}


