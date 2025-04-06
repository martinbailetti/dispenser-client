
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer, { getItems, setItems } from "@/slices/itemsSlice";
import mockItems from "../../mocks/mockItems.json";

describe("itemsSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        items: itemsReducer,
      },
    });
  });

  it("should set items correctly", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    store.dispatch(setItems(items));

    const state = store.getState().items;
    expect(state.items).toEqual(items);
  });

  it("should fetch items correctly", async () => {
    const items = mockItems;


    await store.dispatch(getItems());

    const state = store.getState().items;
    expect(state.items).toEqual(items);
  });
});
