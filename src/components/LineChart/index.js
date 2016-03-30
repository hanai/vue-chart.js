import Vue from 'vue';

import componentOptionsConstructor from '../../utils/componentOptionsConstructor';

let componentOptions = componentOptionsConstructor('line');

module.exports = Vue.extend(componentOptions);
