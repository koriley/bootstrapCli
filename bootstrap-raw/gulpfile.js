'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('src/assets/scss/app.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('dist/assets/css'));
});