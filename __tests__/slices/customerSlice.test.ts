import {
  customerSlice,
  addItem,
  removeItem,
  setInactivityWarning,
  clearItems,
  setBalance,
  reset,
} from "@/slices/customerSlice";
import { SelectedItemInterface } from "@/types";

describe("customerSlice", () => {
  const initialState = {
    balance: 0,
    items: [] as SelectedItemInterface[],
    loading: "idle",
    inactivity_warning: false,
    error: null,
    ended: false,
    text: "",
  };

  it("should handle addItem", () => {
    const item: SelectedItemInterface = {
      id: "1",
      quantity: 1,
      title: "",
      price: 0,
      image: "",
      dispenser: 1,
    };
    const nextState = customerSlice.reducer(initialState, addItem(item));
    expect(nextState.items).toContainEqual(item);
  });

  it("should handle removeItem", () => {
    const item: SelectedItemInterface = {
      id: "1",
      quantity: 1,
      title: "",
      price: 0,
      image: "",
      dispenser: 1,
    };
    const state = { ...initialState, items: [item] };
    const nextState = customerSlice.reducer(state, removeItem(item));
    expect(nextState.items).toEqual([]);
  });

  it("should handle clearItems", () => {
    const state = {
      ...initialState,
      items: [{ id: "1", quantity: 1, title: "", price: 0, image: "", index: 1 }],
    };
    const nextState = customerSlice.reducer(state, clearItems());
    expect(nextState.items).toEqual([]);
  });

  it("should handle setBalance", () => {
    const nextState = customerSlice.reducer(initialState, setBalance(100));
    expect(nextState.balance).toEqual(100);
  });

  it("should handle setInactivityWarning", () => {
    const nextState = customerSlice.reducer(initialState, setInactivityWarning(true));
    expect(nextState.inactivity_warning).toEqual(true);
  });

  it("should handle reset", () => {
    const state = { ...initialState, items: [] as SelectedItemInterface[], balance: 100 };
    const nextState = customerSlice.reducer(state, reset());
    expect(nextState.items).toEqual([]);
    expect(nextState.balance).toEqual(0);
  });
});
