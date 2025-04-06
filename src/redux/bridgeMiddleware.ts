import { dispatchItemsWait } from "@/config";
import {
  hideMessage,
  setPending,
  setShowDisclaimer,
  setShowDisclaimerContent,
  showMessage,
} from "@/slices/appSlice";
import { setConfig } from "@/slices/configSlice";
import { clearItems, dispatchEnded, dispatchItems, setBalance } from "@/slices/customerSlice";
import { setDevicesInWarning } from "@/slices/devicesInWarningSlice";
import { setItems } from "@/slices/itemsSlice";
import { dispense, setEnableCollect, setPrize, setProcessing } from "@/slices/prizeSlice";
import { Middleware } from "@reduxjs/toolkit";

export const bridgeMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    if (action.type !== "bridge/actionFromMachine") {
      return next(action);
    }

    const obj = JSON.parse(action.payload);

    console.log(`bridge_actionFromMachine(${action.payload})`, obj);
    switch (obj.action) {
      case "updateBalance":
        if (obj.data.balance >= 0) {
          dispatch(setBalance(obj.data.balance));
        } else {
          dispatch(
            showMessage({
              message: "Wrong balance: " + obj.data.balance,
              position: "center", // top, bottom, center
              closeButton: true, // shows close button
              timeout: 0,
              background: true, // shows black semi-transparent background
              type: "error", // info, warning, error
            }),
          );
        }
        break;
      case "setDevicesInWarning":
        dispatch(setDevicesInWarning(obj.data));
        break;
      case "init":
        console.log("---------------------->bridgeMiddleware init ");
        dispatch(setConfig(obj.data));
        dispatch(setShowDisclaimer(obj.data.show_disclaimer));
        break;
      case "setItems":
        dispatch(setItems(obj.data));
        dispatch(clearItems());
        break;
      case "dispatchItems":
        setTimeout(() => dispatch(dispatchItems(obj.data)), dispatchItemsWait);
        break;
      case "checkPrize":
        dispatch(setPending(false));
        dispatch(setProcessing());
        break;
      case "prize":
        dispatch(setPrize(obj.data));
        break;
      case "moneyDispensed":
        console.log("-----------------> moneyDispensed", obj.data);
        dispatch(dispense(obj.data));
        break;
      case "cardInserted":
        dispatch(setEnableCollect(true));
        break;
      case "showMessage":
        dispatch(showMessage(obj.data));
        break;
      case "hideMessage":
        dispatch(hideMessage());
        break;
      case "dispatchEnded":
        dispatch(dispatchEnded(obj.data));
        break;
      case "showDisclaimer":
        console.log("------------------------------------>bridgeMiddleware setShowDisclaimer true");

        dispatch(setShowDisclaimer(true));
        dispatch(setShowDisclaimerContent(true));
        dispatch(setPending(false));

        break;
      case "acceptDisclaimer":
        console.log("bridgeMiddleware acceptDisclaimer false");
        dispatch(setShowDisclaimer(false));
        dispatch(setPending(false));

        break;
      default:
        console.log("No action on middleware for action: ", obj.action);
        break;
    }
  };
