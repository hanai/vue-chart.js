import Chart from 'chart.js';

export default function(chartType) {
  if (process.env.NODE_ENV !== 'production') {
    if (['bar', 'line', 'radar', 'pie', 'doughnut'].indexOf(chartType) === -1) {
      console.warn(`vchart: unknown chartType: ${chartType}`);
    }
  }

  const chartClassName = `${chartType}-chart`;

  let componentBaseOptions = {
    template: `<canvas class="vchart ${chartClassName}" v-el:chart-canvas :width="width" :height="height"></canvas>`,
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
    methods: {
      parseCommonOptions(options) {
        // responsive
        if (this.responsive !== null) {
          options.responsive = this.responsive;
        }

        // legend
        if (this.legend !== null) {
          options.legend = this.legend;
        }

        return options;
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

        options = this.parseCommonOptions(options);

        if (this.parseCustomOptions) {
          options = this.parseCustomOptions(options);
        }

        return Object.assign(this.options, options);
      }
    },
    watch: {
      datasets: {
        handler(val, oldVal) {
          this.chartInstance.data.datasets = val;
          this.chartInstance.update();
        },
        deep: true
      }
    },
    data() {
      return {
        chartInstance: null,
        chartType: chartType
      };
    },
    ready() {
      const chartCanvas = this.$els.chartCanvas;
      const ctx = chartCanvas.getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: chartType,
        data: this.chartData,
        options: this.chartOptions
      });
    }
  };

  return componentBaseOptions;
}
