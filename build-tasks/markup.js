var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  utils       = require('./utils'),
  opts        = gConfig.pluginOpts,
  env         = utils.getEnv(),
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  plugins     = require('gulp-load-plugins')(opts.load),
  fs          = require('fs'),
  /* markup:lint */
  lint = function() {
    return gulp.src(src.markup)
      .pipe(plugins.pugLint());
  },
  /* markup:compile */
  compile = function() {
    if (env.deploy && opts.pug.pretty) opts.pug.pretty = false;
    if (env.deploy) opts.pug.data.deploy = true;
    const whirls = JSON.parse(fs.readFileSync(`${process.cwd()}/whirl.config.json`, 'utf-8')).whirls;
    opts.pug.data.whirls = whirls;
    return gulp.src(src.markup)
      .pipe(plugins.plumber())
      .pipe(plugins.pug(opts.pug))
      .pipe(gulp.dest(dest.html));
  },
  /* markup:watch */
  watch = function() {
    gulp.watch(src.markup, ['markup:compile']);
  };

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch
};
