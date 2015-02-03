'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
  
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    
    // This method adds support for a `--skip-install` flag
    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });
    
    // This method adds support for a `--coffee` flag
    this.option('coffee');
  },

  askFor: function () {
    var done = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(yosay(
        'Welcome to the frontend generator by ]init['
      ));
      this.log(chalk.magenta(
        'Out of the box I include HTML5 Boilerplate, jQuery, and a ' +
        'Gruntfile.js to build your app.'
      ));
    }

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What would you like to include?',
      choices: [{
        name: 'Bootstrap Basic (css)',
        value: 'includeBootstrap',
        checked: false
      },{
        name: 'Bootstrap Sass (scss)',
        value: 'includeSass',
        checked: false
      },{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      },{
        name: 'jQuery',
        value: 'includejQuery',
        checked: true
      }]
    } 
    /*{
      when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeSass') !== -1;
      },
      type: 'confirm',
      name: 'libsass',
      value: 'includeLibSass',
      message: 'Would you like to use libsass? Read up more at \n' +
        chalk.green('https://github.com/andrew/node-sass#node-sass'),
      default: false
    }*/];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      this.includeSass = hasFeature('includeSass');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includejQuery = hasFeature('includejQuery');

      this.includeLibSass = answers.libsass;
      this.includeRubySass = !answers.libsass;

      done();
    }.bind(this));
  },
  
  bower: function () {
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {}
    };
    
    if (this.includejQuery) {
      bower.dependencies.jquery = "~1.11.1";
    }
    

    if (this.includeBootstrap) {
      var bs = 'bootstrap';
      bower.dependencies[bs] = "*";
    }
    
    if (this.includeSass) {
      var bs = 'bootstrap-sass-official';
      bower.dependencies[bs] = "*";
    }

    if (this.includeModernizr) {
      bower.dependencies.modernizr = "~2.8.2";
    }

    this.copy('bowerrc', '.bowerrc');
    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('stylesheets/'),
        this.destinationPath('stylesheets/')
      );
      this.mkdir('stylesheets/work/utils/extends');
      this.mkdir('stylesheets/work/utils/helper');
      this.fs.copy(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
    },

    // And you can then access it later on this way; e.g.
    //this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
      
    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
