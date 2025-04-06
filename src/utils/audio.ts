import { audio } from "@/config";

export const playAudio = (type: string) => {
  let url = "";
  let volume = 1;
  switch (type) {
    case "dispatch":
      url = audio.dispatch.url;
      volume = audio.dispatch.volume;
      break;

    case "click":
      url = audio.click.url;
      volume = audio.click.volume;
      break;

    case "balance":
      url = audio.balance.url;
      volume = audio.balance.volume;
      break;

    default:
      break;
  }

  if (url !== "") {
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.volume = volume;

    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    try {
      audio.play();
    } catch (error) {
      console.log("Audio: ", error);
    }
  }
};
