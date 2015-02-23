module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  
  var globalConfigBase = {
    imgSrc: 'img/base',
    fontSrc: 'fonts/base',
    jsSrc: 'js/base',
    jsDest: 'dist/base/js',
    cssSrc: 'scss/base',
    cssDest: 'dist/base/css',
    vendorSrc: 'vendor/'
  };

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    globalConfig: globalConfig,
    banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',

    clean: {
      build: ["<%= globalConfig.cssDest %>", "<%= globalConfig.jsDest %>"],
      styles: ["<%= globalConfig.cssDest %>"],
      js: ["<%= globalConfig.jsDest %>"]
    },

    connect: {
      server: {
        options: {
          port: 8888,
          keepalive: true
        }
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      
      main: {
        src: [
          /* scripts written by init + initialize */
          '<%= globalConfig.jsSrc %>/bundle/*.js',
          '<%= globalConfig.jsSrc %>/main.js'
          
          
        ], 
        dest: '<%= globalConfig.jsDest %>/main.js' 
      }
    },

    compass: {
      options: {
        imagesPath: '<%= globalConfig.imgSrc %>',
        fontsPath: '<%= globalConfig.fontSrc %>',
        sassDir: '<%= globalConfig.cssSrc %>',
        cssDir: '<%= globalConfig.cssDest %>',
        relativeAssets: true,
        debugInfo: true
      },
      prod: {
        options: {
        environment: 'production',
        outputStyle: 'compressed',
        noLineComments: true,
        banner: '<%= banner %>'
      }
    },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded',
          sourcemap: true
        }
      }
    },

    watch : {
      options: {
        livereload: true,
      },
      js : {
        files : [ 
                  '<%= globalConfig.jsSrc %>/**/*.js',
                  '<%= globalConfig.jsSrc %>/**/**/*.js'
                ],
        tasks : [ 'build-js' ]
      },

      scss : {
        files : [ 
                  '<%= globalConfig.cssSrc %>/**/*.scss',
                  '<%= globalConfig.cssSrc %>/**/**/*.scss'
                ],
        tasks : [ 'build-sass' ]
      },
      html: {
        files: '<%= globalConfig.viewsSrc %>/**/*.html'
      }
    },

    notify: {
      sass: {
        options: {
          title: 'SASS Task Completed',
          message: 'SASS compiled without Errors',
        }
      },
      js: {
        options: {
          title: 'JS Task Completed',
          message: 'JS Files builded without Errors',
        }
      }
    },

    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        },
        banner: '<%= banner %>',
        preserveComments: 'some',
        report: 'min'
      },
      build: {
        files: {
        '<%= globalConfig.jsDest %>/main.min.js': ['<%= globalConfig.jsDest %>/main.js'],
        '<%= globalConfig.jsDest %>/plugin.min.js': ['<%= globalConfig.jsDest %>/plugin.js']
        }
      }
    }
  });

  /* PRODUCTION */
  grunt.registerTask('default', ['clean:build', 'concat', 'compass:prod', 'uglify']);
  

  /* DEVELOPMENT */
  grunt.registerTask('build-sass', ['compass:dev', 'notify:sass']);
  grunt.registerTask('build-js', ['clean:js', 'concat', 'notify:js']);
  grunt.registerTask('watch-it', ['watch']);

};
