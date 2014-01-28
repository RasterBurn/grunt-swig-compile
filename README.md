# grunt-swig-compile

[![Build Status](https://travis-ci.org/RasterBurn/grunt-swig-compile.png)](https://travis-ci.org/RasterBurn/grunt-swig-compile)

> precompile swig templates

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swig-compile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-swig-compile');
```

## The "swig_compile" task

### Overview
In your project's Gruntfile, add a section named `swig_compile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  swig_compile: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.wrap-start
Type: `String`
Default value: `'var tpl = '`

Template wrapper beginning

#### options.wrap-end
Type: `String`
Default value: `';'`

Template wrapper end

### Usage Examples

#### Default Options
Use the default options to precompile templates ending with `.swig`

```js
grunt.initConfig({
  swig_compile: {
    options: {},
    files: {
      'dest/compiled.js': ['**/*.swig'],
    },
  },
})
```

#### AMD
Use `wrap-start` and `wrap-end` to produce an AMD-compatible template.

```js
grunt.initConfig({
  swig_compile: {
    options: {
      "wrap-start": "define(function () { return ",
      "wrap-end": "; });"
    },
    files: [{
      expand: true,
      cwd: 'js/',
      src: ['**/*.swig'],
      dest: 'build/',
      ext: '.js'
    }],
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
