'use strict'

module.exports = (grunt) ->
  require('jit-grunt') grunt
  require('time-grunt') grunt

  grunt.file.defaultEncoding = 'utf8'

  grunt.initConfig
    coffee: compile:
      options: bare: true
      files: [
        expand: true
        flatten: false
        cwd: '<%= project.coffee %>'
        src: [ '**/*.coffee' ]
        dest: '<%= project.tmp %>/js'
        ext: '.js'
      ]

    babel: compile:
      options:
        sourceMap: false
        modules: 'umd'
        whitelist: [
          'spec'
          'es6.templateLiterals'
          'es6.modules'
          'es6.blockScoping'
          'es6.arrowFunctions'
          'es6.classes'
          'es6.parameters.default'
        ]

      files: [
        expand: true
        flatten: false
        cwd: 'es6'
        src: [ '**/*.js' ]
        dest: '<%= project.tmp %>/js/es5'
        ext: '.js'
      ]

    fixmyjs:
      options:
        jshintrc: '.jshintrc'
        indentpref: 'spaces'
      fix: files: [
        expand: true
        flatten: false
        cwd: '<%= project.tmp %>/js'
        src: [ '**/*.js' ]
        dest: '<%= project.dev %>/js'
        ext: '.js'
      ]

    connect:
      server:
        options:
          base: '.',
          port: 8182

    qunit:
      all:
        options:
          urls: [
            'http://localhost:8182/test/growl.html'
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
        options: pretty: true
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
          data: build: true
        files: [
          expand: true
          flatten: false
          cwd: '<%= project.jade %>/html'
          src: [ '**/*.jade' ]
          dest: '<%= project.dev %>'
          ext: '.html'
        ]

    autoprefixer:
      options: browsers: [ 'last 1 version' ]
      files:
        expand: true
        flatten: false
        cwd: '<%= project.tmp %>/css'
        src: [ '*.css' ]
        dest: '<%= project.dev %>/css'
        ext: '.css'

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

    requirejs: almond: options:
      optimize: 'uglify2'
      uglify2:
        warnings: false
        compress:
          sequences: true
          properties: true
          drop_debugger: true
          unused: true
          drop_console: true
      optimizeCss: 'standard'
      generateSourceMaps: true
      keepAmdefine: true
      preserveLicenseComments: false
      findNestedDependencies: true
      useStrict: true
      baseUrl: '<%= project.dev %>/js/lib'
      mainConfigFile: '<%= project.dev %>/js/config.js'
      name: 'almond'
      include: [ '../main' ]
      out: '<%= project.prod %>/js/main.js'

    cssmin: dynamic:
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

    minifyHtml: dynamic:
      options:
        comments: false
        conditionals: true
        spare: false
        quotes: true
        cdata: false
        empty: false
      files: [
        expand: true
        cwd: '<%= project.dev %>'
        src: [ '**/*.html' ]
        dest: '<%= project.prod %>'
      ]

    concurrent: dev: [
      'scripts'
      'styles'
      'jade:js'
      'jade:html'
    ]

    clean:
      dist: [ '<%= project.prod %>' ]
      tmp: [ '<%= project.tmp %>' ]
      es5: [ 'es5' ]

    copy:
      dist:
        src: '<%= project.dev %>/favicon.ico'
        dest: '<%= project.prod %>/favicon.ico'
      es5:
        files: [
          expand: true
          cwd: '<%= project.dev %>/js/es5'
          src: ['**']
          dest: 'es5'
        ]
      es5css:
        src: '<%= project.dev %>/css/notification.css'
        dest: 'es5/notification.css'

    project:
      'prod': 'build'
      'dev': 'dev'
      'tmp': 'tmp'
      'coffee': 'coffee'
      'jade': 'jade'
      'pre': 'stylus'

    stylus: 'dev':
      'options': 'compress': false
      'files': [
        'expand': true
        'flatten': false
        'cwd': '<%= project.pre %>'
        'src': [ '*.styl' ]
        'dest': '<%= project.tmp %>/css'
        'ext': '.css'
      ]

  grunt.registerTask 'default', [
    'clean:tmp'
    'concurrent:dev'
  ]

  grunt.registerTask 'scripts', [
    'coffee'
    'babel'
    'fixmyjs:fix'
  ]

  grunt.registerTask 'build', [
    'clean:dist'
    'default'
    'jade:build'
    'requirejs'
    'cssmin'
    'minifyHtml'
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
    'autoprefixer'
  ]

  grunt.registerTask 'test', [
    'connect'
    'qunit'
  ]

  return
