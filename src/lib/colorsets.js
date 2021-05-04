import { colors } from "./colors";

const neutral = colors.grey.light

const colorsets = {
  base: {
    on_white: [
      colors.grey.lightest,
      colors.grey.chart_background,
      colors.grey.chart_background,
    ],
    on_grey: [
      colors.grey.lightest,
      colors.white,
      colors.white,
    ],
  },
  diverging: {
    positive: [
      colors.teal.medium,
      colors.teal.light,
    ],
    neutral: [
      neutral,
    ],
    negative: [
      colors.red.medium,
      colors.red.light,
    ],
  },
  diverging_unordered: {
    positive: [
      colors.blue.medium,
      colors.blue.light,
    ],
    neutral: [
      neutral,
    ],
    negative: [
      colors.purple.medium,
      colors.purple.light,
    ],
  },
  scale: [
    colors.teal.lightest,
    colors.teal.light,
    colors.teal.medium,
    colors.teal.dark,
    colors.teal.darker,
    colors.teal.darkest,
    colors.grey.dark,
  ],
  scale_with_zero: [
    colors.grey.medium,
    colors.teal.lightest,
    colors.teal.light,
    colors.teal.medium,
    colors.teal.dark,
    colors.teal.darker,
    colors.teal.darkest,
    colors.grey.dark,
  ],
  increasing_many: [
    '#97ded9', '#76d2cc', '#53c6bf', '#2dbab1', '#27aba3', '#219c95', '#1b8e87', '#14807a', '#0d726d', '#066460', '#005753'
  ],
  increasing_income: [
    colors.teal.lightest,
    colors.teal.light,
    colors.teal.medium,
    colors.teal.dark,
    colors.teal.darker,
    colors.blue.lightest,
    colors.blue.light,
    colors.blue.medium,
    colors.blue.dark,
    colors.blue.darker,
    colors.purple.lightest,
    colors.purple.light,
    colors.purple.medium,
    colors.purple.dark,
    colors.purple.darker,
    colors.grey.dark,
  ],
  unordered: [
    colors.teal.medium,
    colors.blue.medium,
    colors.purple.medium,
    colors.red.light,
    colors.brown.light,
    colors.teal.light,
    colors.blue.light,
    colors.purple.light,
    colors.red.dark,
    colors.brown.medium,
    colors.teal.dark,
    colors.blue.dark,
    colors.purple.dark,
    colors.red.medium,
    colors.brown.dark,
  ],
};

export { colorsets };
