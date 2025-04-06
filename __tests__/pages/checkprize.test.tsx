
import React from "react";
import {  render } from "@testing-library/react";
import { Provider } from "react-redux";
import { testStore } from "../../mocks/mockStore";
import CheckPrize from "@/pages/checkprize";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";


import configInitializedData from "../../mocks/redux_json/configInitializedData.json";
import customerDataNoSelected from "../../mocks/redux_json/customerDataNoSelected.json";
import itemsData from "../../mocks/redux_json/itemsData.json";
import prizeMoneyWonData from "../../mocks/redux_json/prizeMoneyWonData.json";



mockRouter.setCurrentUrl("/checkprize");
describe("CheckPrize Component", () => {

  it("should display winner component", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: prizeMoneyWonData,
    };

    const store = testStore(initialState);

    const { container, getByTestId } = render(
      <Provider store={store}>
        <CheckPrize />
      </Provider>,
    );
    const element = getByTestId("prize-show");

    expect(element).toBeInTheDocument();
  });

  it("should display looser component", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: {status: "PROCESSING"},
    };

    const store = testStore(initialState);

    const { container, getByTestId } = render(
      <Provider store={store}>
        <CheckPrize />
      </Provider>,
    );
    const looser = getByTestId("walk-animation");

    expect(looser).toBeInTheDocument();
  });


  it("should display dispensing component", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: {status: "DISPENSING"},
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <CheckPrize />
      </Provider>,
    );
  
    expect(getByTestId("dispense")).toBeInTheDocument();
  });
  it("should display dispensing component", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: {status: "ENDED"},
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <CheckPrize />
      </Provider>,
    );
  
    expect(getByTestId("dispense-end")).toBeInTheDocument();
  });

});
