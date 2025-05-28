import { ageAndGenre, trailer, fetchCast } from './fetchingFN';
  
const toggleModal = (
    arr: any[], 
    id: number, 
    setMT: (res: any) => void,
    setGenres: (genres: any) => void,
    setAge: (age: any) => void,
    setCast: (cast: any) => void,
    ): any[] => {
    const newData = arr.map(movie => movie.id === id ? {...movie, modal: true} : {...movie, modal: false})
    trailer(id).then((res: any) => setMT(res));
    ageAndGenre(id).then((data) => {
    setGenres(data.genres);
    setAge(data.ageRating);
    });
fetchCast(id)
  .then((cast) => {setCast(cast.map((c: any) => c.name).slice(0, 6));});

    return newData
  };

  const closeModal = (arr: any, id: number) => {return arr.map((movie: any) => (movie.id === id ? { ...movie, modal: false } : movie));};
  const closeChunkedModal = (arr: any, id: number) => {return arr.map((chunk: any) => Array.isArray(chunk) ? chunk.map((movie: any) => (movie.id === id ? { ...movie, modal: false } : movie)) : chunk);};

  interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  genres: any[];
  modal?: boolean;
}


  function togglePreviewModal(
    preview: Movie | null,
    id: number,
    setMT: (res: any) => void,
    setGenres: (genres: any) => void,
    setAge: (age: any) => void,
    setCast: (cast: any) => void,
  ){
    if(preview && preview.id === id){
        const newData = {...preview, modal: true};
    trailer(id).then((res: any) => setMT(res));
    ageAndGenre(id).then((data) => {
    setGenres(data.genres);
    setAge(data.ageRating);
    });
    fetchCast(id)
       .then((cast) => {setCast(cast.map((c: any) => c.name).slice(0, 6));});
        return newData                    
    }else {return preview}
  }

  function closePreviewModal(preview: Movie | null, id: number) {
    if (preview && preview.id === id) {
      return { ...preview, modal: false };
    }
    return preview;
  }

  function getGenreId(link: any){
    if (!link || typeof link !== "string") return 0;
    const newLink = link.split("").filter((c: string) => /[0-9]/.test(c)).join("")
    return Number(newLink)
  }

  export { toggleModal, closeChunkedModal, closeModal, togglePreviewModal, closePreviewModal, getGenreId };