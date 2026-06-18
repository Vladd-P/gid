let map = null; 

const points = [
	[55.7558, 37.6173], 
	[55.9119, 37.8415], 
	[55.8617, 37.4369], 
	[56.0097, 37.9210],
	[55.7325, 37.6440]  
];

const customSVG = `
<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_8420_98673)">
<circle cx="25" cy="20" r="15" fill="white"/>
<circle cx="25" cy="20" r="11.5" stroke="#814FF5" stroke-width="7"/>
<circle cx="25" cy="20" r="11.5" stroke="#4652FF" stroke-width="7"/>
</g>
<defs>
<filter id="filter0_d_8420_98673" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="5"/>
<feGaussianBlur stdDeviation="5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8420_98673"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8420_98673" result="shape"/>
</filter>
</defs>
</svg>
`;

function createMap() {
	if (!map) {
		map = new ymaps.Map('map-search-body', {
			center: [55.76, 37.64],
			zoom: 9
		});
	}

	map.geoObjects.removeAll();

	points.forEach(coords => {
		const placemark = new ymaps.Placemark(coords, {}, {
			iconLayout: 'default#image',
			iconImageHref: 'data:image/svg+xml;utf8,' + encodeURIComponent(customSVG),
			iconImageSize: [50, 50],
			iconImageOffset: [-25, -50]
		});

		map.geoObjects.add(placemark);
	});
}

ymaps.ready(createMap);

const filtersToggle = document.querySelector('.map-search__filters-showing');

if (filtersToggle) {
	let mapSearch = document.querySelector('.map-search');
	let isHided = document.documentElement.clientWidth < 768;

	filtersToggle.addEventListener('click', () => {
		if (isHided) {
			mapSearch.classList.remove('hide')
			mapSearch.classList.add('show')
		} else {
			mapSearch.classList.add('hide')
			mapSearch.classList.remove('show')			
		}
		isHided = !isHided;

		if (map) {
			map.container.fitToViewport(); 
		}
	})
}
