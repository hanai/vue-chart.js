import Vue from 'vue';

import componentOptionsConstructor from '../../utils/componentOptionsConstructor';

let componentOptions = componentOptionsConstructor('pie');

module.exports = Vue.extend(componentOptions);
