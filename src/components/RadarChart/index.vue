<template lang="jade">
canvas(
  class="vchart radar-chart",
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
      default() { return []; }
    },
    options: {
      type: Object,
      default() { return {}; }
    },
    responsive: {
      type: Boolean,
      default: true
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

      return Object.assign({}, this.options, options);
    }
  },
  watch: {
    datasets: {
      handler(val, oldVal) {
        this.radarChart.data.datasets = val;
        this.radarChart.update();
      },
      deep: true
    }
  },
  data() {
    return {
      radarChart: null
    };
  },
  ready() {
    const chartCanvas = this.$els.chartCanvas;
    const ctx = chartCanvas.getContext('2d');
    this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: this.chartData,
      options: this.chartOptions
    });
  }
};
</script>
