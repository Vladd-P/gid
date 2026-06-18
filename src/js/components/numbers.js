function animateCounter(el, target) {
	let current = 0;
	const step = target / (1000 / 16);

	function tick() {
		current += step;
		if (current >= target) {
			el.textContent = target;
			return;
		}
		el.textContent = current | 0;
		requestAnimationFrame(tick);
	}

	tick();
}

const observer = new IntersectionObserver((entries, obs) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const container = entry.target;
			container.querySelectorAll('[data-counter]').forEach(el => {
				const target = Number(el.dataset.counter);
				if (!target) return;
				animateCounter(el, target);
			});
			obs.unobserve(container);
		}
	});
}, { threshold: 0.3 });

document.querySelectorAll('.numbers-increment').forEach(container => {
	observer.observe(container);
});
