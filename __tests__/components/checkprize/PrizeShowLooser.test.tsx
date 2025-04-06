import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import prizeMoneyWonData from "../../../mocks/redux_json/prizeMoneyWonData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import PrizeShowLooser from "@/components/checkprize/PrizeShowLooser";
import customerData from "../../../mocks/redux_json/customerData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";

mockRouter.setCurrentUrl("/checkprize");
describe("PrizeShowLooser component", () => {
  it('should redirect on click', () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData, already_claimed: true },
    };

    const store = testStore(initialState);


    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShowLooser />
      </Provider>,
    );
    const dispenseEndElement = getByTestId('close');

    act(() => {
      fireEvent.click(dispenseEndElement);
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
