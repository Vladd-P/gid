ymaps.ready(init);


function init() {
const coords = [55.78072, 37.69156]; // координаты "Москва, Изумрудная улица, 189"


const map = new ymaps.Map('map', {
center: coords,
zoom: 16
});


const svg = `
<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="20" fill="#e53935"/>
<circle cx="24" cy="24" r="8" fill="#fff"/>
</svg>
`;


const placemark = new ymaps.Placemark(coords, {}, {
iconLayout: 'default#image',
iconImageHref: 'data:image/svg+xml;utf8,' + encodeURIComponent(svg),
iconImageSize: [48, 48],
iconImageOffset: [-24, -48]
});


map.geoObjects.add(placemark);
}