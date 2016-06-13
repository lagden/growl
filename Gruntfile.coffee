'use strict'

module.exports = (grunt) ->
  grunt.file.defaultEncoding = 'utf8'

  require('jit-grunt') grunt
  require('time-grunt') grunt

  grunt.initConfig
    project:
      prod: 'build'
      dev: 'dev'
      coffee: 'coffee'
      jade: 'jade'
      pre: 'stylus'

    xo:
      options:
        quiet: true
        ignores: []
      target: ['es6/**/*.js']

    coffee:
      compile:
        options:
          bare: true
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.coffee %>'
          src: [ '**/*.coffee' ]
          dest: '<%= project.dev %>/js'
          ext: '.js'
        ]

    babel:
      compile:
        options:
          sourceMap: true
          modules: 'umd'
        files: [
          expand: true
          flatten: false
          cwd: 'es6'
          src: [ '**/*.js' ]
          dest: '<%= project.dev %>/js/component'
          ext: '.js'
        ]

    stylus:
      dev:
        options:
          compress: false
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.pre %>'
          src: ['*.styl']
          dest: '<%= project.dev %>/css'
          ext: '.css'
        ]

    postcss:
      dev:
        options:
          processors: [
            require('autoprefixer')(browsers: 'last 2 versions')
          ]
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.dev %>/css'
          src: ['*.css']
          dest: '<%= project.dev %>/css'
          ext: '.css'
        ]

    jade:
      js:
        options:
          amd: true
          client: true
          namespace: false
        files: [
          expand: true
          flatten: true
          cwd: '<%= project.jade %>/js'
          src: [ '**/*.jade' ]
          dest: '<%= project.dev %>/js/templates'
          ext: '.js'
        ]
      html:
        options:
          pretty: true
          data:
            build: false
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.jade %>/html'
          src: [ '**/*.jade' ]
          dest: '<%= project.dev %>'
          ext: '.html'
        ]
      build:
        options:
          pretty: false
          data:
            build: true
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.jade %>/html'
          src: [ '**/*.jade' ]
          dest: '<%= project.prod %>'
          ext: '.html'
        ]

    watch:
      script:
        files: [ '<%= project.coffee %>/**/*.coffee', 'es6/**/*.js' ]
        tasks: [ 'scripts' ]
      pre:
        files: [ '<%= project.pre %>/**/*' ]
        tasks: [ 'styles' ]
      jadeToHtml:
        files: [ '<%= project.jade %>/html/**/*.jade' ]
        tasks: [ 'jade:html' ]
      jadeToJs:
        files: [ '<%= project.jade %>/js/**/*.jade' ]
        tasks: [ 'jade:js' ]

    browserSync:
      dev:
        bsFiles: src: '<%= project.dev %>/css/*.css'
        options:
          notify: true
          watchTask: true
          port: 8183
          server: baseDir: [ '<%= project.dev %>' ]
      dist: options:
        notify: false
        watchTask: false
        port: 8184
        server: baseDir: [ '<%= project.prod %>' ]

    requirejs:
      almond:
        options:
          optimize: 'uglify2'
          uglify2:
            warnings: false
            mangle: true
            compress:
              evaluate: false
              sequences: true
              properties: true
              unused: true
              hoist_funs: false
              hoist_vars: false
              drop_debugger: true
              drop_console: true
          optimizeCss: 'none'
          generateSourceMaps: true
          keepAmdefine: true
          preserveLicenseComments: false
          findNestedDependencies: true
          useStrict: true
          baseUrl: '<%= project.dev %>/js/lib'
          mainConfigFile: '<%= project.dev %>/js/config.js'
          name: '../../../node_modules/almond/almond',
          include: [ '../main' ]
          out: '<%= project.prod %>/js/main.js'

    cssmin:
      dynamic:
        options:
          keepSpecialComments: 0
          report: 'gzip'
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.dev %>/css'
          src: [ '**/*.css' ]
          dest: '<%= project.prod %>/css'
          ext: '.css'
        ]

    concurrent:
      dev: [
        'scripts'
        'styles'
        'jade:js'
        'jade:html'
      ]

    clean:
      prod: ['<%= project.prod %>']
      dev: ['<%= project.dev %>/js/component']
      dist: ['dist']

    copy:
      prod:
        src: '<%= project.dev %>/favicon.ico'
        dest: '<%= project.prod %>/favicon.ico'
      dist:
        files: [
          expand: true
          cwd: '<%= project.dev %>/js/component',
          src: ['**/*.js', '**/*.js.map']
          dest: 'dist'
        ]
      css:
        src: '<%= project.dev %>/css/growl.css'
        dest: 'dist/growl.css'

    symlink:
      options:
        overwrite: true
      require:
        src: 'node_modules/requirejs/require.js',
        dest: '<%= project.dev %>/js/lib/require.js'
      jadeRuntime:
        src: 'node_modules/jade/runtime.js',
        dest: '<%= project.dev %>/js/lib/jade.js'
      lagdenUtils:
        src: 'node_modules/lagden-utils/dist/index.js',
        dest: '<%= project.dev %>/js/lib/utils.js'

    qunit:
      all: ['test/**/*.html']

  grunt.registerTask 'default', [
    'clean:dev'
    'symlink'
    'concurrent:dev'
  ]

  grunt.registerTask 'scripts', [
    'xo'
    'coffee'
    'babel'
  ]

  grunt.registerTask 'build', [
    'clean:prod'
    'clean:dist'
    'default'
    'jade:build'
    'requirejs'
    'cssmin'
    'copy'
  ]

  grunt.registerTask 'serve', [
    'default'
    'browserSync:dev'
    'watch'
  ]

  grunt.registerTask 'serve:prod', [
    'build'
    'browserSync:dist'
  ]

  grunt.registerTask 'styles', [
    'stylus'
    'postcss'
  ]

  grunt.registerTask 'test', [
    'default'
    'copy:dist'
    'copy:css'
    'qunit'
  ]

  return
