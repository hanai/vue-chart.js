import Vue from 'vue';

import componentOptionsConstructor from '../../utils/componentOptionsConstructor';

let componentOptions = componentOptionsConstructor('bar');

componentOptions.props.stacked = {
  type: Array,
  validator(value) {
    return value.every(label => typeof label === 'string');
  },
  default() { return []; }
};

componentOptions.methods.parseCustomOptions = function(options) {
  if (this.stacked.length > 0) {
    options.scales = {
      xAxes: [{

      }],
      yAxes: [{
      }]
    };

    if (this.stacked.indexOf('x')) {
      options.scales.xAxes[0].stacked = true;
    }

    if (this.stacked.indexOf('y')) {
      options.scales.yAxes[0].stacked = true;
    }
  }

  return options;
};

module.exports = Vue.extend(componentOptions);
