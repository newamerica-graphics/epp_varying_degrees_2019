import { colors } from "./colors";


const colorsets = {
  base: [
    colors.grey.medium,
    colors.grey.dark,
    colors.grey.light,
  ],
  diverging: [
    colors.turquoise.dark,
    colors.turquoise.medium,
    colors.red.light,
    colors.red.dark,
  ],
  diverging_neutral_last: [
    colors.turquoise.dark,
    colors.turquoise.medium,
    colors.red.light,
    colors.red.dark,
    colors.grey.light,
  ],
  diverging_neutral_center: [
    colors.turquoise.dark,
    colors.turquoise.medium,
    colors.grey.medium,
    colors.red.light,
    colors.red.dark,
  ],
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
    colors.turquoise.medium,
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
