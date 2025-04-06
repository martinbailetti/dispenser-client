import { memo, useEffect } from "react";

const WalkAnimation = memo(() => {
  useEffect(() => {
    const animation = document.querySelector(".walk-animation .frame") as HTMLElement;

    let frame = 0;
    let total = 45;

    function animate() {
      animation.classList.remove(`frame_${frame}`);
      frame = frame === total ? 0 : frame + 1;
      animation.classList.add(`frame_${frame}`);
    }

    // Ejecuta animate cada 111ms para obtener aproximadamente 9 frames por segundo
    const intervalId = setInterval(animate, 140);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="walk-animation" data-testid="walk-animation">
      <div className="frame"></div>
    </div>
  );
});

WalkAnimation.displayName = "WalkAnimation";
export default WalkAnimation;
