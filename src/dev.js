
export let debug = false

window.addEventListener('keyup', e => {
	if (debug) {
		if (e.key == 'D') document.body.classList.toggle('dev')
	}
})
