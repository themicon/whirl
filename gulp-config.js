var publicPath = 'public/',
  pkg   = require('./package.json');
  // Have to set this as the @scope is in place for npm
  pkg.name = 'whirl';
module.exports = {
  pkg: {
    name: pkg.name
  },
  pluginOpts: {
    browserSync: {
      online : false,
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
    stylus: {
      'include css': true
    },
    stylint: {
      reporter: 'stylint-stylish'
    },
    wrap: '(function() { <%= contents %> }());'
  },
  paths: {
    base: publicPath,
    sources: {
      markup   : 'src/markup/*.pug',
      overwatch: publicPath + '**/*.{html,js,css}',
      scripts  : 'src/**/*.js',
      styles   : {
        watch  : 'src/**/*.styl',
        compile: [
          'src/style/**/*.styl',
          'src/' + pkg.name + '/' + pkg.name + '.styl'
        ]
      },
      deployment: [
        publicPath + 'index.html',
        publicPath + 'style/demo.min.css',
        publicPath + 'style/whirl.min.css',
        publicPath + 'script/demo.min.js'
      ]
    },
    destinations: {
      dist: './dist',
      css : publicPath + 'style/',
      html: publicPath,
      js  : publicPath + 'script/'
    }
  }
};
