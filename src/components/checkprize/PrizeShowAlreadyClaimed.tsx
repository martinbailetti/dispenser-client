import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "@/context/contextUtils";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { reset } from "@/slices/prizeSlice";
import { setItems } from "@/slices/itemsSlice";
import { clearItems } from "@/slices/customerSlice";
import { already_claimed_message_wait } from "@/config";
import { pauseSong } from "@/utils/song";
import { setShowDisclaimer, setWaitDisclaimer } from "@/slices/appSlice";
import { sendActionToMachine } from "@/bridge";

const PrizeShowAlreadyClaimed = () => {
  const [pressed, setPressed] = useState("");

  const prizeDataStatus = useAppSelector((state) => state.prizeData.status);
  const configDataShowDisclaimer = useAppSelector((state) => state.configData.show_disclaimer);
  const configDataAcceptedDisclaimerTimeout = useAppSelector((state) => state.configData.accepted_disclaimer_timeout);

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
    sendActionToMachine("log", {message: "prize show already claimed go home"});
    dispatch(setItems([]));
    dispatch(clearItems());
    dispatch(reset());

    if (configDataShowDisclaimer) {

      if (configDataAcceptedDisclaimerTimeout > 0) {

        dispatch(setWaitDisclaimer(true));
      } else {

        dispatch(setShowDisclaimer(true));
        sendActionToMachine("disclaimerAccepted", { accepted: false });

      }
    }
    pauseSong();
    //sendActionToMachine("setPage", { page: "home" });
    router.push("/");
  };

  useEffect(() => {
    let timeout = null;
    if (prizeDataStatus == "READY") {
      timeout = setTimeout(goHome, already_claimed_message_wait);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [prizeDataStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="looser" data-testid="claimed">
      <img alt="Dispenser" className="logo" src="images/logo_big.png" />
      <div className="title">{t("already_claimed")}</div>
      <div className="subtitle">{t("keep_playing")}</div>

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
}
PrizeShowAlreadyClaimed.displayName = "PrizeShowAlreadyClaimed";
export default PrizeShowAlreadyClaimed;
