import { create } from "zustand";

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  doNothing: () => void;
  addBear: () => void;
  clearBear: () => void;

  // esto simula un computed property de vue 
  // necesito sumar todos los osos
  computed?: {
    totalBears: number;
  }

  bears: Bear[];
}

interface Bear {
  id: number;
  name: string;
}

export const useBearStore = create<BearState>((set, get) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [{ id: 1, name: "Oso #1" }],
  computed: {

    // puedo usar un get de javascript 
// creo la pripiedad pero creo un gettter de javascript con get y luego uso el get ed zustand 
// para obtener la cantidad de osos 
// la idea es hacer propiedades comptuadas 

   get totalBears(): number {
    return get().blackBears +get().polarBears +get().pandaBears
   }
  },

  increaseBlackBears: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) =>
    set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),
  addBear: () => set(state => ({ bears: [...state.bears,{id: state.bears.length + 1, name: `Oso #${state.bears.length + 1 }`}] })),
  clearBear: () => set((state) => ({ bears: [] })),
}));
