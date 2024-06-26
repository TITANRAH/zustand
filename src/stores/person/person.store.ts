import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";
import { useWiddingBoundStore } from "../wedding";
// import { customSessionStorage } from "../storages/session.storage";
// import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

// SIMPLE FUNCTION CALCULAR

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}
// [["zustand/devtools", never]] esto es el tipado para evitar que poner los nombres a los estados
// de problemas
const storeAPI: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",

  // pongo false para para evitar que reemplace el estado anterior pero mas para poder poner nombre
  // al estado y asi verlo en las devtools
  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLasttName"),
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

// con esto me suscribo a cambios en este store

// por ejem si en este formulario de Person pongo un nuevo nombre y apellido

// ese nombre y apellido se va al formulario de Boda

// llamando al store que necesito cambiar el estado tomando el estado y llamando a la funcuon

// que setea al nombre y apellido en el store externo
userPersonStore.subscribe((nextState, prevState) => {
  console.log({ nextState, prevState });

  const { firstName, lastName } = nextState;

  useWiddingBoundStore.getState().setFirstName(firstName);
  useWiddingBoundStore.getState().setLastName(lastName);
});
