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
      default() { return []; }
    },
    datasets: {
      type: Array,
      default() { return []; }
    },
    options: {
      type: Object,
      default() { return {}; }
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: this.datasets
      };
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
      options: this.options
    });
  }
};
</script>
