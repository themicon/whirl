var gulp = require('gulp'),
  jade = require('gulp-jade'),
  less =  require('gulp-less'),
  connect = require('gulp-connect'),
  coffee = require('gulp-coffee'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  watch = require('gulp-watch'),
  cssmin = require('gulp-cssmin'),
  deploy = require('gulp-gh-pages'),
  env = 'out/',
  sources = {
    jade: 'src/jade/**/*.jade',
    jadeCompile: 'src/jade/*.jade',
    less: 'src/less/**/*.less',
    overwatch: 'out/**/*.*',
    vendor: {
      scripts: [
        'src/vendor/jquery/dist/jquery.js',
        'src/vendor/modernizr/modernizr.js'
      ],
      styles: [
        'src/vendor/normalize.css/normalize.css',
        'src/vendor/bootstrap/dist/css/bootstrap.css',
        'src/vendor/csspinner/build/csspinner.min.css'
      ]
    }
  },
  destinations = {
    out: env,
    css: env + 'css/',
    js: env + 'js/',
    img: env + 'img/',
    fonts: env + 'fonts/',
    assets: env
  };

gulp.task('serve', function(event) {
  connect.server({
    root: destinations.out,
    port: 1987,
    livereload: true
  });
  watch({glob: sources.overwatch})
    .pipe(connect.reload());
});


gulp.task('less:compile', function(event) {
  return gulp.src(sources.less)
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(less())
    .pipe(gulp.dest(destinations.css))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destinations.css));
});
gulp.task('less:watch', function(event) {
  watch({glob: sources.less}, ['less:compile']);
});

gulp.task('jade:compile', function(event) {
  return gulp.src(sources.jadeCompile)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(destinations.out));
});
gulp.task('jade:watch', function(event) {
  watch({glob: sources.jade}, ['jade:compile']);
});

gulp.task('vendor:scripts', function(event) {
  return gulp.src(sources.vendor.scripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(destinations.js))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destinations.js));
});
gulp.task('vendor:styles', function(event) {
  return gulp.src(sources.vendor.styles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(destinations.css))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destinations.css));
});

gulp.task('vendor:publish', ['vendor:scripts', 'vendor:styles']);

gulp.task('build', ['vendor:publish', 'assets:publish', 'less:compile', 'jade:compile']);

gulp.task('deploy', ['build'], function () {
  return gulp.src("out/**/*.*")
    .pipe(deploy());
});

gulp.task('default', ['serve', 'vendor:publish', 'jade:watch', 'less:watch']);
