import { StateStorage, createJSONStorage } from "zustand/middleware";

//   control punto y me trae todas las propiedades que faltan
const storageAPI: StateStorage = {
    // name es el nombre del session storage en este caso person-storage
  
    getItem: function (name: string): string | Promise<string | null> | null {
      // console.log('name', name);
      // obtengo la data del session storage
      // la data completa
      const data = sessionStorage.getItem(name);
  
      return data;
    },
    setItem: function (name: string, value: string): void {
      console.log("set item", name, value);
      // envio la data al session storage
      sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): void | Promise<void> {
      console.log("remove item", name);
    },
  };


  export const customSessionStorage = createJSONStorage(()=> storageAPI)
  