import { colors } from "./colors";


const colorsets = {
  base: [
    colors.grey.medium,
    colors.grey.medium,
    colors.grey.medium,
  ],
  diverging: [
    colors.turquoise.medium,
    colors.turquoise.light,
    colors.red.light,
    colors.red.medium,
  ],
  diverging_neutral_last: [
    colors.turquoise.medium,
    colors.turquoise.light,
    colors.red.light,
    colors.red.medium,
    colors.grey.medium_light,
  ],
  diverging_neutral_center: [
    colors.turquoise.medium,
    colors.turquoise.light,
    colors.grey.medium_light,
    colors.red.light,
    colors.red.medium,
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
