var gulp       = require('gulp'),
  gConfig      = require('../gulp-config'),
  utils        = require('./utils'),
  opts         = gConfig.pluginOpts,
  env          = utils.getEnv(),
  src          = gConfig.paths.sources,
  dest         = gConfig.paths.destinations,
  plugins      = require('gulp-load-plugins')(opts.load),
  autoprefixer = require('autoprefixer'),
  cssnano      = require('cssnano'),
  /* styles:lint */
  lint = function() {
    return gulp.src(src.styles.watch)
      .pipe(plugins.stylint(opts.stylint))
      .pipe(plugins.stylint.reporter());
  },
  /* styles:compile */
  compile = function() {
    const processsors = [
      autoprefixer({
        browsers: opts.prefix
      }),
      cssnano({
        core: false
      })
    ];
    var sr = (env.dist) ? src.dist.styles : src.styles.compile;
    return gulp.src(sr)
      .pipe(plugins.plumber())
      .pipe(plugins.stylus(opts.stylus))
      .pipe(plugins.postcss(processsors))
      .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
      .pipe(env.deploy ? plugins.gUtil.noop(): gulp.dest(env.dist ? dest.dist: dest.css))
      .pipe(plugins.postcss([
        cssnano()
      ]))
      .pipe(plugins.rename(opts.rename))
      .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
      .pipe(gulp.dest(env.dist ? dest.dist: dest.css));
  },
  exp = function() {
    return gulp.src('src/whirl/whirls/*.styl')
      .pipe(plugins.stylus(opts.stylus))
      .pipe(gulp.dest('export'));
  },
  /* styles:watch */
  watch = function() {
    gulp.watch(src.styles.watch, ['styles:compile']);
  };

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch,
  export : exp
};
