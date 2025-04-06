import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerData from "../../../mocks/redux_json/customerData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import devicesInWarning from "../../../mocks/redux_json/devicesInWarning.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import WarningList from "@/components/warnings/WarningList";

mockRouter.setCurrentUrl("/");
describe("WarningList component", () => {
  it("should display items", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      devicesInWarning: devicesInWarning,
    };

    const store = testStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <WarningList />
      </Provider>,
    );

    const items = container.querySelectorAll(".warning-item");
    expect(items.length).toBe(devicesInWarning.length);
  });
});
