import { dispathItemsMaxAngle, dispathItemsMinAngle } from "@/config";
import { DispatchItemInterface } from "@/types";
import { playAudio } from "@/utils/audio";

export const animateDispatchItems = (cards: DispatchItemInterface[]) => {
  cards.forEach((item) => {
    animateDispatchItem(item);
  });
};
export const animateDispatchItem = (item: DispatchItemInterface) => {
  console.log("----------> animateDispatchItem", item);
  const itemElm = document.getElementById(`payment_item_${item.id}_${item.screen_position}`);
  if (itemElm == null) {
    console.log("Item not found: " + item.id);

    return;
  }

  const imgElm: HTMLImageElement | null = itemElm.querySelector(".banner img");
  if (imgElm == null) {
    console.log("Image element not found");

    return;
  }

  playAudio("dispatch");
  const rect = imgElm.getBoundingClientRect();

  const newImgElm = document.createElement("img");

  newImgElm.src = imgElm.src;

  newImgElm.classList.add("game-animated-image");
  newImgElm.style.top = rect.top + "px";
  newImgElm.style.left = rect.left + "px";
  newImgElm.style.width = "auto";
  newImgElm.style.height = rect.height + "px";

  document.body.appendChild(newImgElm);

  const projectile = newImgElm;
  const g = 9.8; // Aceleración debido a la gravedad (m/s^2)
  const initVelocity = 60; // Velocidad inicial en metros por segundo

  const angle = Math.random() * (dispathItemsMaxAngle - dispathItemsMinAngle) + dispathItemsMinAngle; // Ángulo de lanzamiento aleatorio entre 60 y 70 grados
  const initX = rect.left; // Posición inicial en píxeles

  const initY = rect.top + (Math.random() * 10 - 5); // Posición inicial en píxeles con variación de +/- 5

  const radians = angle * (Math.PI / 180); // Convertir ángulo a radianes
  const initVelocityX = initVelocity * Math.cos(radians);
  const initVelocityY = initVelocity * Math.sin(radians);

  let time = 0;

  const refreshPosition = () => {


    const posX = initX + initVelocityX * time;
    const posY = initY - (initVelocityY * time - 0.5 * g * Math.pow(time, 2));
    projectile.style.left = posX + "px";
    projectile.style.top = posY + "px";

    const h = window.innerHeight - initY; // altura inicial en metros
    const timeToReachFinalPos =
      (initVelocityY + Math.sqrt(Math.pow(initVelocityY, 2) + 2 * g * h)) / g;

    const plusScale = 1;

    projectile.style.transform = "scale(" + (1 + (plusScale * time) / timeToReachFinalPos) + ")";

    time += 0.5;

    if (posY < window.innerHeight) {
      requestAnimationFrame(refreshPosition);
    } else {
      newImgElm.remove();
    }
  };

  requestAnimationFrame(refreshPosition);
};
