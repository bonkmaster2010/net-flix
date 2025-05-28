import Modal from "./Modal";
import useRandom from "../Hooks/RandomStore";
import trailer from '../images/trailer.jpg';
import { toggleModal, closeModal } from "../functions/OtherFns"
import '../styles/Query.css'

   function Query({
    movieChunks,
    setDatas,
    addToList,
    setAddToList,
     MT,
    age,
    genres,
    cast,
    setMT,
    setGenres,
    setAge,
    setCast,
     }: any){
       const { favs, loading, setFavs, removeFav } = useRandom();

       return(
    <>  
              <div className="query-main-cont">
              {loading && movieChunks.length <= 0 && <p className="loading">Fetching please be patient...</p>}
                {loading === false && movieChunks.length > 0 && movieChunks.map((chunk: any, i: number) => (
                    <div className='query-cont' key={i}>
                        <div className="query-chunk">
                            {chunk.map((movie: any) => (
                                <div key={movie.id} 
                                className="movie-card"
                                onMouseEnter={() => setAddToList(movie.id)}
                                onMouseLeave={() => setAddToList(null)} 
                                >
                                    <img
                                        onClick={() => setDatas((prev: any) => toggleModal(prev, movie.id, setMT, setGenres, setAge, setCast))}
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                   {addToList === movie.id && 
                                   <div className="extra-options">
                                     <h4>{movie.title}</h4>
                                    {!favs.some(m => m.id === movie.id) ? <button className='add-to-list'  onClick={() => setFavs(movie)}>
                                        My List 
                                        <span className='plus'>+</span>
                                        </button> : <button className="add-to-list"  onClick={() => removeFav(movie.id)}>
                                        My List 
                                        <span className="plus">-</span>
                                        </button>
                                        }  
                                    </div>
                                     }
                                    {movie.modal && (
                                        <Modal
                                            type={MT ? 'iframe' : 'img'}
                                            class={MT ? "MT" : "trailer-fallback"}
                                            src={MT ? MT : trailer}
                                            img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title ? movie.title : 'N/A'}
                                            title={movie.title ? movie.title : 'N/A'}
                                            date={movie.release_date ? movie.release_date : 'N/A'}
                                            genre={genres[0] ? genres[0] : 'N/A'}
                                            genres={genres.join(", ")  ? genres.join(", ") : 'N/A'}
                                            age={age ? age : 'N/A'}
                                            desc={movie.overview ? movie.overview : 'N/A'}
                                            cast={cast.join(", ") ? cast.join(", ") : 'N/A'}
                                            click={() => setDatas((prev: any) => closeModal(prev, movie.id))}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
              </div>        
        </>
    )
}


export default Query;