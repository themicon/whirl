/* REQUIRED TO GENERATE CORRECT GLOB OF STYLUS FILES WITHOUT USER TOUCHING SOURCE */
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
var env = 'public/',
  pkg   = require('./package.json');
module.exports = {
  pkg: {
    name: pkg.name
  },
  pluginOpts: {
    browserSync: {
      port   : 1987,
      server : {
        baseDir: env
      }
    },
    coffee: {
      bare: true
    },
    gSize: {
      showFiles: true
    },
    jade: {
      pretty: true,
      data  : {
        name       : pkg.name,
        description: pkg.description
      }
    },
    load: {
      rename: {
        'gulp-gh-pages'    : 'deploy',
        'gulp-util'        : 'gUtil',
        'gulp-minify-css'  : 'minify',
        'gulp-autoprefixer': 'prefix'
      }
    },
    minify: {
      keepSpecialComments: 1
    },
    prefix: [
      'last 3 versions',
      'Blackberry 10',
      'Android 3',
      'Android 4'
    ],
    rename: {
      suffix: '.min'
    },
    stylint: {
      reporter: 'stylint-stylish'
    },
    uglify: {
      preserveComments: 'license'
    },
    wrap: '(function() { <%= contents %> }());'
  },
  paths: {
    base: env,
    sources: {
      docs     : 'src/jade/*.jade',
      markup   : 'src/jade/**/*.jade',
      overwatch: env + '**/*.{html,js,css}',
      scripts  : 'src/coffee/**/*.coffee',
      styles   : 'src/stylus/**/*.stylus'
    },
    destinations: {
      dist: './dist',
      css : env + 'css/',
      html: env,
      js  : env + 'js/'
    }
  }
};
