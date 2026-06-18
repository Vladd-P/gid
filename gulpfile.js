import gulp from 'gulp';
const {src, dest, series, watch, parallel} = gulp
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
const server = browserSync.create();
import pug from 'gulp-pug';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import formatHtml from 'gulp-format-html';
import gcmq from 'gulp-group-css-media-queries';
import {deleteAsync} from 'del';
import svgSprite from 'gulp-svg-sprite';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import replace from 'gulp-replace';

import through2 from 'through2';
export const woff2 = async () => {
	const ttf2woff2 = (await import('ttf2woff2')).default;

	return gulp.src('src/fonts/*.ttf', {
		encoding: false, // Отключаем преобразование в UTF-8
		removeBOM: false // Отключаем удаление BOM-маркера
	})
		.pipe(through2.obj((file, _, cb) => {
			if (file.isBuffer()) {
				try {
					file.contents = Buffer.from(ttf2woff2(file.contents));
					file.extname = '.woff2';
					console.log(`Success: ${file.stem}.ttf → ${file.stem}.woff2`);
				} catch (err) {
					console.error(`Error converting ${file.basename}:`, err);
				}
			}
			cb(null, file);
		}))
		.pipe(gulp.dest('dist/fonts'));
};


export const clean = () => deleteAsync([
	'dist/**', // Всё содержимое dist
	'!dist/fonts', // Исключаем папку fonts
	'!dist/fonts/**/*', // И все файлы внутри
 ]);

function PugHtml() {
	return src('src/pug/pages/*.pug')
		.pipe(pug())
		.pipe(formatHtml({
			indent_char: '\t', 
			indent_size: 1,
			indent_inner_html: true,
		}))
		.pipe(dest('dist'))
		// .on('end', server.reload);
}

function styles() {
	return src('src/styles/main.scss', {allowEmpty: true, sourcemaps: true})
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({cascade: false}))
		.pipe(dest('dist/css', {sourcemaps: '.'}))
		.pipe(browserSync.stream());
}

function stylesBuild() {
	return src('src/styles/main.scss', {allowEmpty: true})
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({cascade: false}))
		.pipe(gcmq())
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream());
}

const stylesLibs = [
	'node_modules/swiper/swiper-bundle.min.css',
	'node_modules/@fancyapps/ui/dist/fancybox/fancybox.css',
	'node_modules/bootstrap/dist/css/bootstrap.min.css',
	'node_modules/tom-select/dist/css/tom-select.bootstrap4.min.css',
]

function copyStyles() {
	return src(stylesLibs, {allowEmpty: true})
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream());
}

function copyImgConvert() {
    const srcPath = 'src/img/**/*.*';
    const destPath = 'dist/img/';

    return src([srcPath, '!src/img/**/*.webp', '!src/img/**/*.svg'], { 
        encoding: false, 
        base: 'src/img' 
    })
    .pipe(newer({
        dest: destPath,
        ext: '.webp' // Сравниваем с .webp файлами
    }))
    .pipe(webp({
        quality: 100,        // Качество от 0 до 100 (начни с 85)
        method: 6,          // Метод сжатия (от 0 до 6, 6 - лучше)
        preset: 'photo'     // Профиль для фотографий
    }))
    .pipe(dest(destPath))
    .pipe(server.stream());
}

function copyImg() {
	return src(['src/img/*.svg'], {encoding: false})
	.pipe(dest('dist/img/'))
	.on('end', server.reload);
}

function icons() {
	return src('src/img/icons/*.svg')
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../sprite.svg'
				}
			}
		})) 
		// .pipe(replace(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"'))
		// .pipe(replace(/fill="white"|fill="#fff"/g, 'fill="currentColor"'))
		.pipe(dest('dist/img/icons'));
}

const jsFiles = [
	'node_modules/swiper/swiper-bundle.min.js',
	'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
	'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/tom-select/dist/js/tom-select.complete.min.js',
	'node_modules/inputmask/dist/inputmask.min.js',
	'node_modules/@fullcalendar/dist/inputmask.min.js',
];

function scripts() {
	return src(jsFiles, {allowEmpty: true})
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream());
}

function webpackJs(cb) {
	webpack(webpackConfig, (err, stats) => {
		if (err) {
			console.error('Webpack Error:', err);
		}
		if (stats.hasErrors()) {
			console.error('Webpack Stats Error:', stats.toString({ colors: true }));
		}
		browserSync.reload();
		cb();
	});
}

function serve(done) {
	browserSync.init({
		server: {
			baseDir: "./dist"
		},
	});
	
	done();
}

function watchAll() {
	watch('src/styles/**/*.scss', series(styles))
	watch('src/pug/**/*.pug', series(PugHtml));
	watch('dist/**/*.html').on('change', browserSync.reload);
	watch('src/img/**/*.*', series(copyImgConvert))
	watch('src/img/**/*.svg', series(copyImg))
	watch('src/img/icons/*.svg', series(icons))
	watch('src/js/**/*.js', series(webpackJs))
}



export default series(parallel(copyImgConvert, copyImg, PugHtml, styles, copyStyles, scripts, webpackJs, icons), serve, watchAll)
gulp.task('build', series(clean, parallel(copyImgConvert, copyImg, copyStyles, stylesBuild, scripts, webpackJs, icons), PugHtml));
