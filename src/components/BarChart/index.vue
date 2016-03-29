<template lang="jade">
canvas(
  class="vchart bar-chart",
  v-el:chart-canvas,
  :width="width",
  :height="height"
)
</template>

<script>
import Chart from 'chart.js';

export default {
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
      default: true
    },
    stacked: {
      type: Array,
      validator(value) {
        return value.every(label => typeof label === 'string');
      },
      default() { return []; }
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
      options.responsive = this.responsive;
      options.scales = {
        xAxes: [],
        yAxes: []
      };

      if (this.stacked.indexOf('x')) {
        options.scales.xAxes.push({stacked: true});
      }

      if (this.stacked.indexOf('y')) {
        options.scales.yAxes.push({stacked: true});
      }

      return Object.assign({}, this.options, options);
    }
  },
  watch: {
    datasets: {
      handler(val, oldVal) {
        this.barChart.data.datasets = val;
        this.barChart.update();
      },
      deep: true
    }
  },
  data() {
    return {
      barChart: null
    };
  },
  ready() {
    const chartCanvas = this.$els.chartCanvas;
    const ctx = chartCanvas.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions
    });
  }
};
</script>
