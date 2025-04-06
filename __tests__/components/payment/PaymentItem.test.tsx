import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Item from "@/components/index/Item";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerData from "../../../mocks/redux_json/customerData.json";
import customerDataNoSelected from "../../../mocks/redux_json/customerDataNoSelected.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import PaymentItem from "@/components/payment/PaymentItem";

mockRouter.setCurrentUrl("/");
describe("PaymentItem component", () => {
  it("should display payment item", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { getByText } = render(
      <Provider store={store}>
        <PaymentItem data={data} />
      </Provider>,
    );

    expect(getByText((data.quantity * data.price).toFixed(2))).toBeInTheDocument();
    expect(getByText(configInitializedData.currency.symbol + data.price)).toBeInTheDocument();
  });

});
