import PaymentItem from "@/components/payment/PaymentItem";
import { SelectedItemInterface } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { memo, useCallback } from "react";

const PaymentItemList = memo(() => {
  const customerData = useAppSelector((state) => state.customerData);

  const showItems = useCallback(() => {
    if (customerData.items) {
      return customerData.items.map((item: SelectedItemInterface, index: number) => {
        return <PaymentItem key={index} data={item} />;
      });
    }
  }, [customerData.items]);
  return (
    <div className="payments-list" data-testid="payments-list">
      {showItems()}
    </div>
  );
});
PaymentItemList.displayName = "PaymentItemList";
export default PaymentItemList;
