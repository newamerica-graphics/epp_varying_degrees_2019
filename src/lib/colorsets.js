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
  diverging_unordered: {
    positive: [
      colors.blue.light,
      colors.blue.medium,
    ],
    neutral: [
      colors.grey.medium_light,
    ],
    negative: [
      colors.orange.light,
      colors.orange.medium,
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
  scale_with_zero: [
    colors.grey.medium_light,
    colors.turquoise.very_light_2,
    colors.turquoise.light,
    colors.turquoise.medium,
    colors.turquoise.dark,
    colors.grey.dark,
  ],
  increasing_many: [
    '#97ded9', '#76d2cc', '#53c6bf', '#2dbab1', '#27aba3', '#219c95', '#1b8e87', '#14807a', '#0d726d', '#066460', '#005753'
  ],
  increasing_income: [
    colors.turquoise.very_light,
    colors.turquoise.very_light_2,
    colors.turquoise.light,
    colors.turquoise.medium,
    colors.turquoise.dark,
    colors.blue.very_light,
    colors.blue.very_light_2,
    colors.blue.light,
    colors.blue.medium,
    colors.blue.dark,
    colors.purple.very_light,
    colors.purple.very_light_2,
    colors.purple.light,
    colors.purple.medium,
    colors.purple.dark,
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
    colors.blue.medium,
    colors.orange.medium,
    colors.red.medium,
    colors.yellow.medium,
    colors.turquoise.medium,
    colors.brown.medium,
    colors.purple.medium,
  ],
};

export { colorsets };
