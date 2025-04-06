import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "@/context/contextUtils";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { reset } from "@/slices/prizeSlice";
import { setItems } from "@/slices/itemsSlice";
import { clearItems } from "@/slices/customerSlice";
import { pauseSong } from "@/utils/song";
import { setShowDisclaimer, setWaitDisclaimer } from "@/slices/appSlice";
import { sendActionToMachine } from "@/bridge";

export const PrizeShowLooser = memo(() => {
  const [pressed, setPressed] = useState("");


  const configDataVideoLooser = useAppSelector((state) => state.configData.video_looser);
  const configDataShowDisclaimer = useAppSelector((state) => state.configData.show_disclaimer);
  const configDataAcceptedDisclaimerTimeout = useAppSelector((state) => state.configData.accepted_disclaimer_timeout);

  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const t = useTranslation();

  const handlePressed = (type: string) => {
    setPressed(type);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setPressed("");
    window.removeEventListener("mouseup", handleMouseUp);
  };
  const goHome = () => {
    sendActionToMachine("log", {message: "prize show looser go home"});
    dispatch(setItems([]));
    dispatch(clearItems());
    dispatch(reset());
    pauseSong();
    if (configDataShowDisclaimer) {

      if (configDataAcceptedDisclaimerTimeout > 0) {

        dispatch(setWaitDisclaimer(true));
      } else {

        dispatch(setShowDisclaimer(true));
        sendActionToMachine("disclaimerAccepted", { accepted: false });

      }
    }
    //sendActionToMachine("setPage", { page: "home" });
    router.push("/");
  };

  useEffect(() => {
    const handleVideoEnded = () => {
      goHome();
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="looser" data-testid="looser">
      <video className="video" ref={videoRef} autoPlay>
        <source src={`${configDataVideoLooser}`} type="video/mp4" />
      </video>
      <div className="title">{t("keep_playing")}</div>

      <div
        data-testid="close"
        className={`button close press ${pressed == "close" ? " pressed" : ""}`}
        onMouseDown={() => handlePressed("close")}
        onClick={goHome}
      >
        {t("close")}
      </div>
    </div>
  );
});

PrizeShowLooser.displayName = "PrizeShowLooser";
export default PrizeShowLooser;
