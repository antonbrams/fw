
export default {
	exists : val => typeof val !== 'undefined',
	isBool : val => typeof val === "boolean",
	isNum  : val => typeof val === 'number',
	isInt  : val => parseInt(val) === val,
	isStr  : val => typeof val === 'string' || val instanceof String,
	isArr  : val => Array.isArray(val),
	isDom  : val => val instanceof Element,
	isObj  : val => typeof val == 'object' && val.constructor == Object,
	isFn   : val => typeof val === 'function',
	isVec  : val => val.position || val.opposite,
	isDim  : val => val.l || val.r,
}
