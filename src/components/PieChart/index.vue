<template lang="jade">
canvas(
  class="vchart pie-chart",
  v-el:chart-canvas,
  :width="width",
  :height="height"
)
</template>

<script>
import Chart from 'chart.js';

import {commonOptionParse} from '../../utils/option';

export default {
  name: 'pie-chart',
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    labels: {
      type: Array,
      validator(value) {
        return value.every(label => typeof label === 'string');
      },
      default() { return []; }
    },
    datasets: {
      type: Array,
      validator(value) {
        return value.every(series => {
          return Array.isArray(series.data) && series.data.every(val => {
            return typeof val === 'number';
          });
        });
      },
      coerce(val) {
        return JSON.parse(JSON.stringify(val));
      },
      default() { return []; }
    },
    options: {
      type: Object,
      default() { return {}; }
    },
    responsive: {
      type: Boolean,
      default: null
    },
    legend: {
      coerce(val) {
        if (typeof val === 'boolean') {
          return {display: val};
        }
      },
      default: null
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: this.datasets
      };
    },
    chartOptions() {
      let options = {};

      options = commonOptionParse(this, options);

      return Object.assign({}, this.options, options);
    }
  },
  watch: {
    datasets: {
      handler(val, oldVal) {
        this.pieChart.data.datasets = val;
        this.pieChart.update();
      },
      deep: true
    }
  },
  data() {
    return {
      pieChart: null
    };
  },
  ready() {
    const chartCanvas = this.$els.chartCanvas;
    const ctx = chartCanvas.getContext('2d');
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: this.chartData,
      options: this.chartOptions
    });
  }
};
</script>
