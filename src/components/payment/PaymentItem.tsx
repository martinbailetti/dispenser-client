import { useTranslation } from "@/context/contextUtils";
import { SelectedItemInterface } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { memo, useContext } from "react";
import { DataContext } from "@/context/DataContext";

interface ItemProps {
  data: SelectedItemInterface;
}

const PaymentItem = memo(({ data }: ItemProps) => {
  const configData = useAppSelector((state) => state.configData);
  const { language } = useContext(DataContext);

  const t = useTranslation();

  const title = JSON.parse(data.title)[language];
  return (
    <div className="payment-item" id={`payment_item_${data.id}_${data.screen_position}`}>
      <div className="content">
        <div className="banner">
          <img src={`${data.image}`} alt={title} />
        </div>

        <div className="info">
          <div className="title">{title}</div>
          <div className="price-container">
            <div className="price-label">{t("price")}</div>
            <div className="price">
              {configData.currency.symbol}
              {data.price}
            </div>
          </div>

          <div className="line-2">
            <div className="quantity-container">
              <div className="quantity-label">{t("quantity")}</div>
              <div className="quantity">{data.quantity}</div>
            </div>
            <div className="subtotal">
              <div className="total-label">{t("subtotal")}</div>
              <div className="total">
                {configData.currency.symbol}
                <span>{(data.quantity * data.price).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
PaymentItem.displayName = "PaymentItem";

export default PaymentItem;
