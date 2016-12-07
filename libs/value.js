


export default {
    
    exists (val) {
        return typeof val !== 'undefined'
    },
    
    isBool (val) {
        return typeof val === "boolean"
    },
    
    isNum (val) {
        return typeof val === 'number'
    },
    
    isStr (val) {
        return typeof val === 'string' || val instanceof String
    },
    
    isArr (val) {
        return Array.isArray(val)
    },
    
    isDom (val) {
        return val instanceof Element
    },
    
    isObj (val) {
        return typeof val == 'object' && val.constructor == Object
    },
    
    isFn (val) {
        return typeof val === 'function'
    },
	
	isVec (val) {
		return val.position || val.opposite
	},
	
	isDim (val) {
		return val.l || val.r
	},
}


