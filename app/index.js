'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
  
  constructor: function () {
    generators.Base.apply(this, arguments);

    // This method adds support for a `--coffee` flag
    this.option('coffee');
    // And you can then access it later on this way; e.g.
    this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
  },

  /*prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the frontend generator by ]init['
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?',
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },*/
  
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
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: false
      },{
        name: 'Bootsrap + Sass',
        value: 'includeSass',
        checked: false
      },{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      }]
    }, 
    {
      /*when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeSass') !== -1;
      },
      type: 'confirm',
      name: 'libsass',
      value: 'includeLibSass',
      message: 'Would you like to use libsass? Read up more at \n' +
        chalk.green('https://github.com/andrew/node-sass#node-sass'),
      default: false*/
    }];
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
      this.template(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

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

  /*
  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
  */
});
