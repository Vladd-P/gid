export function handleRemovableItem(e) {
	if (e.target.closest('.removable-element__button')) {
		let removableElement = e.target.closest('.removable-element');

		removableElement?.remove();
	}
}


document.addEventListener('change', e => {
	const allLabel = e.target.closest('.checking-items__all')
	const pointLabel = e.target.closest('.checking-items__point')

	if (!allLabel && !pointLabel) return

	const block = e.target.closest('.checking-items')
	
	if (!block) return

	const allInput = block.querySelector('.checking-items__all input')
	const pointInputs = [...block.querySelectorAll('.checking-items__point input')]

	if (allLabel) {
		const state = allInput.checked

		pointInputs.forEach(i => {
			i.checked = state
		})

		return
	}

	if (pointLabel) {
		const allChecked = pointInputs.every(i => i.checked)
		allInput.checked = allChecked
	}
})