
module.exports = (grunt) => {


  const SRC_DIR = 'src';


  grunt.config.init({

    pkg: grunt.file.readJSON('package.json'),

    //
    // shared config parameters
    //

    config: {
      dir: {
        src: `${SRC_DIR}`,
        scss: 'resource/scss',
        css: 'resource/css',
        build: 'ts_built',
      },
      file: {
        app: 'resource/js/jobkey-app_bundled.js',
        app_minified: 'resource/js/jobkey-app_bundled.min.js',
        wx: 'wx/libs/wx-app_bundled.js',
        wx_minified: 'wx/libs/wx-app_bundled.min.js',
        wx_patch: 'wx/libs/patch.js',
        h5: 'resource/h5/h5-app_bundled.js',
        h5_minified: 'resource/h5/h5-app_bundled.js',
        lint_report: 'eslint-report.html'
      }
    },

    //
    // tasks
    //

    ts: {  // typescript
      default: { tsconfig: './tsconfig.json' }
    },

    clean: {
      options: { force: true },
      all: [
        '<%= config.file.app_minified %>'/*remove symlink first*/,
        '<%= config.file.app %>',
        '<%= config.dir.build %>',
        '<%= config.dir.css %>',
        '<%= config.file.wx_minified %>',
        '<%= config.file.wx %>',
      ],
      dist: ['<%= config.file.app %>']
    },

    mochaTest: {
      test: {
        options: {
          // clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          // clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
          // noFail: false, // Optionally set to not fail on failed tests (will still fail on other errors)
          require: [
            'jsdom-global/register',  // DOM-related tests
            'ts-node/register',     // TypeScript transpilation
            'tsconfig-paths/register',  // non-relative imports
            'esm',            // ES module support
          ]
        },
        src: (() => {
          let result;
          const path = grunt.option('only') || `${SRC_DIR}`;

          grunt.log.debug(`path for test files: ${path}`);

          if (grunt.file.isDir(path)) {
            result = path.replace(/\/+$/, '') + '/**/*_test.ts';
          } else if (grunt.file.isFile(path)) {
            result = path;
          } else {
            result = path;
          }

          grunt.log.debug(`final test files: ${result}`);

          return result;
        })()
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc.json',
        format: 'html',
        outputFile: '<%= config.dir.build%>/<%= config.file.lint_report %>',
        fix: true
      },
      target: ['<%= config.dir.src %>']
    },

    browserify: {
      options: {
        browserifyOptions: {
          // root for non-relative paths. see
          // <https://derickbailey.com/2015/09/30/cleaning-up-browserifys-require-problem/>
          paths: ['<%= config.dir.build %>']
        }
      },
      files: {
        app: {
          ['<%= config.file.app %>']:
          ['<%= config.dir.build %>/app.js']
        },
        wx: {
          ['<%= config.file.wx %>']:
          ['<%= config.dir.build %>/wx_app.js']
        },
        h5: {
          ['<%= config.file.h5 %>']:
          ['<%= config.dir.build %>/h5_app.js']
        }
      },
      dev: {
        browserifyOptions: { fast: true, debug: true },
        files: '<%= browserify.files.app %>',
      },
      dist: {
        browserifyOptions: { fast: false, debug: false },
        files: '<%= browserify.files.app %>',
      },
      wx: {
        browserifyOptions: { fast: false, debug: false },
        files: '<%= browserify.files.wx %>'
      },
      h5: {
        browserifyOptions: { fast: false, debug: false },
        files: '<%= browserify.files.h5 %>'
      }
    },

    symlink: {
      options: {
        overwrite: true,
        force: true
      },
      explicit: {
        src: '<%= config.file.app %>',
        dest: '<%= config.file.app_minified %>'
      }
    },

    terser: {
      dist: {
        files: {
          ['<%= config.file.app_minified %>']:
          ['<%= config.file.app %>']
        }
      },
      wx: {
        files: {
          ['<%= config.file.wx_minified %>']:
          ['<%= config.file.wx %>']
        }
      },
      h5: {
        files: {
          ['<%= config.file.h5_minified %>']:
          ['<%= config.file.h5 %>']
        }
      }
    },

    shell: {
      wx_patch: {
        command: [
          'cat <%= config.file.wx_patch %> <%= config.file.wx_minified %> > __.txt',
          'mv __.txt <% config.file.wx_minified %>'
        ].join(' && ')
      }
    }

  });


  require('load-grunt-tasks')(grunt);


  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('build',
    ['ts', 'browserify:dev', 'sass:dev', 'symlink']);
  grunt.registerTask('deploy',
    ['ts', 'browserify:dist', 'sass:dist', 'terser:dist', 'clean:dist']);
  grunt.registerTask('wx_build',
    ['ts', 'browserify:wx', 'terser:wx', 'shell:wx_patch']);
  grunt.registerTask('h5_build', ['ts', 'browserify:h5', 'terser:h5']);

  grunt.registerTask('default', ['lint', 'test', 'build']);


};
