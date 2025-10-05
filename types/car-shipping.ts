// types/car-shipping.ts
export interface CarFormData {
  numberOfCars: string;
  carType: string;
  customCarType?: string;
  pickupState: string;
  dropOffCity: string;
  mode: string;
  timeline: string;
  whatsapp: string;
  email: string;
  name?: string;
  selectedDate?: Date;
  selectedTime?: string;
  selectedTimeLocal?: string;
}

export type FormStep = "initial" | "completion" | "booking";
