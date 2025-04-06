import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ItemInterface } from "@/types";
import { sendActionToMachine } from "@/bridge";

export const getItems = createAsyncThunk("items/getItems", async () => {
  try {
    const itemsData = await sendActionToMachine("getItems");

    return itemsData;
  } catch (error) {
    console.log(error);
  }
});

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [] as ItemInterface[],
    loading: "idle",
    error: null as string | null,
  },
  reducers: {
    setItems: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = null;
      }
    });

    builder.addCase(getItems.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.items = action.payload;
        state.loading = "idle";
        state.error = null;
      }
    });

    builder.addCase(getItems.rejected, (state) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
