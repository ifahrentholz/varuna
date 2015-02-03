'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the frontend generator by ]init['
    ));

    var prompts = [
      {
        name: 'appName',
        message: 'What is your app\'s name ?',
        default: 'Your AppName'
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
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
