var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  src         = gConfig.paths.sources,
  opts        = gConfig.pluginOpts,
  plugins     = require('gulp-load-plugins')(opts.load),
  /* deploy */
  run = function() {
    /**
      * Just sends a stream of files for deployment.
      * Cherry pick what we want here within config.
    */
    return gulp.src(src.deployment)
      .pipe(plugins.deploy());
  };

module.exports = {
  run: run
};
