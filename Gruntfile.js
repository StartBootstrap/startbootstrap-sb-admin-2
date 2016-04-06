module.exports = function(grunt) {
  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '!grunt-log-headers']
  });

  require('grunt-log-headers')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    newer: {
      options: {
        gruntLogHeader: false
      }
    },
    'newer-postrun': {
      options: {
        gruntLogHeader: false
      }
    },
    clean: {
      src: [
        'app/dist/**/*.css'
      ]
    },
    less: {
      base: {
        options: {
          paths: ["app/assets/less"]
        },
        files: {
          "dist/css/sb-admin-2.css": "less/sb-admin-2.less",
          "dist/css/themes/stratus-print.css": "less/themes/stratus-print.less",
          "dist/css/themes/dark.css": "less/dark.less"
        }
      }
    },
    watch: {
      scripts: {
        files: [
          'less/**/*.less'
        ],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: [
          'app/assets/less/*.less',
          'app/assets/less/**/*.less'
        ],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.registerTask('default', [
    'newer:less'
  ]);
};
