'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the Varuna subgenerator with the argument ' + this.name + '.');

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
  },

  writing: function () {
    this.template(
      this.templatePath('_component.scss'),
      this.destinationPath('stylesheets/work/components/'+ this._.slugify(this.name) +'/_'+ this._.slugify(this.name) +'.scss')
    );
    this.template(
      this.templatePath('component.js'),
      this.destinationPath('javascripts/work/bundle/components/'+ this._.slugify(this.name) +'/'+ this._.slugify(this.name) +'.js')
    );
  }
});
