import { colors } from "./colors";


const colorsets = {
  base: [
    colors.grey.light,
    "transparent",
    "transparent",
  ],
  diverging: {
    positive: [
      colors.turquoise.medium,
      colors.turquoise.light,
    ],
    neutral: [
      colors.grey.medium_light,
    ],
    negative: [
      colors.red.light,
      colors.red.medium,
    ],
  },
  scale_decreasing: [
    colors.turquoise.dark,
    colors.turquoise.medium,
    colors.turquoise.light,
    colors.turquoise.very_light,
  ],
  scale_increasing: [
    colors.turquoise.very_light,
    colors.turquoise.light,
    colors.turquoise.medium,
    colors.turquoise.dark,
  ],
  boolean: [
    colors.turquoise.light,
    colors.red.light,
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
