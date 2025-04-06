import { SelectedItemInterface } from "@/types";
import { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/context/contextUtils";
import { clearItems } from "@/slices/customerSlice";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { sendActionToMachine } from "@/bridge";
import { playAudio } from "@/utils/audio";

interface ItemProps {
  startProcessing: () => void;
  detailOpened: boolean;
}

const HeaderContainer = memo(({ startProcessing, detailOpened }: ItemProps) => {
  const dispatch = useAppDispatch();

  const t = useTranslation();
  const router = useRouter();
  const [pressed, setPressed] = useState("");

  const customerData = useAppSelector((state) => state.customerData);
  const configData = useAppSelector((state) => state.configData);
  const itemsData = useAppSelector((state) => state.itemsData);

  const total = useMemo(() => {
    return customerData.items.reduce(
      (acc: number, item: SelectedItemInterface) => acc + item.price * item.quantity,
      0,
    );
  }, [customerData.items]);

  const handlePressed = (type: string) => {
    setPressed(type);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setPressed("");
    window.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    // Code to execute when customerData changes
  }, [customerData, itemsData]);

  const handleClearItems = () => {
    if (total > 0 && !detailOpened) {
      sendActionToMachine("log", {message: `clear items`});
      playAudio("click");
      dispatch(clearItems());
    }
  };

  const handleBuy = async () => {
    if (total > 0 && !detailOpened) {
      sendActionToMachine("log", {message: `buy click: ${JSON.stringify(customerData)}`});
      playAudio("click");
      startProcessing();
      try {
        const response = await sendActionToMachine("buy", customerData.items);

        if (response.success === true) {
        //  sendActionToMachine("setPage", { page: "payment" });
          router.push("/payment");
        } else {
          console.log("footer error", response);
        }
      } catch (error) {
        console.log("footer error");
      }
    }
  };
  return (
    <header className="header" data-testid="header">
      <div className="total-label">
        {t("total")}{" "}
        <span id="total" className="total">
          {configData.currency.symbol}
          {total.toFixed(2)}
        </span>
      </div>
      <div className={`buttons ${total == 0 || detailOpened ? "disabled" : ""}`}>
        <div
          data-testid="buy-button"
          className={`button buy press ${pressed == "buy" ? " pressed" : ""}`}
          onMouseDown={() => handlePressed("buy")}
          onTouchStart={() => {
            handlePressed("buy");
          }}
          onTouchEnd={() => {
            handleMouseUp();
          }}
          onClick={handleBuy}
        >
          {t("buy")}
        </div>
        <div
          className={`button cancel press ${pressed == "cancel" ? " pressed" : ""}`}
          onMouseDown={() => handlePressed("cancel")}
          onTouchStart={() => {
            handlePressed("cancel");
          }}
          onTouchEnd={() => {
            handleMouseUp();
          }}
          onClick={handleClearItems}
        >
          {t("delete")}
        </div>
      </div>
      <div className="balance-container">
        <div className="label">{t("balance")}</div>
        <div className="balance">
          {configData.currency.symbol}
          <span className="balance-amount">{customerData.balance.toFixed(2)}</span>
        </div>
      </div>
    </header>
  );
});

HeaderContainer.displayName = "HeaderContainer";
export default HeaderContainer;
