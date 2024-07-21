type Position = {
  left: string;
  top: string;
};

export const calculatePositions = (numPlayers: number): Position[] => {
  const positions: Position[] = [];
  const a = 460; // horizontal radius of the ellipse in pixels
  const b = 260; // vertical radius of the ellipse in pixels
  const centerX = 400; // center X coordinate
  const centerY = 200; // center Y coordinate

  for (let i = 0; i < numPlayers; i++) {
    const angle = ((2 * Math.PI) / numPlayers) * i; // angle in radians
    const x = centerX + a * Math.cos(angle) - 40; // Adjust -40 for player icon size
    const y = centerY + b * Math.sin(angle) - 40; // Adjust -40 for player icon size
    positions.push({ left: `${x}px`, top: `${y}px` });
  }

  return positions;
};
