export const getFishImage = (owed: number): string => {
  const thresholds = [500, 400, 300, 250, 200, 150, 100, 50];
  const closest = thresholds.find((t) => owed >= t) || 50;
  return `assets/${closest}.png`;
};

export const getFishLevelUpMessage = (
  playerName: string,
  newTook: number
): string => {
  const messages: { threshold: number; message: (name: string) => string }[] = [
    {
      threshold: 500,
      message: (name) =>
        `😅 ${name} just blew past 500... that’s a whale in trouble 🐋💸`,
    },
    {
      threshold: 400,
      message: (name) => `😬 ${name} is like the dead sea, minus 400💸`,
    },
    {
      threshold: 300,
      message: (name) =>
        `🤯 ${name} is falling hard. How many rebuys is that??`,
    },
    {
      threshold: 250,
      message: (name) =>
        `🫣 ${name} just took another hit. It's not looking good.`,
    },
    {
      threshold: 200,
      message: (name) => `👀 ${name} should maybe step away from the table...`,
    },
    {
      threshold: 150,
      message: (name) =>
        `🤔 ${name} is starting to spiral. Chips disappearing fast.`,
    },
    {
      threshold: 100,
      message: (name) =>
        `😐 ${name} just doubled down. Brave? Desperate? Both?`,
    },
    {
      threshold: 50,
      message: (name) => `🐟 ${name} just bought in. Welcome to the deep end.`,
    },
  ];

  const entry = messages.find(({ threshold }) => newTook >= threshold);
  return entry
    ? entry.message(playerName)
    : `${playerName} is testing the waters 🐠`;
};
