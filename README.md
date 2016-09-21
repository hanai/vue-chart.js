# vue-chart.js

[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]

Chart.js for Vue

## Install

``` bash
$ npm i vue-chart.js
```

## Chart Components

* BarChart
* LineChart
* RadarChart
* PieChart
* DoughnutChart
* PolarAreaChart

## Common Chart Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| responsive | Boolean | true | resizes when the canvas container does |
| title | String | null | title text |
| title | Object | null | title configuration |
| width | Number | null | width of chart canvas |
| height | Number | null | height of chart canvas |
| labels | Array[string] | [] | labels of category axis |

## Example

``` html
<template>
<bar-chart :width="600" :height="300" :responsive="false" :labels="labels" :datasets="datasets" :options="options"></bar-chart>
</template>

<script>
import {BarChart} from 'vue-chart.js';

export default {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(220,220,220,0.2)",
        borderColor: "rgba(220,220,220,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(220,220,220,0.2)",
        hoverBorderColor: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
        yAxisID: "y-axis-0",
      }, {
        label: "My Second dataset",
        backgroundColor: "rgba(220,220,220,0.2)",
        borderColor: "rgba(220,220,220,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(220,220,220,0.2)",
        hoverBorderColor: "rgba(220,220,220,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ],
    options: {}
  },
  components: {
    BarChart
  }
}
</script>
```


[npm-image]: https://img.shields.io/npm/v/vue-chart.js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/vue-chart.js
[david-image]: http://img.shields.io/david/hanai/vue-chart.js.svg?style=flat-square
[david-url]: https://david-dm.org/hanai/vue-chart.js
[license-image]: http://img.shields.io/npm/l/vue-chart.js.svg?style=flat-square
[license-url]: ./LICENSE
