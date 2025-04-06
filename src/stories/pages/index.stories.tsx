import type { Meta, StoryObj } from '@storybook/react';

import mockItems from "../../../mocks/mockItems.json";
import Index from '../../pages/index';


const meta = {
  component: Index,
  parameters: {
    initialState: {
      configData: {
        initialized: true,
        confirm_payment: false,
        give_change_immediately: true,
        default_inactivity_time: 5 * 60,
        video_loops: 5,
        currency: { symbol: "$", code: "USD" },
        has_claim_video: false,
        available_languages: ["es", "en"],
        default_language: "en",
        machine_id: "M123",
        machine_name: "Machine A",
        kiosk_token: "token123",
        audio_on_attract: false,
        show_internet_connection: false,
        video_intro: "intro.mp4",
        video_winner: "winner.mp4",
        video_looser: "looser.mp4",
        audio_song: "song.mp3",
        show_disclaimer: true,
      },
      itemsData:{
        items:mockItems,
        loading:"idle"
      },
      appData:{
        pending: false,
        error: null,
        message: null,
        pending_payment: 0,
        connected: true,
      }
    },
  },
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
