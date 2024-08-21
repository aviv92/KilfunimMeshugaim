import { Player } from "../../stores/usePlayerStore";

const getClubBurn = (amount: string) => {
  if (amount === "50") return `${amount} Boonkers club`;
  if (amount === "100") return `${amount} Solidi club`;
  if (amount === "150") return `${amount} Fish club`;
  if (amount === "200") return `${amount} Megafish club`;
  if (amount === "250") return `${amount} Ultrafish club`;

  return `${amount} Tilt fish club`;
};

export const speakOwedAmounts = (players: Player[]) => {
  const synth = window.speechSynthesis;
  const utterances: SpeechSynthesisUtterance[] = [];

  const intro = new SpeechSynthesisUtterance("Yo Yo Yo Listen up fishes");
  utterances.push(intro);

  const groupedByOwed = players.reduce((acc, player) => {
    const amount = player.owed;
    if (!acc[amount]) {
      acc[amount] = [];
    }
    acc[amount].push(player.name);
    return acc;
  }, {} as { [key: number]: string[] });

  Object.keys(groupedByOwed).forEach((amount: any) => {
    const names = groupedByOwed[amount];
    const utterance = new SpeechSynthesisUtterance(
      `${getClubBurn(amount)} ${names.join(", ")}`
    );
    utterances.push(utterance);
  });

  const speakNext = (index: number) => {
    if (index < utterances.length) {
      utterances[index].onend = () => {
        setTimeout(() => speakNext(index + 1), 10);
      };
      synth.speak(utterances[index]);
    }
  };

  speakNext(0);
};
