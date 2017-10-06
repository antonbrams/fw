
import {val} from '../index'

// splitQuery('parent.child.element')
let splitQuery = (query) => {
	var levels = query.split('.')
	return {
		level : levels,
		last  : levels.length - 1
	}
}

// level({id: [10, 15]}, splitQuery('id.0'), 20); -> {id: [20, 15]}
let level = (object, query, value) => {
	var path = object
	for (var n = 0; n < query.last; n ++)
		path = path[query.level[n]]
	if (value)
		path[query.level[query.last]] = value
	else 
		return path[query.level[query.last]]
}

// map(workspaces, 'workspace.items.1')
export let map = (array, query) => {
	var levels = this.splitQuery(query)
	return array.map(list => this.level(list, levels))
}

// var bundle = find(workspaces, {id: id});
export let find = (array, query) => {
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
}

// var deleted = del(workspaces, {'title.color': color});
export let remove = (array, query) => {
	if (val.isObj(query))
		return this
			.find(array, query)
			.forEach(found => array.splice(array.indexOf(found), 1))
	else 
		return array.splice(array.indexOf(query), 1)
}

// updateColumn([{id: 15}, {id: 30}], {id: [20, 15]}); -> [{id: 20}, {id: 15}]
export let updateColumn = (array, query) => {
	for (var i in query)
		if (array.length == query[i].length) {
			var levels = this.splitQuery(i)
			array.forEach((object, index) =>
				this.level(object, levels, query[i][index]))
		} else console.log('different lenghtes')
}

//filterMap(workspaces, {_id, 'id', alias: 'name'});
export let filterMap = (array, keys) => {
	var output = []
	array.forEach(original => {
		var object = {}
		for (var key in keys)
			object[keys[key]] = original[key]
		output.push(object)
	})
	return output
}
