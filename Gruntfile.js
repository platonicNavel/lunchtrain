module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              loose: 'all',
            }],
          ],
        },
        files: {
          './build/client/index.js': ['./src/client/index.js'],
        },
      },
    },
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

  grunt.registerTask('server-dev', function(target) {
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon',
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
    grunt.task.run(['watch']);
  });

  grunt.registerTask('test', [
    'eslint',
    'mochaTest',
  ]);

  // TODO: handle concatination, minification
  grunt.registerTask('build', []);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['shell:prodServer']);
    } else {
      grunt.task.run(['server-dev']);
    }
  });

  grunt.registerTask('deploy', [
    'test',
    'build',
    'upload',
  ]);


};

