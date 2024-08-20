import { Player } from "../../stores/usePlayerStore";

export const speakOwedAmounts = (players: Player[]) => {
  const synth = window.speechSynthesis;
  const utterances: SpeechSynthesisUtterance[] = [];

  const introYOYO = new SpeechSynthesisUtterance("Yo Yo Yo");
  utterances.push(introYOYO);

  const intro = new SpeechSynthesisUtterance("Listen up fishes");
  utterances.push(intro);

  players.forEach((player) => {
    const utterance = new SpeechSynthesisUtterance(
      `${player.name} ${player.owed}`
    );
    utterances.push(utterance);
  });

  const speakNext = (index: number) => {
    if (index < utterances.length) {
      utterances[index].onend = () => {
        setTimeout(() => speakNext(index + 1), 100); // Wait for 100 ms before the next utterance
      };
      synth.speak(utterances[index]);
    }
  };

  speakNext(0);
};
