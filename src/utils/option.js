export function commonOptionParse(self, options) {
  // responsive
  if (self.responsive !== null) {
    options.responsive = self.responsive;
  }

  // legend
  if (self.legend !== null) {
    options.legend = self.legend;
  }

  return options;
};
