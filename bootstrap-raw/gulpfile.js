'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync').create();
var rimraf = require('rimraf');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var panini = require('panini');



function scss() {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browser.reload({ stream: true }));
};


function server(done) {
    browser.init({
        server: {
            baseDir: 'dist'
        }
    });
    done();
}

function reload(done) {
    browser.reload();
    done();
}

// Copy all static images
function images() {
    return gulp.src("src/assets/img/**/*")
        // Pass in options to the task
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('dist/assets/img'));
};


function watch(){
    gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', scss);
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(js, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  
}

function clean(done) {
    rimraf('dist', done);
}

// Copy page templates into finished HTML files
function pages() {
    return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            data: 'src/data/',
            helpers: 'src/helpers/'
        }))
        .pipe(gulp.dest("dist"));
}

function resetPages(done) {
    panini.refresh();
    done();
  }

function js() {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/js'));
};

gulp.task('build',
    gulp.series(clean, gulp.parallel(pages, js, scss, images)));

gulp.task('default',
    gulp.series('build', server, watch));