


export default {
    
    // splitQuery('parent.child.element')
    splitQuery (query) {
        var levels = query.split('.')
        return {
            level : levels,
            last  : levels.length - 1
        }
    },

    // level({id: [10, 15]}, splitQuery('id.0'), 20); -> {id: [20, 15]}
    level (object, query, value) {
	    var path = object
	    for (var n = 0; n < query.last; n ++)
	    	path = path[query.level[n]]
	    if (value) {
		    path[query.level[query.last]] = value
		} else {
			return path[query.level[query.last]]
		}
    },

    // map(workspaces, 'workspace.items.1')
    map (array, query) {
        var levels = this.splitQuery(query)
        return array.map((list => this.level(list, levels)).bind(this))
    },

    // var bundle = find(workspaces, {id: id});
    find (array, query) {
	    var output = array.slice()
        for (var i in query) {
            var temp = []
            var map = this.map(output, i)
            for (var n = 0; n < map.length; n ++)
                if (map[n] == query[i]) temp.push(output[n])
            output = temp.slice()
        }
        return output
    },

    // var deleted = del(workspaces, {'title.color': color});
    del (array, query) {
        var deleted = this.find(array, query)
        deleted.forEach((found) => array.splice(array.indexOf(found), 1));
        return deleted;
    },

	// updateColumn([{id: 15}, {id: 30}], {id: [20, 15]}); -> [{id: 20}, {id: 15}]
    updateColumn (array, query) {
	    for (var i in query) {
	        if (array.length == query[i].length) {
                var levels = this.splitQuery(i)
	            array.forEach(((object, index) =>
                    this.level(object, levels, query[i][index])).bind(this))
	        } else {
	            console.log('different lenghtes')
	        }
        }
    },
    
    //filterMap(workspaces, {_id, 'id', alias: 'name'});
    filterMap (array, keys) {
    	var output = []
    	array.forEach((original) => {
	    	var object = {}
	    	for (var key in keys) 
	    		object[keys[key]] = original[key]
	    	output.push(object)
    	})
    	return output
    },
	
	// var buffer = new Buffer(10) then var value = buffer.get(23.445) 
    buffer : class {

		constructor (size) {
        	this.array  = new Array ();
        	this.size   = size;
        }

        get (value) {
            var sum    = 0;
            var length = this.array.length;
            if (length > this.size) this.array.shift();
            this.array.push(value);
            for (var i = 0; i < length; i ++) 
            	if (isFinite(this.array[i])) sum += parseFloat(this.array[i])
            return sum / length;
        }
    }
}


