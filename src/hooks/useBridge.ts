import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { animateDispatchItems } from "@/utils/animateDispatchItem";
import { useRouter } from "next/router";
import { DataContext } from "@/context/DataContext";
import { playAudio } from "@/utils/audio";
import { getItems } from "@/slices/itemsSlice";
import { setConnected, setPendingPayment } from "@/slices/appSlice";
import { reset } from "@/slices/customerSlice";
import { reset as resetPrize } from "@/slices/prizeSlice";

export default function useBridge() {
  const dispatch = useAppDispatch();
  const customerData = useAppSelector((state) => state.customerData);

  const { changeLanguage } = useContext(DataContext);
  const router = useRouter();

  useEffect(() => {
    const executeAction = (param: string) => {
      const obj = JSON.parse(param);
      console.log("ACTION", obj.action);
      console.log("DATA", obj.data);
      switch (obj.action) {
        case "init":
          dispatch(reset());
          changeLanguage(obj.data.default_language);
          break;
        case "dispatchItems":
          console.log("dispatchItems", obj.data.cards);

          if (customerData.items.length > 0) {
            animateDispatchItems(obj.data.cards);
          }
          break;
        case "checkPrize":
          console.log("-----------------> checkPrize");
          dispatch(reset());
          console.log("-----------------> reseted");
          dispatch(resetPrize());
          console.log("-----------------> resetedPrize");
          //sendActionToMachine("setPage", { page: "validation" });
          console.log("-----------------> sendActionToMachine setPage validation");
          router.push("/checkprize");
          break;
        case "moneyDispensed":
          break;
        case "refreshItems":
          dispatch(getItems());
          break;
        case "hideMessage":
          if (obj.data && obj.data.go_home && router.pathname !== "/") {
            console.log("goHome");
            //sendActionToMachine("setPage", { page: "home" });
            router.push("/");
          }
          break;
        case "connected":
          dispatch(setConnected(true));
          break;
        case "disconnected":
          dispatch(setConnected(false));
          break;
        case "goHome":
          console.log("goHome");
          //sendActionToMachine("setPage", { page: "home" });
          router.push("/");
          break;
        case "outOfService":
          dispatch(setPendingPayment(obj.data.pending_payment));
          //sendActionToMachine("setPage", { page: "outofservice" });
          router.push("/outofservice");
          break;
        case "updateBalance":
          if (obj.data.balance > 0) {
            const balanceElm = document.querySelector(".balance-container .balance");
            balanceElm?.classList.remove("animated");
            setTimeout(() => {
              playAudio("balance");
              balanceElm?.classList.add("animated");
            }, 500);
          }
          break;
        default:
          //   console.log("Acción no encontrada");
          break;
      }
    };
    // Define la función en el objeto window
    (window as Window & typeof globalThis).bridge_actionFromMachine = function (param: string) {
      dispatch({ type: "bridge/actionFromMachine", payload: param });
      executeAction(param);
    };

    return () => {
      (window as Window & typeof globalThis).bridge_actionFromMachine = () => { };
    };
  }, []); // eslint-disable-line
}
