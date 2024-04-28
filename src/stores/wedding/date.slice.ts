import { StateCreator } from "zustand";

export interface DateSlice {
  eventDate: Date;
  eventYYYYMMDD: () => string;
  eventHHMM: () => string;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),
  // devuelve la fecha pero en iso stringfechas dividias por T trae laprimera posicion que seria 23-11-91
  // el get en zustand me devuelve cosas
  eventYYYYMMDD: () => {
    return get().eventDate.toISOString().split("T")[0];
  },
  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, "0"); //si tenemos 1:23 sera 01:23
    const minutes = get().eventDate.getMinutes().toString().padStart(2, "0"); //si tenemos 1:23 sera 01:23

    return `${hours}:${minutes}`;
  },
});
