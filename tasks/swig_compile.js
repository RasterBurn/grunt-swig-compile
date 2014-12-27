/*
 * grunt-swig-compile
 * https://github.com/RasterBurn/grunt-swig-compile
 *
 * Copyright (c) 2014 Dan Harbin
 * Licensed under the MIT license.
 */

'use strict';

var swig = require('swig');

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('swig_compile', 'precompile swig templates', function() {
		var lf = grunt.util.linefeed;
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			separator: lf + lf,
			'wrap-start': 'var tpl = ',
			'wrap-end': ';',
			'method-name': 'tpl',
			locals: {}
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
        var wrapStart = typeof options['wrap-start'] === 'function'? options['wrap-start'].call(grunt, filepath): options['wrap-start'];
        var wrapEnd = typeof options['wrap-end'] === 'function'? options['wrap-end'].call(grunt, filepath): options['wrap-end'];
				// Read file source.
				return wrapStart +
						swig.precompile(grunt.file.read(filepath), { filename: filepath, locals: options.locals }).tpl.toString().replace('anonymous', '') +
					  wrapEnd
				;
			}).join(grunt.util.normalizelf(options.separator));

			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
