Whirl
===
![alt tag](https://raw.github.com/jh3y/pics/master/whirl/whirl.gif)

CSS loading animations with minimal effort.

## Usage

1. Include [`whirl.css`](LINK) tweaking where necessary.
2. Add and remove appropriate CSS classes to your elements when necessary to show animations.


__NOTE::__ Some animations require an extra placeholder element to be in the DOM where creating them with just two pseudo elements is not possible. This will need to be placed within the container that is showing a loading animation and have the class `TBC` (TODO: Define placeholder class).

__NOTE::__ There is also a JavaScript helper available. If showing an animation that requires a placeholder element then do not worry about placing this in your markup as the helper will do this for you.

That's it!

## Examples

```html
  <div class="whirl duo">
    This content is taking ages to load.
  </div>
```

```html
  <div class="whirl roller">
    <div class="while__placeholder"></div>
    This content is taking even longer to load...
  </div>
```

```js
  var myWhirl = new Whirl('.container', 'roller');
  myWhirl.show();
  myWhirl.hide();
```

## Options
<< INCLUDE THE RELEVANT CLASSES AS SEEN IN THE DEMO >>

By default, you will always need `whirl`.

## Tweaking/Developing
I am fully aware that my styling of these animations aren't to everyones tastes and also that sometimes positioning won't be suitable etc. therefore it is likely you'll have to tweak the stylesheet to get the colors you want etc.

### Modularity, custom builds and gulp.js
I have recently re-implemented whirl to make use of __gulp.js__.

In order to use the tasks I've put in place it is presumed you will already have `npm` and `gulp` installed.

Then you need to clone the repo

    git clone https://github.com/jh3y/whirl

And then run

    npm install

This makes it easier to run custom builds of whirl. You simply modify the __whirl-config.json__ file setting different spins to either true or false and then run the gulp task for your chosen extension language.

The available tasks are

* `gulp less:build` - will build whirl using less source files.
* `gulp scss:build` - will build whirl using scss source files.
* `gulp cleanup` - will clean out the build directory.
* `gulp dev` - will set up a static server with livereload at `localhost:1987`. This particular task makes use of `src/jade/index.jade` to output a sandbox demo to develop against.
* `gulp` - the default task will execute a cleanup followed by a less build.

You can of course tweak the gulpfile to your own needs.

#### How does this work?
Not surprisingly it's real simple! :)

whirl makes use of CSS pseudo elements. It uses `:before` to provide an overlay effect if required and `:after` to show the animated spinner/bar etc.

making use of pseudo elements means that we can add whirl loading animations to any existing element on our page without being intrusive just by adding some classes as long as the elements pseudo elements aren't currently in use.

#### Contributing

Any suggestions, improvements or issues are welcome. :)

@jh3y

#### License

MIT

Copyright 2014 [@jh3y](https://github.com/jh3y)
