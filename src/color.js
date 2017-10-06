
export let rand = (a) => {
	var c = () => parseInt(Math.random() * 200 + 55)
	return  `rgba(${c()}, ${c()}, ${c()}, ${a? a: 0.3})`
}
