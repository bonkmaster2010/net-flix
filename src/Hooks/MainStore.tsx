import { create } from "zustand";

interface MainStoreIF {
  addToList: number | null;
  MT: string | null;
  genres: string[];
  age: string;
  cast: string[];
  design: string;
  
  setDesign: (type: string) => void;
  setAddToList: (value: number | null) => void;
  setMT: (value: string | null) => void;
  setGenres: (value: string[]) => void;
  setAge: (value: string) => void;
  setCast: (value: string[]) => void;
}

const useMainStore = create<MainStoreIF>((set) => ({
  addToList: null,
  MT: null,
  genres: [],
  age: '',
  cast: [],
  design: "",
  
  setDesign: (type: string) => set({design: type}),
  setAddToList: (value) => set({ addToList: value }),
  setMT: (value) => set({ MT: value }),
  setGenres: (value) => set({ genres: value }),
  setAge: (value) => set({ age: value }),
  setCast: (value) => set({ cast: value }),
}));

export default useMainStore;