module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*.js'],
      },
    },
    nodemon: {
      dev: {
        script: 'build/server/server.js',
      },
    },
    eslint: {
      target: ['src/**/*.js'],
    },
    shell: {
      local: {
        command: 'git push live master',
      },
    },
    clean: {
      build: ['build/'],
      deploy: [],
    },
    babel: {
      options: {
        presets: ['es2015', 'react'],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'build/'
          },
        ]
      },
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['babel'],
      },
    },
  });

  // TODO: minify css
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('test', [
    'eslint',
    'mochaTest',
  ]);

  // TODO: deal with combining modules
  grunt.registerTask('build', [
    'babel',
    'nodemon',
  ]);


  grunt.registerTask('deploy', [
    'test',
    'build',
    'upload',
  ]);


};

