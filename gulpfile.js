const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
  root : './build',
  templates : {
    src : 'src/templates/**/*.pug',
    pages : 'src/templates/pages/*.pug',
    dest : 'build/'
  },
  styles : {
    src : 'src/styles/**/*.scss',
    dest : 'build/styles'
  },
  images : {
    src : 'src/images/**/*.*',
    dest : 'build/images'
  },
  scripts : {
    src : 'src/scripts/**/*.js',
    dest : 'build/scripts'
  }
};

//pug
function templates() {
  return gulp.src(paths.templates.pages)
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest(paths.root));
};

//scss
function styles() {
  return gulp.src('./src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.styles.dest))
};

//images
function images(){
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))

};

//scripts
function scripts() {
  return gulp.src('src/scripts/*.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
};

//del
function clean() {
  return del(paths.root)
};

//gulp watcher 
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
};

//browserSync
function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '**/*.*', browserSync.reload);
};

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, templates, images, scripts),
  gulp.parallel(watch, server)
));




