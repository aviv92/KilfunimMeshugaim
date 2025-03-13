const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const getGameId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("gameId") || "default";
};

export const shareGame = (readOnly = true) => {
  const gameId = getGameId();
  const baseUrl = window.location.origin;

  const link = `${baseUrl}/?gameId=${gameId}${
    readOnly ? "&readonly=true" : ""
  }`;
  return copyToClipboard(link);
};
