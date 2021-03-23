/**
 * Choose one random element from array
 * @returns
 */
export const selectRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const randomIndex = (array) => Math.floor(Math.random() * array.length);

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
