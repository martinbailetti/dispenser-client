import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    initialized: false,
    confirm_payment: false,
    give_change_immediately: false,
    default_inactivity_time: 5 * 60,
    video_loops: 3,
    currency: { symbol: "", code: "" },
    has_claim_video: false,
    available_languages: ["es", "en", "ca", "zh"],
    default_language: "es",
    machine_id: "",
    machine_name: "",
    kiosk_token: "",
    audio_on_attract: true,
    show_internet_connection: true,
    video_intro: "",
    video_winner: "",
    video_looser: "",
    audio_song: "",
    app_version: "",
    show_disclaimer: false,
    show_disclaimer_timeout: 10,
    accepted_disclaimer_timeout: 10,
  },
  reducers: {
    setConfig: (state, action) => {
      return { ...action.payload, initialized: true };
    },
  },
});
export const { setConfig } = configSlice.actions;

export default configSlice.reducer;
