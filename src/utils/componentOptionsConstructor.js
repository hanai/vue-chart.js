import Chart from 'chart.js';

export default function(chartType) {
  if (process.env.NODE_ENV !== 'production') {
    if (['bar', 'line', 'radar', 'pie', 'doughnut', 'polarArea'].indexOf(chartType) === -1) {
      console.warn(`vchart: unknown chartType: ${chartType}`);
    }
  }

  const chartClassName = `${chartType}-chart`;

  let componentBaseOptions = {
    template: `<canvas class="vchart ${chartClassName}" v-el:chart-canvas :width="width" :height="height"></canvas>`,
    props: {
      width: {
        type: Number,
        default: null
      },
      height: {
        type: Number,
        default: null
      },
      labels: {
        type: Array,
        default() { return []; }
      },
      datasets: {
        type: Array,
        validator(value) {
          return value.every(series => {
            return Array.isArray(series.data) &&
              series.data.every(val => typeof val === 'number');
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
      legend: {
        coerce(val) {
          if (typeof val === 'boolean') {
            return { display: val };
          } else {
            return val;
          }
        },
        default: null
      },
      title: {
        type: [String, Object]
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

        // title
        if (typeof this.title === 'string') {
          options.title = {
            text: this.title,
            display: true
          };
        } else if (typeof this.title === 'object') {
          options.title = this.title;
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
        }
      },
      labels: {
        handler(val, oldVal) {
          this.chartInstance.config.data.labels = val;
          this.chartInstance.update();
        }
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
    },
    beforeDestroy() {
      this.chartInstance.destroy();
    }
  };

  return componentBaseOptions;
}
