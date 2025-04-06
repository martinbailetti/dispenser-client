import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import mockRouter from "next-router-mock";


import configInitializedData from "../../../mocks/redux_json/configInitializedData.json"
import customerData from "../../../mocks/redux_json/customerData.json"
import itemsData from "../../../mocks/redux_json/itemsData.json"
import appData from "../../../mocks/redux_json/appData.json"
import LanguageSelector from "@/components/common/LanguageSelector";


mockRouter.setCurrentUrl("/");

describe("LanguageSelector component", () => {


  it("should open language list selector on click", () => {
    mockRouter.setCurrentUrl("/howto");
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: appData,
    };

    const store = testStore(initialState);

    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <LanguageSelector />
      </Provider>,
    );

    const button = getByTestId("language-selector-icon");
    let list = queryByTestId("language-list");
    expect(list).not.toBeInTheDocument();

    fireEvent.click(button);

    list = getByTestId("language-list");

    expect(list).toBeInTheDocument();

  });


});
