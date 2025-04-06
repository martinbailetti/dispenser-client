import React from "react";
import {  render } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerData from "../../../mocks/redux_json/customerData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import ItemList from "@/components/index/ItemList";

mockRouter.setCurrentUrl("/");
describe("ItemList component", () => {
  it("should display items", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);


    const { container } = render(
      <Provider store={store}>
        <ItemList openDetailClick={() => { }}  />
      </Provider>,
    );

    const items = container.querySelectorAll(".item");
    expect(items.length).toBe(itemsData.items.length);
   
  });

});
