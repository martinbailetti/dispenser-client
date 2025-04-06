import { memo, MutableRefObject, useEffect, useRef, useState } from "react";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setShowDisclaimer, setShowDisclaimerContent } from "@/slices/appSlice";
import { sendActionToMachine } from "@/bridge";

/**
 * Disclaimer component.
 */
const Disclaimer = () => {
  const dispatch = useAppDispatch();


  const [processing, setProcessing] = useState(false);

  const appData = useAppSelector((state) => state.appData);

  const appConfigShowDisclaimerTimeout = useAppSelector((state) => state.configData.show_disclaimer_timeout);

  const timer: MutableRefObject<NodeJS.Timeout | null> | null = useRef(null);

  const acceptDisclaimer = async () => {
    if (processing) {
      return
    }
    sendActionToMachine("log", {message: `disclaimer accepted click`});
    setProcessing(true);
    await sendActionToMachine("disclaimerAccepted", { accepted: true });

    dispatch(setShowDisclaimer(false));

    setProcessing(false);
  };

  useEffect(() => {
    console.log("useEffect Disclaimer");
    const close = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        console.log("timeout disclaimer");
        dispatch(setShowDisclaimerContent(false));
        sendActionToMachine("disclaimerAccepted", { accepted: false });


      }, appConfigShowDisclaimerTimeout * 1000);
    };

    close();

    // Cleanup event listeners on component unmount
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [dispatch, appData.show_disclaimer_content, appConfigShowDisclaimerTimeout]);

  return (
    <div
      data-testid="disclaimer"
      className="disclaimer"
      onClick={(event) => {
        event.stopPropagation();
        console.log("disclaimer click");
        dispatch(setShowDisclaimerContent(true));
      }
      }

    >
      {appData.show_disclaimer_content && (
        <div data-testid="disclaimer-content" className="disclaimer-content">
          <div className="logo">
            <img alt="Dispenser" src="images/logo_big.png" />
          </div>
          <div>
            <h1>¿Eres mayor de 18 años?</h1>
            <p>Debes ser mayor de edad para poder usar esta máquina.</p>

            <button data-testid="disclaimer-yes-button" onClick={acceptDisclaimer}>Sí</button>
            <button data-testid="disclaimer-no-button" className="cancel" onClick={(event) => {
              event.stopPropagation();
              if (processing) {
                return
              }
              setProcessing(true);

              const sendAction = async () => {
                const response = await sendActionToMachine("disclaimerAccepted", { accepted: false });
                if (response.success === true) {
                  dispatch(setShowDisclaimerContent(false));
                } else {
                  console.log("disclaimer error", response);
                }
                setProcessing(false);
              }

              sendActionToMachine("log", {message: `disclaimer not accepted click`});
              sendAction();
            }}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(Disclaimer);
