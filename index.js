/*
 * grunt-image-resize
 * https://github.com/scalableminds/gulp-image-resize
 *
 * Copyright (c) 2014 Norman Rzepka
 * Licensed under the MIT license.
 */

var gm          = require("gm");
var async       = require("async");
var path        = require("path");
var os          = require("os");
var through     = require("through2");
var _           = require("lodash");
var stream      = require("stream");
var util        = require("gulp-util");
var PluginError = util.PluginError;

const PLUGIN_NAME = "image-resize";

module.exports = function imageResizer(options) {

  options = _.defaults(options, {
    overwrite   : true,
    upscale     : false,
    concurrency : os.cpus().length,
    crop        : false,
    gravity     : "Center",
    quality     : 1,
    imageMagick : false,
    format      : null
  });

  var _gm = gm;

  if (options.imageMagick) {
    _gm = gm.subClass({ imageMagick : true });
  }

  if (options.height == null && options.width) {
    options.height = null;
  }
  if (options.width == null && options.height) {
    options.width = null;
  }

  return through.obj(function (file, enc, done) {

    if (file.isNull()) {
      return done(null, file);
    }


    var format = options.format || path.extname(file.path).substring(1);

    async.waterfall([

      function (callback) {
        var passThrough = new stream.PassThrough();
        _gm(file.pipe(passThrough), file.path).size(callback);
      },

      function (size, callback) {
        
        var passThrough = new stream.PassThrough();
        var processor = _gm(file.pipe(passThrough), file.path);

        if (options.height != null || options.width != null) {

          var isUpscaled = 
            (options.width && size.width < options.width) ||
            (options.height && size.height < options.height);

          if (options.upscale || !isUpscaled) {

            if (isUpscaled) {
              if (!options.height) {
                options.height = Math.ceil((options.width / size.width) * size.height);
              }
              if (!options.width) {
                options.width = Math.ceil((options.height / size.height) * size.width);
              }
            }

            if (options.crop) {
              processor = processor
                .resize(options.width, options.height, "^")
                .gravity(options.gravity)
                .crop(options.width, options.height);
            } else {
              processor = processor
                .resize(options.width, options.height);
            }

          }

        }

        file.path = util.replaceExtension(file.path, "." + format);
        processor
          .quality(Math.floor(options.quality * 100))
          .toBuffer(format, callback);

      }

    ], function (err, buffer) {

      if (err) {
        done(new PluginError(PLUGIN_NAME, err, { showStack : true }));
      } else {
        file.contents = buffer;
        done(null, file);
      }

    });
  });

};

