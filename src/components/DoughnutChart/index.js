import Vue from 'vue';

import componentOptionsConstructor from '../../utils/componentOptionsConstructor';

let componentOptions = componentOptionsConstructor('doughnut');

module.exports = Vue.extend(componentOptions);
