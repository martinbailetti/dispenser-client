import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { testStore } from "../../mocks/mockStore";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import PaymentSuccess from "@/pages/paymentsuccess";

import customerData from "../../mocks/redux_json/customerData.json";
import configInitializedData from "../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../mocks/redux_json/itemsData.json";
import { payment_success_deployment_time } from "@/config";

jest.mock("next/router", () => require("next-router-mock"));

jest.useFakeTimers();

mockRouter.setCurrentUrl("/paymentsuccess");

describe("PaymentSuccess component", () => {
  it("Should display balance", () => {
    const initialState = {
      customerData: { ...customerData, balance: 100 },
      configData: { ...configInitializedData, give_change_immediately: false },
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PaymentSuccess />
      </Provider>,
    );

    expect(getByTestId("payment-success-balance")).toBeInTheDocument();
    expect(getByTestId("payment-success-top-balance")).toBeInTheDocument();
  });
  it("Should not display balance", () => {
    const initialState = {
      customerData: { ...customerData, balance: 0 },
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <PaymentSuccess />
      </Provider>,
    );

    expect(queryByTestId("payment-success-balance")).not.toBeInTheDocument();
    expect(queryByTestId("payment-success-top-balance")).not.toBeInTheDocument();
  });

  it("Should display payment confirmation", () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, confirm_payment: true },
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PaymentSuccess />
      </Provider>,
    );

    expect(getByTestId("confirm-buttons")).toBeInTheDocument();
  });

  it("Should not display payment confirmation", () => {
    const initialState = {
      customerData: customerData,
      configData:configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <PaymentSuccess />
      </Provider>,
    );

    expect(queryByTestId("confirm-buttons")).not.toBeInTheDocument();
  });

  it("Should navigate to home after timeout ends", () => {
    const initialState = {
      customerData: customerData,
      configData:configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    render(
      <Provider store={store}>
        <PaymentSuccess />
      </Provider>,
    );

    jest.advanceTimersByTime(payment_success_deployment_time);

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
