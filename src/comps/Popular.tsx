import Pop from "./popularGenre";
import Modal from "./Modal";
import useRandom from "../Hooks/RandomStore";
import trailer from '../images/trailer.jpg';
import { toggleModal, closeModal } from "../functions/OtherFns";
import '../styles/Query.css' 

function Popular({
  popularData,
  setPopularData,
  addToList,
  setAddToList,
  setFavs,
  MT,
  age,
  genres,
  cast,
  setMT,
  setGenres,
  setAge,
  setCast,
}: any){
    const { removeFav, favs, loading } = useRandom();
    return (
        <>
            {Array.isArray(popularData) && loading && <p className='loading'>Fetching please be patient...</p>}
            <h1 className="genre-name">Popular on Netflix</h1>
            <div className="movie-cont">
              {popularData.length > 0 && popularData.map((movie: any) => (
                <div key={movie.id} className="movie-card"
                    onMouseEnter={() => setAddToList(movie.id)}
                    onMouseLeave={() => setAddToList(null)} >
                  <div className='img-wrapper'>
                  <img
                    onClick={() => {
                      const Data = toggleModal(popularData, movie.id, setMT, setGenres, setAge, setCast);
                      setPopularData(Data);
                    }}
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

                  </div>
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
                      genres={genres.join(", ") ? genres.join(", ") : 'N/A'}
                      age={age ? age : 'N/A'}
                      desc={movie.overview ? movie.overview : 'N/A'}
                      cast={cast.join(", ") ? cast.join(", ") : 'N/A'}
                      click={() => {
                        const Data = closeModal(popularData, movie.id);
                        setPopularData(Data);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Genre Sections */}
            <Pop genre="Action" data={popularData} id={28} addToList={addToList} setAddToList={setAddToList} />
            <Pop genre="Comedy" data={popularData} id={35} addToList={addToList} setAddToList={setAddToList} />
            <Pop genre="Mystery" data={popularData} id={9648} addToList={addToList} setAddToList={setAddToList} />
            <Pop genre="Thriller" data={popularData} id={53} addToList={addToList} setAddToList={setAddToList} />
            <Pop genre="Science Fiction" data={popularData} id={878} addToList={addToList} setAddToList={setAddToList} />
            <Pop genre="Adventure" data={popularData} id={12} addToList={addToList} setAddToList={setAddToList} />
          </>
    )
}

export default Popular