const gulp = require('gulp');
const header = require('gulp-header');
const pkg = require('./package.json');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const connect = require("gulp-connect");

const banner = `/*!
 * Distpicker v${pkg.version}
 * ${pkg.homepage}
 *
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license 
 *
 * Date: ${new Date().toISOString()}
 */
`;

gulp.task('build', () => {
	gulp.src('./cookie.js', {base: './'})
		.pipe(replace(/(\/\/.*)|(\/\*[\s\S]*?\*\/)/g, "")) 		// 去掉注释
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify())
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('server', ['build'], () => {
	connect.server({
		name: 'test',
		root: './',
		port: 8088
	});
});