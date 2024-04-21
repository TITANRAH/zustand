import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl =
  "https://eighth-cacao-325701-default-rtdb.firebaseio.com/zustand";

//   control punto y me trae todas las propiedades que faltan
const storageAPI: StateStorage = {
  // name es el nombre del session storage en este caso person-storage

  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      console.log("data firebas >", data);

      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    console.log("data firebase PUT", data);

    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log("remove item", name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageAPI);
