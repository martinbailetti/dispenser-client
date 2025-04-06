import { AppStateInterface, MessageTypeInterface } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// Estado inicial con el tipo aplicado
const initialState: AppStateInterface = {
  pending: true,
  pending_video: true,
  error: null,
  message: null,
  pending_payment: 0,
  connected: true,
  wait_disclaimer: false,
  show_disclaimer: false,
  show_disclaimer_content: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setPendingPayment: (state, action) => {
      return { ...state, pending_payment: action.payload };
    },
    setPending: (state, action) => {
      return { ...state, pending: action.payload, pending_video: true };
    },
    setPendingVideo: (state, action) => {
      return { ...state, pending_video: action.payload };
    },
    setConnected: (state, action) => {
      return { ...state, connected: action.payload };
    },
    setShowDisclaimer: (state, action) => {

      console.log("setShowDisclaimer", action.payload);
      return { ...state, show_disclaimer: action.payload, show_disclaimer_content: false, wait_disclaimer: false };
    },
    setShowDisclaimerContent: (state, action) => {
      console.log("setShowDisclaimerContent", action.payload);
      return { ...state, show_disclaimer_content: action.payload };
    },
    setWaitDisclaimer: (state, action) => {

      console.log("setWaitDisclaimer", action.payload);
      return { ...state, wait_disclaimer: action.payload };
    },
    showMessage: (state, action) => {
      const message: MessageTypeInterface = {
        timeout: action.payload.timeout,
        dismissible: action.payload.closeButton,
        message: action.payload.message,
        submessage: action.payload.submessage,
        position: action.payload.position,
        hide_background: action.payload.hide_background,
        type: action.payload.type,
      };
      return { ...state, message: message };
    },
    hideMessage: (state) => {
      console.log("hideMessage");
      return { ...state, message: null };
    },
  },
});
export const { setShowDisclaimer, setWaitDisclaimer, setShowDisclaimerContent, setPending, setPendingVideo, showMessage, hideMessage, setPendingPayment, setConnected } = appSlice.actions;

export default appSlice.reducer;
