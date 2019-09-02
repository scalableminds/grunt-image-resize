# [gulp](https://github.com/wearefractal/gulp)-image-resize [![Build Status](https://api.travis-ci.org/scalableminds/gulp-image-resize.svg?branch=master)](https://travis-ci.org/scalableminds/gulp-image-resize)


> Resizing images made easy - thanks to [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/).
> Fork of [grunt-image-resize](https://github.com/excellenteasy/grunt-image-resize).

## Install

Install with [npm](https://npmjs.org/package/gulp-image-resize)

```
npm install --save-dev gulp-image-resize
```

### GraphicsMagick or ImageMagick
Make sure GraphicsMagick or ImageMagick is installed on your system and properly set up in your `PATH`.

Ubuntu:

```shell
apt-get install imagemagick
apt-get install graphicsmagick
```

Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
brew install imagemagick
brew install graphicsmagick
```

Windows & others:

[http://www.imagemagick.org/script/binary-releases.php](http://www.imagemagick.org/script/binary-releases.php)

Confirm that ImageMagick is properly set up by executing `convert -help` in a terminal.


## Example

```js
const gulp = require('gulp');
const imageResize = require('gulp-image-resize');

gulp.task('default', () => 
  gulp
    .src('test.png')
    .pipe(imageResize({
      width : 100,
      height : 100,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist')));
```

## API

### imageResize(options)

#### options.width

Type: `Number`  
Default value: `0` (only if height is defined)

A number value that is passed as pixel or percentage value to imagemagick.


#### options.height

Type: `Number`  
Default value: `0` (only if width is defined)

A number value that is passed as pixel or percentage value to imagemagick.


#### options.upscale

Type: `Boolean`  
Default value: `false`

Determines whether images will be upscaled. If set to `false` (default), image will be copied instead of resized if it would be upscaled by resizing.


#### options.crop

Type: `Boolean`  
Default value: `false`

Determines whether images will be cropped after resizing to exactly match `options.width` and `options.height`.


#### options.gravity

Type: `String`  
Default value: `Center`  
Possible values: `NorthWest`, `North`, `NorthEast`, `West`, `Center`, `East`, `SouthWest`, `South`, `SouthEast`

When cropping images this sets the image gravity. Doesn't have any effect, if `options.crop` is `false`.


#### options.quality

Type: `Number`  
Default value: `1`

Determines the output quality of the resized image. Ranges from `0` (really bad) to `1` (almost lossless). Only applies to jpg images.


#### options.format

Type: `String`  
Default value: Format of the input file  
Possible values: `gif`, `png`, `jpeg` etc.

Override the output format of the processed file.

#### options.filter

Type: `String`  
Possible values: `Point`, `Box`, `Triangle`, `Hermite`, `Hanning`, `Hamming`, `Blackman`, `Gaussian`, `Quadratic`, `Cubic`, `Catrom`, `Mitchell`, `Lanczos`, `Bessel`, `Sinc`

Set the filter to use when resizing (e.g. Catrom is very good for reduction, while hermite is good for enlargement).

#### options.sharpen

Type: `Boolean | String`  
Default value: `false`

Set to `true` to apply a slight unsharp mask after resizing.
Or set a string to setup the unsharp. See [gm unsharp documentation](http://www.graphicsmagick.org/GraphicsMagick.html#details-unsharp). (e.g. '0.5x0.5+0.5+0.008')

#### options.samplingFactor

Type: `Array[Cr, Cb]`  
Possible values: `[2, 2]` for 4:2:2, `[1, 1]` for 4:1:1

Define chroma subsampling

#### options.noProfile

Type: `Boolean`  
Default value: `false`

Set to `true` to enforce removal of all embedded profile data like icc, exif, iptc, xmp
and so on. If source files represent e.g. untouched camera data or images optimized for
print this may decrease image size drastically. Therefore this is probably wanted in
cases where thumbnails are generated for web preview purposes. For details look for parameter _+profile "*"_ in the [gm profile documentation](http://www.graphicsmagick.org/GraphicsMagick.html#details-profile).

#### options.interlace

Type: `Boolean`  
Default value: `false`

Set to `true` to create interlaced images (scanline interlacing) from PNG, GIF or JPEG files
(also known as "progressive" JPEG). For details look for parameter _-interlace &lt;type&gt;_ with the type value set to
"Line" in the [gm profile documentation](http://www.graphicsmagick.org/GraphicsMagick.html#details-interlace).

#### options.imageMagick

Type: `Boolean`  
Default value: `false`

Set to `true` when using ImageMagick instead of GraphicsMagick.

#### options.background

Type: `String`  
Possible values: `none` to keep transparency, `beige` to set beige background, `#888` for gray.

Define background color (default is white), for example when converting SVG images to PNGs.
See [gm background documentation](http://www.graphicsmagick.org/GraphicsMagick.html#details-background)

#### options.flatten

Type: `Boolean`  
Default value: `false`

Combines image layers into one. Can be used for layered formats such as PNG. See [gm flatten documentation](http://www.graphicsmagick.org/GraphicsMagick.html#details-flatten).

#### options.percentage

Type: `Number`  
Default value: `null`

The value that you want the image to be scaled to.


#### options.cover

Type: `Boolean`
Default value: `false`

Determines whether images should cover the area specified by the width and height options. If set to `true`, the resized images will maintain aspect ratio by overflowing their dimensions as necessary, rather than treating them as maximum-size constraints.


#### options.checkPortrait

Type: `Boolean`
Default value: `false`

Gives an option to check if the image is Portrait. If it is Portrait, you can assign another option `portraitWidth` to assign a custom width for portrait images.

#### options.portraitWidth

Type: `Number`
Default value: `null`

An option to allow you to choose a custom width for Portrait images. You need the `checkPortrait` option to be set to `true` for this to work.


## More Examples

```js
// Converting from png to jpeg. No resizing.
gulp.task('convert_png', () => 
  gulp
    .src('test.png')
    .pipe(imageResize({
      format : 'jpeg'
     }))
    .pipe(gulp.dest('dist')));

// Only specify one dimension. Output image won't exceed this value.
gulp.task('width', () => 
  gulp
    .src('test.png')
    .pipe(imageResize({
      width : 100
    }))
    .pipe(gulp.dest('dist')));

// Convert with percentage value.
gulp.task('percentage', () =>
  gulp
    .src('test.png')
    .pipe(imageResize({
      percentage: 50
    }))
    .pipe(gulp.dest('dist')));
```

## Recommended modules

* [concurrent-transform](https://github.com/segmentio/concurrent-transform): parallelize image resizing
```js
const parallel = require("concurrent-transform");
const os = require("os");

gulp.task("parallel", () => 
  gulp
    .src("src/**/*.{jpg,png}")
    .pipe(parallel(
      imageResize({
        width : 100
      }),
      os.cpus().length
    ))
    .pipe(gulp.dest("dist")));
```

* [gulp-changed](https://www.npmjs.org/package/gulp-changed/): only resize changed images
```js
const changed = require("gulp-changed");

gulp.task("changed", () =>
  gulp
    .src("src/**/*.{jpg,png}")
    .pipe(changed("dist"))
    .pipe(imageResize({
      width : 100
    }))
    .pipe(gulp.dest("dist")));
```

* [gulp-rename](https://www.npmjs.org/package/gulp-rename/): add a suffix or prefix
```js
const rename = require("gulp-rename");

gulp.task("suffix", () =>
  gulp
    .src("src/**/*.{jpg,png}")
    .pipe(imageResize({
      width : 100
    }))
    .pipe(rename(function (path) {
      path.basename += "-thumbnail";
     }))
    .pipe(gulp.dest("dist")));
```

## Tests

1. You need both ImageMagick and GraphicsMagick installed on your system to run the tests.
2. Install all npm dev dependencies `npm install`
3. Install gulp globally `npm install -g gulp`
4. Run `gulp test`


## License

MIT © [scalable minds](http://scm.io)
