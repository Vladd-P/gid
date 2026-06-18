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