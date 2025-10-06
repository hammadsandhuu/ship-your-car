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
  name: string;
  selectedDate?: Date;
  selectedTime?: string;
  selectedTimeLocal?: string;
  userTimeZone?: string;
  intent?: "wait-24-hours" | "book-now";
  meetingDate?: string;
  meetLink?: string;
  calendarLink?: string;
}

export type FormStep = "initial" | "booking" | "completion";
