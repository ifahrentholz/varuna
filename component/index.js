'use strict';
var yeoman = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the Varuna subgenerator with the argument ' + this.name + '.');
    this.pkg = require('../package.json');

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
  },

  writing: function () {
    this.template(
      this.templatePath('_component.scss'),
      this.destinationPath('src/scss/work/components/'+ this._.slugify(this.name) +'/_'+ this._.slugify(this.name) +'.scss')
    );
    this.template(
      this.templatePath('component.js'),
      this.destinationPath('src/js/work/bundle/components/'+ this._.slugify(this.name) +'/'+ this._.slugify(this.name) +'.js')
    );
  }
});
