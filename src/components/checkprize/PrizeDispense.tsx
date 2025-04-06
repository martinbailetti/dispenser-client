import { useAppSelector } from "@/redux/hooks";
import { useTranslation } from "@/context/contextUtils";
import { memo } from "react";

const PrizeDispense = () => {
  const currency = useAppSelector((state) => state.configData.currency);
  const prizeData = useAppSelector((state) => state.prizeData);
  const t = useTranslation();
  return (
    <div className="dispense" data-testid="dispense">
      <div className="dispense-content">
        <div className="logo">
          <img alt="Dispenser" src="images/logo_big.png" />
        </div>
        {prizeData.type == "money" && (
          <div className="money">
            <div className="title">{t("dispensing_prize")}</div>
            <div className="counter">
              {currency.symbol}
              {prizeData.remainingMoneyToDispense > 0
                ? prizeData.remainingMoneyToDispense.toFixed(2)
                : prizeData.winPrize.toFixed(2)}
            </div>
          </div>
        )}
        {prizeData.type == "card" && (
          <div className="card">
            <div className="title">{t("dispensing_prize")}</div>
            <div className="counter">
              {prizeData.remainingMoneyToDispense > 0
                ? prizeData.remainingMoneyToDispense
                : prizeData.winPrize}{" "}
              {prizeData.remainingMoneyToDispense == 1 ? t("card") : t("cards")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(PrizeDispense);
