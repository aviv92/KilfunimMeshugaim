import { Player } from "../../../stores/usePlayerStore";

export type Position = {
  left: string;
  top: string;
};

export const calculatePositions = (
  numPlayers: number,
  isMobile: boolean
): Position[] => {
  const positions: Position[] = [];
  const a = isMobile ? 170 : 460; // horizontal radius of the ellipse in pixels
  const b = isMobile ? 180 : 320; // vertical radius of the ellipse in pixels
  const centerX = isMobile ? 170 : 400; // center X coordinate
  const centerY = isMobile ? 180 : 260; // center Y coordinate

  for (let i = 0; i < numPlayers; i++) {
    const angle = ((2 * Math.PI) / numPlayers) * i; // angle in radians
    const x = centerX + a * Math.cos(angle) - (isMobile ? 15 : 40); // Adjust -40 for player icon size
    const y = centerY + b * Math.sin(angle) - (isMobile ? 15 : 40); // Adjust -40 for player icon size
    positions.push({ left: `${x}px`, top: `${y}px` });
  }

  return positions;
};
export const speakOwedAmounts = (players: Player[]) => {
  const synth = window.speechSynthesis;
  const utterances: SpeechSynthesisUtterance[] = [];

  const introYOYO = new SpeechSynthesisUtterance("Yo Yo Yo");
  utterances.push(introYOYO);

  const intro = new SpeechSynthesisUtterance("Listen up fishes");
  utterances.push(intro);

  players.forEach((player) => {
    const utterance = new SpeechSynthesisUtterance(
      `${player.name} owes ${player.owed} shekel`
    );
    utterances.push(utterance);
  });

  const speakNext = (index: number) => {
    if (index < utterances.length) {
      utterances[index].onend = () => {
        setTimeout(() => speakNext(index + 1), 100); // Wait for 1 second before the next utterance
      };
      synth.speak(utterances[index]);
    }
  };

  speakNext(0);
};
