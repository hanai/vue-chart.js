import Vue from 'vue';

import componentOptionsConstructor from '../../utils/componentOptionsConstructor';

let componentOptions = componentOptionsConstructor('radar');

module.exports = Vue.extend(componentOptions);
