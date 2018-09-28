'use strict';
var gulp = require('gulp');
// var sass = require('gulp-sass');
var browser = require('browser-sync').create();
var rimraf = require('rimraf');
// var webpack4 = require('webpack');
var webpackStream = require('webpack-stream');
var panini = require('panini');
var run = require("run-sequence");
var named = require("vinyl-named");
var yaml = require("js-yaml");
var plugins = require("gulp-load-plugins");
var fs = require("fs");

var $ = plugins({
    scope: ['dependencies', 'devDependencies', 'peerDependencies']
});

var { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}



//gulp 4.0
// gulp.task('build',
//     gulp.series(clean, gulp.parallel(pages, js, scss, images)));
//gulp 3.9
gulp.task('build', function () {
    run('sass', 'images', 'pages', 'js', 'server', 'watch');
});

//gulp 4.0    
// gulp.task('default',
//     gulp.series('build', server, watch));
//gulp 3.9
gulp.task('default', ['clean']);

//gulp 4.0
// function scss() {
//     return gulp.src('src/assets/scss/**/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('dist/assets/css'))
//         .pipe(browser.reload({
//             stream: true
//         }));
// }
//gulp 3.9
gulp.task('sass', function () {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe($.sass({
            includePaths: PATHS.sass
          }))
        .pipe(gulp.dest(PATHS.dist + '/assets/css'))
        .pipe(browser.reload({
            stream: true
        }));
});

//gulp 4.0
// function server(done) {
//     browser.init({
//         server: {
//             baseDir: 'dist'
//         }
//     });
//     done();
// }
//gulp 3.9
gulp.task('server', function () {
    browser.init({
        server: {
            baseDir: PATHS.dist
        }
    });

});

//gulp 4.0
// function reload(done) {
//     browser.reload();
//     done();
// }

// Copy all static images
//gulp 4.0
// function images() {
//     return gulp.src("src/assets/img/**/*")
//         // Pass in options to the task
//         .pipe(imagemin({
//             optimizationLevel: 5
//         }))
//         .pipe(gulp.dest('dist/assets/img'));
// };
//gulp 3.9
gulp.task('images', function () {
    return gulp.src("src/assets/img/**/*")
        // Pass in options to the task
        .pipe($.imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(PATHS.dist + '/assets/img'));
});

//gulp 4.0
// function watch() {
//     gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
//     gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
//     gulp.watch('src/assets/scss/**/*.scss').on('all', scss);
//     gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(js, browser.reload));
//     gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));

// }
//gulp 3.9
gulp.task('watch', function () {
    gulp.watch('src/pages/**/*.html', ['pages', browser.reload]);
    gulp.watch('src/{layouts,partials}/**/*.html', ['refresh', 'pages', browser.reload]);
    gulp.watch('src/assets/scss/**/*.scss', ['sass']);
    gulp.watch('src/assets/js/**/*.js', ['js', browser.reload]);
    // gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
});

gulp.task('refresh', function () {
    panini.refresh();
});
// gulp 4.0
// function clean(done) {
//     rimraf('dist', done);
// }
//gulp 3.9
gulp.task('clean', function () {
    return rimraf('dist', async function (done) {
        await gulp.start('build');
    });
});

// Copy page templates into finished HTML files
//gulp 4.0
gulp.task('pages', function () {
    return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            data: 'src/data/',
            helpers: 'src/helpers/'
        }))
        .pipe(gulp.dest(PATHS.dist));
});

//gulp 4.0
// function resetPages(done) {
//     panini.refresh();
//     done();
// }

//gulp 4.0
// function js() {
//     return gulp.src('src/assets/js/**/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('dist/assets/js'));
// };
//gulp 3.9

var webpackConfig = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader'
        }
      ]
    }
  }
gulp.task('js', function () {
    return gulp.src(PATHS.entries)
    // .pipe(named())
    // .pipe($.sourcemaps.init())
    // .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
});