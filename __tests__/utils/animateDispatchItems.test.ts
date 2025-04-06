// Archivo de prueba: animateDispatchItem.test.ts
import { animateDispatchItem } from "@/utils/animateDispatchItem";
import { playAudio } from "@/utils/audio";

// Mock de playAudio
jest.mock("../../src/utils/audio", () => ({
  playAudio: jest.fn(),
}));

describe("animateDispatchItem", () => {
  let mockElement: HTMLElement;
  let mockImage: HTMLImageElement;

  beforeEach(() => {
    // Configurar el DOM simulado
    document.body.innerHTML = `
      <div id="payment_item_1_0">
        <div class="banner">
          <img src="test-image-src" />
        </div>
      </div>
    `;

    mockElement = document.getElementById("payment_item_1_0")!;
    mockImage = mockElement.querySelector("img")!;
  });

  afterEach(() => {
    // Limpiar simulaciones y DOM
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  test('llama a playAudio con "dispatch"', () => {
    animateDispatchItem({ id: "1", screen_position: 0 });
    expect(playAudio).toHaveBeenCalledWith("dispatch");
  });


  test("maneja el caso en que el ID no existe", () => {
    console.log = jest.fn(); // Simula console.log
    animateDispatchItem({ id: "2", screen_position: 0 });
    expect(console.log).toHaveBeenCalledWith("Item not found: 2");
    expect(document.querySelector(".game-animated-image")).toBeNull();
  });

  test("maneja el caso en que la imagen no existe", () => {
    document.body.innerHTML = `
      <div id="payment_item_1_0">
        <div class="banner"></div>
      </div>
    `;

    console.log = jest.fn(); // Simula console.log
    animateDispatchItem({ id: "1", screen_position: 0 });
    expect(console.log).toHaveBeenCalledWith("Image element not found");
  });

  test("elimina la imagen animada después de que termina la animación", () => {
    jest.useFakeTimers();
    animateDispatchItem({ id: "1", screen_position: 0 });

    const animatedImage = document.querySelector(".game-animated-image");
    expect(animatedImage).toBeInTheDocument();

    jest.advanceTimersByTime(5000); // Simula el paso del tiempo
    expect(animatedImage).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});
