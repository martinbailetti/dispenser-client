import { useRouter } from "next/router";
import { useEffect, useState, useRef, memo } from "react";
import { useTranslation } from "@/context/contextUtils";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendActionToMachine } from "@/bridge";
import { reset, setStatus } from "@/slices/prizeSlice";
import { clearItems } from "@/slices/customerSlice";
import { winner_but_no_money_message_wait } from "@/config";
import { pauseSong, playSong } from "@/utils/song";
import { setShowDisclaimer, setWaitDisclaimer } from "@/slices/appSlice";

const PrizeShowWinner = memo(() => {
  const [pressed, setPressed] = useState("");

  const currency = useAppSelector((state) => state.configData.currency);
  const videoWinner = useAppSelector((state) => state.configData.video_winner);
  const prizeData = useAppSelector((state) => state.prizeData);

  const prizeAmountContainer = useRef<HTMLDivElement>(null);

  const configDataShowDisclaimer = useAppSelector((state) => state.configData.show_disclaimer);
  const configDataAcceptedDisclaimerTimeout = useAppSelector(
    (state) => state.configData.accepted_disclaimer_timeout,
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const t = useTranslation();

  const handleCollectClick = async () => {
    sendActionToMachine("log", { message: `prize collect click ${JSON.stringify(prizeData)}` });
    if (!prizeData.enable_collect) {
      return;
    }

    const response = await sendActionToMachine("collect");

    if (response.success === true) {
      dispatch(setStatus("DISPENSING"));
    } else {
      console.log("prize show error", response);
    }
  };

  const handlePrizeToBalanceClick = async () => {
    sendActionToMachine("log", { message: `prize to balance click ${JSON.stringify(prizeData)}` });
    if (!prizeData.enable_collect) {
      return;
    }
    dispatch(setStatus("PROCESSING"));

    const response = await sendActionToMachine("prizeToBalance");

    if (response.success === true) {
      dispatch(clearItems());
      dispatch(reset());
      pauseSong();
      //sendActionToMachine("setPage", { page: "home" });
      router.push("/");
    } else {
      console.log("prize show error", response);
    }
  };

  const handlePressed = (type: string) => {
    setPressed(type);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setPressed("");
    window.removeEventListener("mouseup", handleMouseUp);
  };
  const goHome = () => {
    sendActionToMachine("log", { message: "prize show go home" });
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
    let timeout = null;
    if (prizeData.status == "READY") {
      playSong();

      if (!prizeData.available_money) {
        timeout = setTimeout(goHome, winner_but_no_money_message_wait);
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (prizeData.enable_collect && prizeData.type == "card") {
      dispatch(reset());
      dispatch(setStatus("ENDED"));
    }
  }, [prizeData, dispatch]);

  return (
    <div className="winner" data-testid="winner">
      <div className="title">{t("congratulations")}</div>
      <div className="subtitle">{t("press_image_view")}</div>

      <div ref={prizeAmountContainer} className="prize-amount-container">
        <div className="prize-amount">
          <span>{t("you_won")}</span>
          {prizeData.type == "money" && (
            <strong data-testid="prize-money">
              {currency.symbol}
              {prizeData.winPrize.toFixed(2)}
            </strong>
          )}
          {prizeData.type == "card" && (
            <strong data-testid="prize-card">
              {prizeData.winPrize} {prizeData.winPrize > 1 ? t("cards") : t("card")}
            </strong>
          )}
        </div>
        <div
          className={`prize-amount-cover ${pressed === "cover" ? "pressed" : ""}`}
          onMouseDown={() => handlePressed("cover")}
          onMouseUp={() => handleMouseUp()}
          onTouchStart={() => handlePressed("cover")}
          onTouchEnd={() => handleMouseUp()}
        >
          <video className="video" ref={videoRef} autoPlay>
            <source src={`${videoWinner}`} type="video/mp4" />
          </video>
        </div>
      </div>

      {prizeData.available_money && (
        <>
          {!prizeData.enable_collect && <div className="collect-text">{t("input_card")}</div>}

          {prizeData.enable_collect && (
            <>
              <div className="use-prize-text">{t("use_prize")}</div>
              <div
                data-testid="prize-more"
                className={`button more press ${pressed == "more" ? " pressed" : ""}`}
                onMouseDown={() => handlePressed("more")}
                onClick={handlePrizeToBalanceClick}
              >
                {t("go_to_store")}
              </div>
              <div className="or-text">{t("or")}</div>

              <div
                data-testid="prize-collect"
                className={`button collect press ${pressed == "collect" ? " pressed" : ""}`}
                onMouseDown={() => handlePressed("collect")}
                onClick={handleCollectClick}
              >
                {t("collect_prize")}
              </div>
            </>
          )}
        </>
      )}

      {!prizeData.available_money && (
        <>
          <div className="no-money">{t("not_enough_money")}</div>
          <div className="button back" onClick={goHome}>
            {t("back_to_home")}
          </div>
        </>
      )}

      <div
        className={`floating-hand-winner-container ${prizeData.enable_collect ? "collect" : ""}`}
      >
        <img alt="Dispenser" className="floating-hand-winner" src="./images/hand_winner.svg" />
      </div>

      {prizeData.available_money && !prizeData.enable_collect && (
        <div className="floating-hand-deposit-container">
          <img src="images/hand.png" alt="Dispenser" className="floating-hand-deposit" />
        </div>
      )}
    </div>
  );
});

PrizeShowWinner.displayName = "PrizeShowWinner";
export default PrizeShowWinner;
