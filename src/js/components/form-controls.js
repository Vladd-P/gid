document.querySelectorAll('.input-link').forEach(linkBlock => {
	const input = linkBlock.querySelector('input');
	const anchor = linkBlock.querySelector('a');

	if (input && anchor) {
		input.addEventListener('input', () => {
			anchor.href = input.value;
		});
	}
});


if (document.querySelector("input[type='tel'")) {
	Inputmask("+7 (999)-999-99-99", {

	}).mask("input[type='tel'");
}