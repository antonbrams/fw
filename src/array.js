


import {val} from './fw'

export default {
    
    // _splitQuery('parent.child.element')
    _splitQuery (query) {
        var levels = query.split('.')
        return {
            level : levels,
            last  : levels.length - 1
        }
    },

    // level({id: [10, 15]}, _splitQuery('id.0'), 20); -> {id: [20, 15]}
    _level (object, query, value) {
	    var path = object
	    for (var n = 0; n < query.last; n ++)
	    	path = path[query.level[n]]
	    if (value)
		    path[query.level[query.last]] = value
		else 
            return path[query.level[query.last]]
    },

    // map(workspaces, 'workspace.items.1')
    map (array, query) {
        var levels = this._splitQuery(query)
        return array.map(list => this._level(list, levels))
    },

    // var bundle = find(workspaces, {id: id});
    find (array, query) {
	    var output = array.slice()
        for (var i in query) {
            var temp = []
            var map = this.map(output, i)
            for (var n = 0; n < map.length; n ++)
                if (map[n] == query[i]) 
                    temp.push(output[n])
            output = temp.slice()
        }
        return output
    },

    // var deleted = del(workspaces, {'title.color': color});
    delete (array, query) {
        var deleted
        if (val.isObj(query)) {
            deleted = this.find(array, query)
            deleted.forEach(found => array.splice(array.indexOf(found), 1))
        } else {
            var i = array.indexOf(query)
            deleted = array.splice(i, 1)
        }
        return deleted
    },

	// updateColumn([{id: 15}, {id: 30}], {id: [20, 15]}); -> [{id: 20}, {id: 15}]
    updateColumn (array, query) {
	    for (var i in query)
	        if (array.length == query[i].length) {
                var levels = this._splitQuery(i)
	            array.forEach((object, index) =>
                    this._level(object, levels, query[i][index]))
	        } else console.log('different lenghtes')
    },
    
    //filterMap(workspaces, {_id, 'id', alias: 'name'});
    filterMap (array, keys) {
    	var output = []
    	array.forEach(original => {
	    	var object = {}
	    	for (var key in keys)
                object[keys[key]] = original[key]
	    	output.push(object)
    	})
    	return output
    },
}


