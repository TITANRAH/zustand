import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/session.storage";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

// SIMPLE FUNCTION CALCULAR

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set((state) => ({ firstName: value })),
  setLastName: (value: string) => set((state) => ({ lastName: value })),
});

export const userPersonStore = create<PersonState & Actions>()(
  devtools(
    // middelware qyue guarda eb local storage se llama persis
    persist(
      // puedo separar el state en una variable y mandarla a llamar aqui
      storeAPI,
      {
        name: "person-storage",
        //   trasladmos el archivo de session storage y lo llamamos aca
        storage: firebaseStorage,
      }
    )
  )
);
