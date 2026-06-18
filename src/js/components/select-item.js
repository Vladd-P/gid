export function handleSelectItemClick(e) {
	const option = e.target.closest('[data-selecting-value]');
	if (!option) return;

	const value = option.dataset.selectingValue;
	if (!value) return;

	const select = option.closest('.selecting-value');
	if (!select) return;

	const display = select.querySelector('.selecting-value__view');
	if (!display) return;

	if ('value' in display) {
		display.value = value;
	} else {
		display.textContent = value;
	}
}