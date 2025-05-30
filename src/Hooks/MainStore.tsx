import { create } from "zustand";

interface MainStoreIF {
  originalDatas: any;
  datas: any;
  addToList: number | null;
  MT: string | null;
  genres: string[];
  age: string;
  cast: string[];
  design: string;
  
  setDesign: (type: string) => void;
  setAddToList: (value: number | null) => void;
  setDatas: (newData: any) => void;
  setMT: (value: string | null) => void;
  setGenres: (value: string[]) => void;
  setAge: (value: string) => void;
  setCast: (value: string[]) => void;
  setOriginalDatas: (original: any) => void;
}

const useMainStore = create<MainStoreIF>((set) => ({
  datas: [],
  originalDatas: [],
  addToList: null,
  MT: null,
  genres: [],
  age: '',
  cast: [],
  design: "",
  
  setDesign: (type: string) => set({design: type}),
  setAddToList: (value) => set({ addToList: value }),
  setDatas: (newData: any) => {
      set({datas: newData})
  },
  setMT: (value) => set({ MT: value }),
  setGenres: (value) => set({ genres: value }),
  setAge: (value) => set({ age: value }),
  setCast: (value) => set({ cast: value }),
  setOriginalDatas: (original: any) => set({ originalDatas: original }),
}));

export default useMainStore;