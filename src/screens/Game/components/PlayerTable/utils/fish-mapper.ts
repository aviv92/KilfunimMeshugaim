export const getFishImage = (owed: number): string => {
  const thresholds = [600, 500, 400, 300, 250, 200, 150, 100, 50];
  const closest = thresholds.find((t) => owed >= t) || 50;
  return `assets/${closest}.png`;
};
