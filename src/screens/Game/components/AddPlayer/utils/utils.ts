export const cleanAndSplitNames = (input: string): string[] => {
  let cleanedInput = input.replace(/,,+/g, ",").trim(); // Remove consecutive commas and trim
  if (cleanedInput.startsWith(",")) {
    cleanedInput = cleanedInput.substring(1);
  }
  if (cleanedInput.endsWith(",")) {
    cleanedInput = cleanedInput.slice(0, -1);
  }
  return cleanedInput
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
};

// Alphabetically sorted list
export const predefinedPlayers = [
  "Avihoo",
  "Aviv",
  "Barak",
  "Barhom",
  "Hod",
  "Itsik",
  "Kubani",
  "Meniv",
  "Moshiko",
  "Orel",
  "Tamir",
  "Yoni",
  "Yotam",
];
