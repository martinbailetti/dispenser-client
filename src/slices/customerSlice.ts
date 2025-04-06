import { createSlice } from "@reduxjs/toolkit";
import { ItemInterface, SelectedItemInterface } from "@/types";
import { sendActionToMachine } from "@/bridge";

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    balance: 0,
    items: [] as SelectedItemInterface[],
    loading: "idle",
    inactivity_warning: false,
    error: null,
    ended: false,
    text: "",
  },
  reducers: {
    addItem: (state, action) => {
      console.log("addItem", action.payload);
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id && item.screen_position === action.payload.screen_position);
      if (existingItemIndex < 0) {
        console.log("do not exist");
        const newItems = [...state.items, action.payload];
        sendActionToMachine("setSelectedItems", newItems);
        return {
          ...state,
          items: newItems,
        };
      } else {
        console.log("exist");
        // Crea una copia del elemento existente y modifica la copia
        const existingItem = { ...state.items[existingItemIndex] };
        existingItem.quantity += 1;

        // Crea una copia del arreglo de elementos y reemplaza el elemento existente con la copia modificada
        const newItems = [...state.items];
        newItems[existingItemIndex] = existingItem;

        sendActionToMachine("setSelectedItems", newItems);
        return {
          ...state,
          items: newItems,
        };
      }
    },
    removeItem: (state, action) => {
      // Crea una copia del arreglo de elementos
      let newItems = [...state.items];
      // Encuentra el índice del elemento a eliminar
      const itemIndex = newItems.findIndex((item) => item.id === action.payload.id && item.screen_position === action.payload.screen_position);

      if (itemIndex >= 0) {
        // Si el elemento existe, crea una copia y disminuye la cantidad
        const item = { ...newItems[itemIndex] };
        item.quantity -= 1;

        // Si la cantidad es 0 o menos, elimina el elemento del arreglo
        if (item.quantity <= 0) {
          newItems.splice(itemIndex, 1);
        } else {
          // De lo contrario, reemplaza el elemento existente con la copia modificada
          newItems[itemIndex] = item;
        }

        sendActionToMachine("setSelectedItems", newItems);
        return {
          ...state,
          items: newItems,
        };
      } else {
        // Si el elemento no existe, simplemente devuelve el estado actual
        return state;
      }
    },
    clearItems: (state) => {

      sendActionToMachine("setSelectedItems", []);
      return {
        ...state,
        items: [],
      };
    },
    reset: (state) => {

      sendActionToMachine("setSelectedItems", []);
      return { ...state, items: [], balance: 0, ended: false };
    },
    setBalance: (state, action) => {
      return {
        ...state,
        balance: action.payload,
      };
    },
    setInactivityWarning: (state, action) => {
      return {
        ...state,
        inactivity_warning: action.payload,
      };
    },
    dispatchEnded: (state, action) => {
      return {
        ...state,
        ...action.payload,
        ended: true,
      };
    },
    dispatchItems: (state, action) => {
      let paymentItems = [...state.items];

      action.payload.cards.forEach((item: ItemInterface) => {
        const paymentIndex = paymentItems.findIndex((paymentItem) => paymentItem.id === item.id && paymentItem.screen_position === item.screen_position);

        console.log("-------------------------->>> dispatchItems", item, paymentIndex);
        if (paymentIndex >= 0) {
          const paymentItem = { ...paymentItems[paymentIndex] };
          paymentItem.quantity -= 1;

          if (paymentItem.quantity <= 0) {
            paymentItems.splice(paymentIndex, 1);
          } else {
            paymentItems[paymentIndex] = paymentItem;
          }
        } else {
          console.log("Item not found on selected items");
        }
      });

      sendActionToMachine("setSelectedItems", paymentItems);
      return {
        ...state,
        items: paymentItems,
        balance: action.payload.balance,
      };
    },
  },
});
export const {
  addItem,
  removeItem,
  setInactivityWarning,
  clearItems,
  setBalance,
  dispatchItems,
  reset,
  dispatchEnded,
} = customerSlice.actions;

export default customerSlice.reducer;
