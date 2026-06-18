/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/components/search.js
const $input = $('.page-header__search-body input[type="search"]');

if ($input.length) {
	$input.on('input', function () {
		const $search = $(this).closest('.page-header__search');
		const $toggle = $search.find('.dropdown-toggle');
		const $menu   = $search.find('.dropdown-menu');
		const $items  = $menu.find('.dropdown-item');

		const query = this.value.trim().toLowerCase();
		let hasMatch = false;

		$items.each(function () {
			const match = $(this).text().toLowerCase().includes(query);
			$(this).toggle(match);
			if (match) hasMatch = true;
		});

		if (query.length >= 2 && hasMatch) {
			$toggle.dropdown('show');
		} else {
			$toggle.dropdown('hide');
		}
	});
}
;// ./src/js/components/sliders.js
const sliderNews = document.querySelector('.slider-news');

if (sliderNews) {
	new Swiper(sliderNews, {
		spaceBetween: 30,	
		slidesPerView: 'auto',
	});	
}


const sliderEvents = document.querySelector('.slider-events');

if (sliderEvents) {
	new Swiper(sliderEvents, {
		spaceBetween: 20,	
		slidesPerView: 'auto',
	});	
}


const sliderLastViews = document.querySelector('.last-views__slider');

if (sliderLastViews) {
	new Swiper(sliderLastViews, {
		spaceBetween: 10,	
		slidesPerView: 'auto',
	});	
}


const comments = document.querySelector('.comments');

if (comments) {
	const commentsSlider = comments.querySelector('.comments__swiper');

	new Swiper(commentsSlider, {
		spaceBetween: 20,	
		slidesPerView: 'auto',
		navigation: {
			prevEl: comments.querySelector('.swiper-button-prev'),
			nextEl: comments.querySelector('.swiper-button-next'),
		},		
	});	
}


const newsCategories = document.querySelector('.news-categories');

if (newsCategories) {
	new Swiper(newsCategories, {
		spaceBetween: 10,	
		slidesPerView: 'auto',
	});	
}


const cardServiceSliderThumbs = document.querySelector('.card-service__slider-thumbs');
const cardServiceSliderBig = document.querySelector('.card-service__slider');

if (cardServiceSliderThumbs && cardServiceSliderBig) {
	let thumbsNumber = 7;
	let showAllSlides = cardServiceSliderThumbs.querySelector('.card-service__slider-gallery span');

	const cardServiceSliderThumbsObj = new Swiper(cardServiceSliderThumbs, {
		spaceBetween: 10,	
		slidesPerView: 'auto',
		breakpoints: {
			576: {
				slidesPerView: thumbsNumber,
			},
		},		
	});	

	new Swiper(cardServiceSliderBig, {
		spaceBetween: 10,	
		navigation: {
			prevEl: cardServiceSliderBig.querySelector('.swiper-button-prev'),
			nextEl: cardServiceSliderBig.querySelector('.swiper-button-next'),
		},
      pagination: {
        el: cardServiceSliderBig.querySelector('.swiper-pagination'),
        type: "fraction",
      },		
      thumbs: {
        swiper: cardServiceSliderThumbsObj,
      }				
	});

	if (showAllSlides) {
		showAllSlides.innerText = cardServiceSliderBig.querySelectorAll('.swiper-slide').length - thumbsNumber;
	}
}

const cardSlider = document.querySelector('.card-slider-wrapper');

if (cardSlider) {
	new Swiper(cardSlider.querySelector('.swiper'), {
		spaceBetween: 10,	
		slidesPerView: 'auto',
		navigation: {
			prevEl: cardSlider.querySelector('.swiper-button-prev'),
			nextEl: cardSlider.querySelector('.swiper-button-next'),
		},		
	});	
}

let showAllSlides = document.querySelector('.swiper-slide--more');

if (showAllSlides) {
	let slider = showAllSlides.closest('.swiper');
	let slidesOver = slider.querySelectorAll('.swiper-slide').length - (+showAllSlides.dataset.slides);

	slidesOver > 0 ? showAllSlides.querySelector('span').innerText = slidesOver : showAllSlides.classList.remove('swiper-slide--more')	
}

const certSlider = document.querySelector('.card-clinic__swiper-sert')

if (certSlider) {
	new Swiper(certSlider.querySelector('.swiper'), {
		spaceBetween: 20,	
		slidesPerView: 'auto',
		navigation: {
			prevEl: certSlider.querySelector('.swiper-button-prev'),
			nextEl: certSlider.querySelector('.swiper-button-next'),
		},		
	});		
}


const packetsSlider = document.querySelector('.acc-packets-slider')

if (packetsSlider) {
	new Swiper(packetsSlider.querySelector('.swiper'), {
		spaceBetween: 10,	
		slidesPerView: 1,
		navigation: {
			prevEl: packetsSlider.querySelector('.swiper-button-prev'),
			nextEl: packetsSlider.querySelector('.swiper-button-next'),
		},	
		breakpoints: {
			400: {
				slidesPerView: 'auto',
			},
			1200: {
				slidesPerView: 3,
			},
		},				
	});		
}


const creditsSlider = document.querySelector('.acc-credits__slider')

if (creditsSlider) {
	new Swiper(creditsSlider, {
		spaceBetween: 15,	
		slidesPerView: 'auto',			
	});		
}
;// ./src/js/components/selects.js
document.querySelectorAll('.select-styled').forEach(select => {
	new TomSelect(select, {
		sortField: {
			field: "text",
			direction: "asc"
		}
	});
});


document.querySelectorAll('.select-styled-addr').forEach(select => {
	new TomSelect(select, {
		sortField: {
			field: "text",
			direction: "asc"
		},
		render: {
			option(item, escape) {
				return `<div class="ts-option"> <div class="fw-500">${escape(item.name)}</div><small>${escape(item.addr)}</small></div>`
			},
			item(item, escape) {
				return `<div class="ts-item"><div class="fw-500">${escape(item.name)}</div><small>${escape(item.addr)}</small></div>`
			}
		}		
	});
});
;// ./src/js/components/numbers.js
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

;// ./src/js/components/tooltip.js
$('[data-toggle="tooltip"]').tooltip();
;// ./src/js/components/menu-mobile.js
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

;// ./src/js/components/fancybox.js
if (document.querySelector("[data-fancybox-img]")) {
	Fancybox.bind("[data-fancybox-img]");	
}

if (document.querySelector("[data-fancybox]")) {
	Fancybox.bind("[data-fancybox]", {
		closeButton: false,
		groupAttr: false
	});	
}


function handleFancyboxSwitch(e) {
	const link = e.target.closest("[data-fancybox-switch]");
	if (!link) return false;

	e.preventDefault();

	const target = link.getAttribute("href") || link.getAttribute("data-src");
	
	if (!target) return true;

	const instance = Fancybox.getInstance();

	if (instance) {
		const newItems = [{ src: target, type: "inline" }];

		instance.close(); 

		setTimeout(() => {
			Fancybox.show(newItems, {
				closeButton: false,
				groupAttr: false
			});
		}, 300); 
	} 
	
	else {
		Fancybox.show([{ src: target, type: "inline" }], {
			closeButton: false,
			groupAttr: false
		});
	}
}
;// ./src/js/components/form-controls.js
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
;// ./src/js/components/account-actions.js
function handleRemovableItem(e) {
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
;// ./src/js/components/select-item.js
function handleSelectItemClick(e) {
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
;// ./src/js/components/tabs.js
function handleTabsClick(e) {
	if (e.target.closest('[data-tabs]')) {
		const $tab = e.target.closest('[data-tabs]');
		const isActive = $tab.classList.contains('active');
		const content = document.getElementById($tab.dataset.tabTarget);

		if (isActive) {
			$tab.classList.remove('active');
			if (content) content.classList.remove('active');
		} 
		
		else {
			const activeTab = document.querySelector(`.active[data-tabs=${$tab.dataset.tabs}]`);
			const activeContent = document.querySelector(`.active[data-tabs-content=${$tab.dataset.tabs}]`);

			if (activeTab) activeTab.classList.remove('active');
			if (activeContent) activeContent.classList.remove('active');

			$tab.classList.add('active');
			if (content) content.classList.add('active');
		}
	}
}
;// ./src/js/components/collapse.js
function handleCollapseClick(e) {
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


;// ./src/js/components/click-dispatcher.js






const clickHandlers = [
	handleSelectItemClick,
	handleTabsClick,
	handleCollapseClick,
	handleRemovableItem,
	handleFancyboxSwitch,
];


document.addEventListener('click', (e) => {
	clickHandlers.forEach(handler => {
		handler(e)
	});
})

;// ./src/js/main.js












/******/ })()
;
//# sourceMappingURL=main.js.map