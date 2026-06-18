export function handleCollapseClick(e) {
	if (e.target.closest('.collapse-custom__btn')) {
		let el = e.target.closest('.collapse-custom'), elContent = el.querySelector('.collapse-custom__content');

		if (el.dataset.accordion) {
			accordion = document.querySelectorAll(`[data-accordion=${el.dataset.accordion}]`);
		}

		if (el.classList.contains('open')) {
			el.classList.remove('open');
			elContent.style.maxHeight = '';
		} else {
			if (el.dataset.accordion) {
				accordion.forEach(element => {
					element.classList.remove('open');
					element.querySelector('.collapse-custom__content').style.maxHeight = '';
				});
			}
			el.classList.add('open');
			elContent.style.maxHeight = elContent.scrollHeight + 'px';

			let $elParent = el.closest('.collapse-custom__content');
			
			if ($elParent) {
				setTimeout(() => {
					$elParent.style.maxHeight = $elParent.scrollHeight + 'px';
				}, 250);
			}
		}
	}
}

