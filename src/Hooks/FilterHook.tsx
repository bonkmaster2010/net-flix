import { create } from "zustand";

interface Filter{
    date: string,
    genre: number | null,
     
    setGenre: (NG: any) => void,
    setFilterDate: (newDate: any) => void,
}

const useFilter = create<Filter>((set) => {
   return{ 
    date: "",
    genre: null,

    setGenre: (NG: any) => set({genre: NG}),
    setFilterDate: (newDate: any) => {set({date: newDate})}
}})

export default useFilter;