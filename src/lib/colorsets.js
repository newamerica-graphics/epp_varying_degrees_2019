import { colors } from "./colors";


const colorsets = {
  base: {
    on_white: [
      colors.grey.light,
      colors.grey.chart_background,
      colors.grey.chart_background,
    ],
    on_grey: [
      colors.grey.light,
      colors.white,
      colors.white,
    ],
  },
  diverging: {
    positive: [
      colors.turquoise.light,
      colors.turquoise.medium,
    ],
    neutral: [
      colors.grey.medium_light,
    ],
    negative: [
      colors.red.light,
      colors.red.medium,
    ],
  },
  scale: [
    colors.turquoise.very_light,
    colors.turquoise.very_light_2,
    colors.turquoise.light,
    colors.turquoise.medium,
    colors.turquoise.dark,
    colors.grey.dark,
  ],
  unordered: [
    colors.blue.light,
    colors.orange.light,
    colors.red.light,
    colors.yellow.light,
    colors.turquoise.light,
    colors.brown.light,
    colors.purple.light,
  ],
};

export { colorsets };
