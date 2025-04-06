
export type GenericRecord = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type GenericRecordValueType = GenericRecord | null | string | number | GenericRecord[] | number[] | string[];

export interface DeviceInWarningInterface {
  msg: string;
  devId: string;
  type: string;
  hidId: string;
  image: string;
}

export interface DispatchItemInterface {
  id: string;
  screen_position: number;
}
export interface ItemInterface {
  id: string;
  title: string;
  price: number;
  image: string;
  thumbnail: string;
  max_quantity: number;
  current_quantity: number;
  description: string;
  status: string;
  dispenser: number;
  screen_position: number;
}

export interface SelectedItemInterface {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  dispenser: number;
  screen_position: number;
}

export interface ErrorTypeInterface {
  timeout: number;
  dismissible: boolean;
  message: string;
}
export interface MessageTypeInterface {
  timeout: number;
  dismissible: boolean;
  message: string;
  submessage: string;
  position: string;
  hide_background: boolean;
  type: "info" | "warning" | "error";
}

// Definir el tipo para el estado inicial
export interface AppStateInterface {
  pending: boolean;
  pending_video: boolean;
  error: ErrorTypeInterface | null;
  message: MessageTypeInterface | null;
  pending_payment: number;
  connected: boolean;
  wait_disclaimer: boolean;
  show_disclaimer: boolean;
  show_disclaimer_content: boolean;
}
