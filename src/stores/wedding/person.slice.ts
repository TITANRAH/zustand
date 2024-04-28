import { StateCreator } from "zustand";

export interface PersonSlice {
    firstName: string;
    lastName: string;

    setFirstName: (firstName: string) => void
    setLastName: (lastName: string) => void
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
    firstName: '',
    lastName: '',
    // recibe como argumento un string y lo setea a la propiedad
    setFirstName: (firstName: string) => set({firstName}),
    setLastName: (lastName: string) => set({lastName}),
}) 


