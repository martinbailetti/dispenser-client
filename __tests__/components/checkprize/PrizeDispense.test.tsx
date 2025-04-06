import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerDataNoSelected from "../../../mocks/redux_json/customerDataNoSelected.json";
import prizeMoneyWonData from "../../../mocks/redux_json/prizeMoneyWonData.json";
import prizeCardWonData from "../../../mocks/redux_json/prizeCardWonData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import PrizeDispense from "@/components/checkprize/PrizeDispense";
import es from "../../../public/locales/es.json";
import { DataProvider } from "@/context/DataContext";

mockRouter.setCurrentUrl("/");
describe("PrizeDispense component", () => {
  it("should display dispensing money prize message", async () => {

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(es),
    });

    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: prizeMoneyWonData,
    };

    const store = testStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <DataProvider>
          <PrizeDispense />
        </DataProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText(`${es["dispensing_prize"]}`)).toBeInTheDocument();
    });
  });
  it("should display dispensing card prize message", async () => {


    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(es),
    });

    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
      prizeData: prizeCardWonData,
    };

    const store = testStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <DataProvider>
          <PrizeDispense />
        </DataProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText(`${es["dispensing_prize"]}`)).toBeInTheDocument();
    });
  });

});
