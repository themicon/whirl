var gulp      = require('gulp'),
  fs          = require('fs'),
  gConfig     = require('./gulp-config'),
  browserSync = require('browser-sync'),
  opts        = gConfig.pluginOpts,
  plugins     = require('gulp-load-plugins')(opts.load),
  isDist      = (plugins.gUtil.env.dist)    ? true: false,
  isDev       = (plugins.gUtil.env.dev)     ? true: false,
  isDeploy    = (plugins.gUtil.env.deploy)  ? true: false,
  isMapped    = (plugins.gUtil.env.map)     ? true: false,
  isStat      = (plugins.gUtil.env.stat)    ? true: false,
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations;

/*
  serve; creates local static livereload server using browser-sync.
*/
gulp.task('serve', ['compile'], function(event) {
  browserSync(opts.browserSync);
  return gulp.watch(src.overwatch).on('change', function(file) {
    if (file.path.indexOf('.css') === -1) browserSync.reload();
  });
});

/*
  scripts:compile/scripts:watch

  watch for changes to scriptsScript files then compile app JavaScript file
  from source, concatenating and uglifying content and publishing output based on env flag. For example, if we want sourcemaps we can output our individual JS files and the sourcemap for them to the desired directory by using the --map flag.
*/
gulp.task('scripts:lint', function() {
  return gulp.src(src.scripts)
    .pipe(plugins.coffeelint())
    .pipe(plugins.coffeelint.reporter());
});
gulp.task('scripts:compile', ['scripts:lint'], function(event) {
  return gulp.src(src.scripts)
    .pipe(plugins.plumber())
    .pipe(plugins.coffee(opts.coffee))
    .pipe(isMapped ? gulp.dest(dest.js): plugins.gUtil.noop())
    .pipe(isMapped ? plugins.sourcemaps.init(): plugins.gUtil.noop())
    .pipe(plugins.concat(gConfig.pkg.name + '.js'))
    .pipe(plugins.wrap(opts.wrap))
    .pipe(plugins.header(fs.readFileSync('./src/LICENSE', 'utf-8')))
    .pipe(isStat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(isDeploy ? plugins.gUtil.noop(): gulp.dest(isDist ? dest.dist: dest.js))
    .pipe(plugins.uglify(opts.uglify))
    .pipe(plugins.rename(opts.rename))
    .pipe(isMapped ? plugins.sourcemaps.write('./'): plugins.gUtil.noop())
    .pipe(isStat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(isDist ? dest.dist: dest.js));
});
gulp.task('scripts:watch', function(event) {
  gulp.watch(src.scripts, ['scripts:compile']);
});

/*
  styles:compile/styles:watch

  watch for changes to styles files then compile stylesheet from source
  auto prefixing content and generating output based on env flag.
*/
gulp.task('styles:lint', function() {
  return gulp.src(src.styles)
    .pipe(plugins.stylint(opts.stylint))
    .pipe(plugins.stylint.reporter());
});
gulp.task('styles:compile', ['styles:lint'], function(event) {
  return gulp.src(src.styles)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(gConfig.pkg.name + '.stylus'))
    .pipe(plugins.stylus())
    .pipe(isStat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(plugins.header(fs.readFileSync('./src/LICENSE', 'utf-8')))
    .pipe(isDeploy ? plugins.gUtil.noop(): gulp.dest(isDist ? destination.dist: dest.css))
    .pipe(plugins.prefix(opts.prefix))
    .pipe(plugins.minify())
    .pipe(plugins.rename(opts.rename))
    .pipe(isStat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(isDist ? destination.dist: dest.css))
    .pipe(browserSync.stream());
});
gulp.task('styles:watch', function(event) {
  gulp.watch(src.styles, ['styles:compile']);
});

/*
  markup:compile/markup:watch

  watch for all markup file changes then compile
  page document files.
*/
gulp.task('markup:lint', function() {
  return gulp.src(src.markup)
    .pipe(plugins.jadelint());
});
gulp.task('markup:compile', function() {
  return gulp.src(src.docs)
    .pipe(plugins.plumber())
    .pipe(isDeploy ? plugins.jade(): plugins.jade(opts.jade))
    .pipe(gulp.dest(dest.html));
});
gulp.task('markup:watch', function(event){
  gulp.watch(src.markup, ['markup:compile']);
});

gulp.task('deploy', ['compile'], function(event) {
  isDeploy = true;
  return gulp.src(src.overwatch)
    .pipe(plugins.deploy());
});

gulp.task('compile', [
  'markup:compile',
  'styles:compile',
  'scripts:compile'
]);

gulp.task('watch', [
  'markup:watch',
  'styles:watch',
  'scripts:watch'
]);

var defaultTasks = isDeploy ? [
  'deploy'
]:[
  'serve',
  'watch'
];

gulp.task('default', defaultTasks);
// var gulp = require('gulp'),
//   jade = require('gulp-jade'),
//   connect = require('gulp-connect'),
//   plumber = require('gulp-plumber'),
//   watch = require('gulp-watch'),
//   less = require('gulp-less'),
//   sass = require('gulp-sass'),
//   clean = require('gulp-clean'),
//   concat = require('gulp-concat'),
//   prefix = require('gulp-autoprefixer'),
//   pkg = require('./package.json'),
//   config = require('./whirl-config.json'),
//   processSrc = [],
//   env = 'dist/',
//   sources = {
//     docs: "src/jade/index.jade",
//     templates: "src/jade/**/*.jade",
//     less: "src/less/**/*.less",
//     scss: "src/scss/**/*.scss",
//     buildCss: env + "**/*.css",
//     coreLess: "src/less/core.less",
//     coreScss: "src/scss/core.scss"
//   },
//   destinations = {
//     build: env,
//     overwatch: env + "**/*.*"
//   },
//   gatherSrc = function (sources, path, ext) {
//     for (var source in sources ) {
//       if (typeof(sources[source]) === 'object' && Object.keys(sources[source]).length > 0) {
//         var newPath = (path === undefined) ? source + '/' :path + source + '/';
//         gatherSrc(sources[source], newPath, ext);
//       } else if (sources[source] === true) {
//         processSrc.push('src/' + ext + '/whirls/' + path + source + '.' + ext);
//       }
//     }
//   };
// /***DEV TASKS***/
// gulp.task('dev', ["cleanup", "serve", "jade:build", "jade:watch", "less:build", "less:watch"]);
// /*SERVER*/
// gulp.task('serve', function(event) {
//   connect.server({
//     root: destinations.build,
//     port: 1987,
//     livereload: true
//   });
//   watch({glob: destinations.overwatch})
//     .pipe(connect.reload());
// });
// /*BUILD JADE*/
// gulp.task('jade:build', function(event) {
//   return gulp.src(sources.docs)
//     .pipe(plumber())
//     .pipe(jade({
//       pretty: true
//     }))
//     .pipe(gulp.dest(destinations.build));
// });
// /*WATCH JADE*/
// gulp.task('jade:watch', function(event) {
//   gulp.watch(sources.docs, ["jade:build"]);
// });
// /*WATCH LESS*/
// gulp.task('less:watch', function(event) {
//   watch({glob: sources.less}, function(files) {
//     return gulp.src(sources.less)
//       .pipe(plumber())
//       .pipe(concat(pkg.name + '.less'))
//       .pipe(less())
//       .pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
//       .pipe(gulp.dest(destinations.build));
//   });
// });
// /*WATCH SCSS*/
// gulp.task('scss:watch', function(event) {
//   watch({glob: sources.scss}, function(files) {
//     return gulp.src(sources.scss)
//       .pipe(plumber())
//       .pipe(concat(pkg.name + '.scss'))
//       .pipe(sass())
//       .pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
//       .pipe(gulp.dest(destinations.build));
//   });
// });
// /***/
// /*CLEANUP*/
// gulp.task('cleanup', function(event) {
//   return gulp.src(destinations.build)
//     .pipe(clean());
// });
// gulp.task('release', function(event) {
//   return gulp.src([sources.buildCss])
//     .pipe(gulp.dest(''));
// });
// /*RELEASE BUILD*/
// gulp.task('release:build', ["less:build", "release"]);
// /*BUILD LESS*/
// gulp.task('less:build', function(event) {
//   processSrc = [sources.coreLess];
//   gatherSrc(config.spins, undefined, 'less');
//   return gulp.src(processSrc)
//     .pipe(plumber())
//     .pipe(concat(pkg.name + '.less'))
//     .pipe(less())
//     .pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
//     .pipe(gulp.dest(destinations.build))
//     .pipe(concat(pkg.name + '.min.less'))
//     .pipe(less({
//       compress: true
//     }))
//     .pipe(gulp.dest(destinations.build));
// });
// gulp.task('scss:build', function(event) {
//   processSrc = [sources.coreScss];
//   gatherSrc(config.spins, undefined, 'scss');
//   return gulp.src(processSrc)
//     .pipe(plumber())
//     .pipe(concat(pkg.name + '.scss'))
//     .pipe(sass())
//     .pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
//     .pipe(gulp.dest(destinations.build))
//     .pipe(concat(pkg.name + '.min.scss'))
//     .pipe(sass({
//       style: "compressed"
//     }))
//     .pipe(gulp.dest(destinations.build));
// });
// /*DEFAULT TASK*/
// gulp.task('default', ["cleanup", "less:build"]);
