import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerDataNoSelected from "../../../mocks/redux_json/customerDataNoSelected.json";
import prizeMoneyWonData from "../../../mocks/redux_json/prizeMoneyWonData.json";
import prizeCardWonData from "../../../mocks/redux_json/prizeCardWonData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import PrizeShowWinner from "@/components/checkprize/PrizeShowWinner";

mockRouter.setCurrentUrl("/checkprize");
describe("PrizeShowWinner component", () => {
  it("should display buttons when collect is enabled", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: prizeMoneyWonData,
    };

    const store = testStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <PrizeShowWinner />
      </Provider>,
    );
    const buttonCollect = container.querySelector(".winner .button.collect");
    const buttonBuyMore = container.querySelector(".winner .button.more");

    expect(buttonCollect).toBeTruthy();
    expect(buttonBuyMore).toBeTruthy();
  });

  it("should not display buttons when collect is disabled", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData, enable_collect: false },
    };

    const store = testStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <PrizeShowWinner />
      </Provider>,
    );

    const buttonCollectDisabled = container.querySelector(".winner .button.collect");
    const buttonBuyMoreDisabled = container.querySelector(".winner .button.more");

    expect(buttonCollectDisabled).toBeFalsy();
    expect(buttonBuyMoreDisabled).toBeFalsy();
  });

  it("should call bridge_actionFromWeb on button collect click", async () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData },
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShowWinner />
      </Provider>,
    );

    const button = getByTestId("prize-collect");

    await act(async () => {

      fireEvent.click(button);

    });



    await waitFor(() => {

      expect((window).bridge_actionFromWeb).toHaveBeenCalledWith("{\"action\":\"collect\",\"data\":null}");
    });

  });
  it("should call bridge_actionFromWeb on button shop more click", async () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData },
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShowWinner />
      </Provider>,
    );

    const button = getByTestId("prize-more");
    await act(async () => {

      fireEvent.click(button);

    });


    await waitFor(() => {

      expect((window).bridge_actionFromWeb).toHaveBeenCalledWith("{\"action\":\"prizeToBalance\",\"data\":null}");
    });
  });
  it("should display a message when there's no available money", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData, available_money: false },
    };

    const store = testStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <PrizeShowWinner />
      </Provider>,
    );
    const message = container.querySelector(".no-money");

    expect(message).toBeTruthy();
  });
  it("should display an animated message when collect is disabled", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData, enable_collect: false },
    };

    const store = testStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <PrizeShowWinner />
      </Provider>,
    );
    const message = container.querySelector(".floating-hand-deposit-container");

    expect(message).toBeTruthy();
  });
  it("should display the money prize amount", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: prizeMoneyWonData,
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShowWinner />
      </Provider>,
    );
    const prize = getByTestId("prize-money");

    expect(prize).toBeInTheDocument();
  });
  it("should display the card prize", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: { ...prizeCardWonData, enable_collect: false },
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShowWinner />
      </Provider>,
    );
    const prize = getByTestId("prize-card");

    expect(prize).toBeInTheDocument();
  });
});
