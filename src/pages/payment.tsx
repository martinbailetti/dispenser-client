import Layout from "@/components/Layout";
import { SelectedItemInterface } from "@/types";
import { useTranslation } from "@/context/contextUtils";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import PaymentItemList from "@/components/payment/PaymentItemList";

import { useAppSelector } from "@/redux/hooks";
import { sendActionToMachine } from "@/bridge";
import { playAudio } from "@/utils/audio";
import LanguageSelector from "@/components/common/LanguageSelector";
import useInactivityDetector from "@/hooks/useInactivityDetector";

const Payment = () => {
  const customerData = useAppSelector((state) => state.customerData);
  const configData = useAppSelector((state) => state.configData);
  const total = useMemo(
    () =>
      customerData.items.reduce(
        (acc: number, item: SelectedItemInterface) => acc + item.price * item.quantity,
        0,
      ),
    [customerData.items],
  );
  const initial_status =
    !configData.confirm_payment && customerData.balance >= total && total > 0
      ? "PROCESSING"
      : "READY";
  const [status, setStatus] = useState(initial_status);

  const t = useTranslation();

  const router = useRouter();

  useInactivityDetector(configData.default_inactivity_time, () => null);



  useEffect(() => {
    sendActionToMachine("setPage", { page: "payment" });
  }, []);
  const pay = useCallback(async () => {
    setStatus("PROCESSING");

    const response = await sendActionToMachine("pay", customerData.items);

    if (response.success === true) {
      console.log("pay success", response);
    } else {
      console.log("pay error", response);
    }
  }, [customerData.items]);

  useEffect(() => {
    console.log("------------------->>>>>>>>>> PAYMENT", status, customerData.items.length, customerData.ended);
    if (
      status === "READY" &&
      !configData.confirm_payment &&
      customerData.items.length > 0 &&
      customerData.balance >= total
    ) {
      console.log("---- >  PAY CALLED");
      pay();
    } else if (customerData.items.length === 0 && status === "READY") {
      router.push("/");

    } else if (customerData.ended && status === "PROCESSING" && router.pathname !== "/paymentsuccess") {
      console.log("---- >  customerData.ended");
      router.push("/paymentsuccess");
    }
  }, [router, customerData, status, configData, total, pay]);

  const handleBuy = async () => {
    if (status === "PROCESSING") {
      return;
    }

    if (customerData.balance < total) {
      return;
    }

    sendActionToMachine("log", { message: `pay click: ${JSON.stringify(customerData)}` });
    pay();
  };

  return (
    <Layout pageTitle="Dispenser" description="Dispenser description">
      <section className="payment page show detail">
        <img className="floating-logo" src="images/logo.png" alt="Dispenser" />
        <div className="balance-container">
          <div className="label">{t("balance")}</div>
          <div className="balance" data-testid="payment-balance-amount">
            {configData.currency.symbol}
            {customerData.balance.toFixed(2)}
          </div>
        </div>
        <div className="container">
          <LanguageSelector />
          {configData.confirm_payment && (
            <div className="payments-title">{t("confirm_purchase")}</div>
          )}
          {!configData.confirm_payment && (
            <div className="payments-title">{t("purchase_summary")}</div>
          )}
          <PaymentItemList />
          <div className="total-container">
            <div className="text">{status == "READY" ? t("payment_text") : t("good_luck")}</div>
            <div className="total-price">
              <div className="total-label">{t("total")}</div>
              <div className="total">
                {configData.currency.symbol}
                <span>{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          {status == "READY" && customerData.balance > 0 && customerData.balance < total && (
            <div className="message alarm">
              {t("insert_n_money")} {configData.currency.symbol}
              {(total - customerData.balance).toFixed(2)}
            </div>
          )}
          {status == "READY" && customerData.balance == 0 && (
            <div className="message alarm">{t("insert_money")}</div>
          )}
          {status == "READY" && customerData.balance >= total && (
            <div className="message ok">{t("proceed_pay")}</div>
          )}
          {status == "PROCESSING" && <div className="message waiting">{t("processing_pay")}</div>}

          <div className="buttons">
            {status == "READY" && !configData.confirm_payment && customerData.balance < total && (
              <div
                className={`button cancel press`}
                onClick={() => {
                  playAudio("click");
                  sendActionToMachine("log", {
                    message: `cancel payment click: ${JSON.stringify(customerData)}`,
                  });
                  router.push("/");
                }}
              >
                {t("back")}
              </div>
            )}
            {status == "READY" && !configData.confirm_payment && customerData.balance >= total && (
              <div className={`button cancel press disabled`}>{t("back")}</div>
            )}
            {status == "READY" && configData.confirm_payment && (
              <div
                className={`button cancel press`}
                onClick={() => {
                  sendActionToMachine("log", {
                    message: `cancel payment click: ${JSON.stringify(customerData)}`,
                  });
                  playAudio("click");
                  router.push("/");
                }}
              >
                {t("back")}
              </div>
            )}
            {status == "PROCESSING" && (
              <div className={`button cancel press disabled`}>{t("back")}</div>
            )}

            {configData.confirm_payment && (
              <div
                className={`button pay press ${status == "PROCESSING" || customerData.balance < total ? "disabled" : ""}`}
                onClick={handleBuy}
              >
                {t("pay")}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Payment;
