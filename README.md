# vue-chart.js

## Usage

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

## Common Chart Configuration

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| responsive | Boolean | true | Resizes when the canvas container does |
| title | String/Object | null | Title text or title configuration |
