import Layout from "@/components/Layout";
import { useTranslation } from "@/context/contextUtils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import LanguageSelector from "@/components/common/LanguageSelector";
import { sendActionToMachine } from "@/bridge";
import { getItems } from "@/slices/itemsSlice";
import { payment_success_deployment_time } from "@/config";
import { reset } from "@/slices/customerSlice";
import WalkAnimation from "@/components/common/WalkAnimation";
import { setShowDisclaimer, setWaitDisclaimer } from "@/slices/appSlice";

const PaymentSuccess = () => {
  const customerData = useAppSelector((state) => state.customerData);
  const configData = useAppSelector((state) => state.configData);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const t = useTranslation();

  const [pressed, setPressed] = useState("");
  const [processing, setProcessing] = useState(false);

  const keepBuyingClick = () => {
    sendActionToMachine("log", {message: `keep buying click`});
    setProcessing(true);
    sendActionToMachine("keepBuying").then((response) => {
      console.log(`bridge_actionFromWeb: keepBuying response =>`, response);
      if (response.success === true) {
        console.log("keepBuying success", response);

        //sendActionToMachine("setPage", { page: "home" });
        router.push("/");
      } else {
        console.log("keepBuying error", response);
      }
    });
  };
  const withdrawBalance = () => {
    sendActionToMachine("log", {message: `withdraw balance click`});
    setProcessing(true);
    sendActionToMachine("withdrawBalance").then((response) => {
      console.log(`bridge_actionFromWeb: withdrawBalance response =>`, response);
      if (response.success === true) {
        console.log("withdrawBalance success", response);
        if (configData.show_disclaimer) {

          console.log("payments success setShowDisclaimer true");

          if (configData.accepted_disclaimer_timeout > 0) {

            dispatch(setWaitDisclaimer(true));
          } else {

            dispatch(setShowDisclaimer(true));
            sendActionToMachine("disclaimerAccepted", { accepted: false });

          }
        }
        //sendActionToMachine("setPage", { page: "home" });
        router.push("/");
      } else {
        console.log("withdrawBalance error", response);
      }
    });
  };
  const handlePressed = (type: string) => {
    setPressed(type);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setPressed("");
    window.removeEventListener("mouseup", handleMouseUp);
  };


  useEffect(() => {
    sendActionToMachine("setPage", { page: "paymentsuccess" });
  }, []);

  useEffect(() => {
    let tm: number = 0;
    dispatch(getItems());
    if (!configData.confirm_payment) {
      tm = setTimeout(() => {
        if (configData.show_disclaimer) {

          if (configData.accepted_disclaimer_timeout > 0) {

            dispatch(setWaitDisclaimer(true));
          } else {

            dispatch(setShowDisclaimer(true));
            sendActionToMachine("disclaimerAccepted", { accepted: false });

          }


        }
        //sendActionToMachine("setPage", { page: "home" });
        router.push("/");
      }, payment_success_deployment_time) as unknown as number;
    }

    return () => {
      dispatch(reset());
      clearTimeout(tm);
    };
  }, [router, dispatch, configData.confirm_payment, configData.show_disclaimer, configData.accepted_disclaimer_timeout]);

  return (
    <Layout pageTitle="Dispenser" description="Dispenser description">
      <section className="payment-success page">
        {!processing && (
          <>
            <img alt="Dispenser" className="floating-logo" src="images/logo.png" />
            {customerData.balance > 0 && !configData.give_change_immediately && (
              <div data-testid="payment-success-top-balance" className="balance-container">
                <div className="label">{t("balance")}</div>
                <div className="balance">
                  {configData.currency.symbol}
                  {customerData.balance.toFixed(2)}
                </div>
              </div>
            )}
            <div className="container">
              <LanguageSelector />
              <div className="title">{t("purchase_thanks")}</div>
              <div className="subtitle">{customerData.text}</div>

              {customerData.balance > 0 && !configData.give_change_immediately && (
                <div data-testid="payment-success-balance" className="balance">
                  {t("current_balance")}{" "}
                  <strong>
                    {configData.currency.symbol}
                    <span className="balance-amount">{customerData.balance.toFixed(2)}</span>
                  </strong>
                </div>
              )}

              {configData.confirm_payment && (
                <div data-testid="confirm-buttons" className={`buttons`}>
                  <div
                    className={`button withdraw-balance press ${pressed == "withdraw_balance" ? " pressed" : ""}`}
                    onMouseDown={() => handlePressed("withdraw_balance")}
                    onClick={withdrawBalance}
                  >
                    {t("withdraw_balance")}
                  </div>
                  <div
                    className={`button keep-buying press ${pressed == "keep_buying" ? " pressed" : ""}`}
                    onMouseDown={() => handlePressed("keep_buying")}
                    onClick={keepBuyingClick}
                  >
                    {t("keep_buying")}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
      {processing && <WalkAnimation />}
    </Layout>
  );
};
export default PaymentSuccess;
