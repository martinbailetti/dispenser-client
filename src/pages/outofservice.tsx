import { useAppSelector } from "@/redux/hooks";
import Layout from "@/components/Layout";
import { useTranslation } from "@/context/contextUtils";
import { sendActionToMachine } from "@/bridge";
import { useEffect } from "react";
/**
 *
 * "Out of service" page component.
 */
const OutOfService = () => {
  const t = useTranslation();

  const appData = useAppSelector((state) => state.appData);
  const configData = useAppSelector((state) => state.configData);
  useEffect(() => {
    sendActionToMachine("setPage", { page: "outofservice" });
  }, []);
  return (
    <Layout pageTitle="Dispenser" description="Dispenser description">
      <section className="outofservice page">
        <header className="header">
          <h1>
            <img src="./images/logo.png" alt="Dispenser" />
          </h1>

          {appData.pending_payment > 0 && (
            <div className="balance-container">
              <div className="label">{t("balance")}</div>
              <div className="balance">
                {configData.currency.symbol}
                <span className="balance-amount">{appData.pending_payment.toFixed(2)}</span>
              </div>
            </div>
          )}
        </header>
        <div className="container">
          <div className="title">{t("error")}</div>

          <div className="text">{t("out_of_service")}</div>
          <div className="contact-text">
            <div className="info">{t("contact")}</div>
            <div className="data">
              <div>
                <img src="./images/phone.svg" alt="phone" />
                306-2288
              </div>
              <div>
                <img src="./images/whatsapp.svg" alt="whatsapp" />
                6193-8989
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default OutOfService;
