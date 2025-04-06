
export const playSong = () => {
  const winnerElement = document.getElementById("winnerAudio") as HTMLAudioElement;
  if (winnerElement) {
    winnerElement.play();
  }
};
export const pauseSong = () => {
  const winnerElement = document.getElementById("winnerAudio") as HTMLAudioElement;
  if (winnerElement && winnerElement.paused === false) {
    winnerElement.pause();
    winnerElement.currentTime = 0;
  }
};
