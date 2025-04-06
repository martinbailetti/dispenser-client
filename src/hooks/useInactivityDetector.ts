import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearItems, setInactivityWarning } from "@/slices/customerSlice";
import { setItems } from "@/slices/itemsSlice";
import { DataContext } from "@/context/DataContext";
import { setPending, setShowDisclaimer, setWaitDisclaimer } from "@/slices/appSlice";
import { ItemInterface } from "@/types";
import { sendActionToMachine } from "@/bridge";
type SetDetailOpenedType = (value: ItemInterface | null) => void; // eslint-disable-line no-unused-vars
const useInactivityDetector = (timeout: number, setDetailOpened: SetDetailOpenedType) => {
  const customerData = useAppSelector((state) => state.customerData);
  const { changeLanguage } = useContext(DataContext);
  const configData = useAppSelector((state) => state.configData);

  const dispatch = useAppDispatch();

  const configDataShowDisclaimer = useAppSelector((state) => state.configData.show_disclaimer);
  const appData = useAppSelector((state) => state.appData);
  const router = useRouter();

  const timer: MutableRefObject<NodeJS.Timeout | null> | null = useRef(null);


  useEffect(() => {

    console.log("useInactivityDetector");
    const resetTimer = () => {

      if (timer.current) {
        clearTimeout(timer.current);
      }
      if (customerData.inactivity_warning) {
        dispatch(setInactivityWarning(false));
      }
      timer.current = setTimeout(() => {
        console.log("Goodbye!");
        if (customerData.balance > 0) {
          // show modal warning sound
          dispatch(setInactivityWarning(true));
        } else {
          changeLanguage(configData.default_language);

          if (configDataShowDisclaimer) {
            console.log("useInactivityDetector setShowDisclaimer true");    
            dispatch(setWaitDisclaimer(false));
            dispatch(setShowDisclaimer(true));
            sendActionToMachine("disclaimerAccepted", { accepted: false });
          }
          dispatch(clearItems());
          setDetailOpened(null);
          dispatch(setPending(true));
          if (router.pathname !== "/") {
            dispatch(setItems([]));
            //sendActionToMachine("setPage", { page: "home" });
            router.push("/");
          }
        }
      }, timeout * 1000);
    };
    const handleActivity = () => {
      if (appData.wait_disclaimer) {
        dispatch(setWaitDisclaimer(false));

      }
      resetTimer();
    };

    // List of events that we consider as user activity
    const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];

    // Attach event listeners
    activityEvents.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    resetTimer();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      activityEvents.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [router, timeout, customerData.balance, changeLanguage, configData.default_language, configDataShowDisclaimer, customerData.inactivity_warning, dispatch, appData.pending, appData.pending_video, setDetailOpened, appData.wait_disclaimer]);
};

export default useInactivityDetector;
