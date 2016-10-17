var publicPath = 'public/',
  pkg   = require('./package.json');
module.exports = {
  pkg: {
    name: pkg.name
  },
  pluginOpts: {
    browserSync: {
      port   : 1987,
      server : {
        baseDir: publicPath
      }
    },
    babel: {
      presets: [ 'es2015' ]
    },
    gSize: {
      showFiles: true
    },
    pug: {
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
        'gulp-cssnano'     : 'minify',
        'gulp-autoprefixer': 'prefix'
      }
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
    wrap: '(function() { <%= contents %> }());'
  },
  paths: {
    base: publicPath,
    sources: {
      markup   : 'src/markup/**/*.pug',
      overwatch: publicPath + '**/*.{html,js,css}',
      scripts  : 'src/script/**/*.js',
      styles   : 'src/style/**/*.styl'
    },
    destinations: {
      dist: './dist',
      css : publicPath + 'css/',
      html: publicPath,
      js  : publicPath + 'js/'
    }
  }
};
