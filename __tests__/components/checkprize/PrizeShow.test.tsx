import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerDataNoSelected from "../../../mocks/redux_json/customerDataNoSelected.json";
import prizeMoneyWonData from "../../../mocks/redux_json/prizeMoneyWonData.json";
import prizeLooseData from "../../../mocks/redux_json/prizeLooseData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import PrizeShow from "@/components/checkprize/PrizeShow";

mockRouter.setCurrentUrl("/");
describe("PrizeShow component", () => {
  it("should display winner component", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: prizeMoneyWonData,
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShow />
      </Provider>,
    );

    expect(getByTestId(`winner`)).toBeInTheDocument();

  });
  it("should display winner component", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData, already_claimed: true },
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShow />
      </Provider>,
    );

    expect(getByTestId(`claimed`)).toBeInTheDocument();

  });
  it("should display looser component", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: prizeLooseData,
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShow />
      </Provider>,
    );

    expect(getByTestId(`looser`)).toBeInTheDocument();

  });

});
