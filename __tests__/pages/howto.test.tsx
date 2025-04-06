import React from "react";
import { render, waitFor } from "@testing-library/react";
import HowTo from "@/pages/howto";
import es from "../../public/locales/es.json";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../mocks/mockStore";
import customerData from "../../mocks/redux_json/customerData.json";

import configInitializedData from "../../mocks/redux_json/configInitializedData.json";


import itemsData from "../../mocks/redux_json/itemsData.json";
import { DataProvider } from "@/context/DataContext";

mockRouter.setCurrentUrl("/howto");
describe("HowTo Page Component", () => {
  it("should show info text", async () => {


    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(es),
    });


    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData
    };

    const store = testStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <DataProvider>
          <HowTo />
        </DataProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText(`${es["how_to_line_1"]} ${es["how_to_line_2"]}`)).toBeInTheDocument();
    });
  });
});
