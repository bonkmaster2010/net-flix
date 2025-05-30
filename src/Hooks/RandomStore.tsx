import { create } from "zustand"

interface store{
    show: boolean,
    loading: boolean,
    favs: any[],
    popularData: any[],
    page: number,
    genreTitle: string,
    
    
    setGenreTitle: (title: string) => void,
    setLoading: (lodaing: boolean) => void,
    setShow: (show: boolean) => void,
    setPopularData: (arr: any) => void,
    setFavs: (movieOrUpdater: any | ((prev: any[]) => any[])) => void,
    resetFavs: () => void,
    removeFav: (id: number) => void
    setPage: () => void;
}

const useRandom = create<store>((set, get) => {
    return {
        show: false,
        loading: false,
        favs: [],
        popularData: [],
        page: 3,
        genreTitle: '',

        setGenreTitle: (title: string) => {set({genreTitle: title})},
        setShow: (show: boolean) => set({ show }),
        setLoading: (loading: boolean) => set({ loading }),
        setPopularData: (data) => {set({popularData: data})},
        setFavs: (movieOrUpdater: any | ((prev: any[]) => any[])) => {
        const { favs } = get();
        if (typeof movieOrUpdater === 'function') {
         set({ favs: movieOrUpdater(favs) });
        }else if(!favs.find((movie: any) => movie.id === movieOrUpdater.id)){
        set({ favs: [...favs, movieOrUpdater]});
        }
},
      resetFavs: () => set({favs: []}),
      removeFav: (id: number) => {
      set((state) => ({
      favs: state.favs.filter((movie) => movie.id !== id)
      }));
},
    setPage: () => {
        const { page } = get();
        set({page: page + 1})
    },

    
}})


export default useRandom;
