import { StateCreator } from "zustand";

export interface GuestSlice {
  guestCount: number;
  // declaro la funcion
  setGuestCount: (guestCount: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
  guestCount: 0,
  // declaro la funcion
  setGuestCount: (guestCount: number) => {

    // le doy el valor que llegue a la estado de guest
    // si es mayor a cero que sea el valor si no que sea cero
    set({ guestCount: guestCount > 0 ? guestCount : 0 });
  },
});
