const hamburger = document.querySelector('.c-hamburger');
const nav = document.querySelector('.menu-mobile');

if (hamburger && nav) {
	hamburger.addEventListener('click', function (e) {
		e.preventDefault();
		document.body.classList.add('menu-open');
	});

	window.addEventListener('resize', closeMobMenu);

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeMobMenu();
	});

	document.addEventListener('click', e => {
		if (!document.body.classList.contains('menu-open')) return;

		if (!e.target.closest('.menu-mobile') && !e.target.closest('.c-hamburger')) {
			closeMobMenu();
			return;
		}

		if (e.target.closest('.menu-motile__close')) {
			closeMobMenu();
			return;
		}
	});

	function closeMobMenu() {
		document.body.classList.remove('menu-open');
	}
}
