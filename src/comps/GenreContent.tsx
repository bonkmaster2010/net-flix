import Modal from './Modal';
import Footer from './footer';
import useRandom from '../Hooks/RandomStore';
import trailer from '../images/trailer.jpg';
import sad from '../icons/sad.gif';
import washing from '../icons/put-ur-dirty-shoes-in-my-washing-machine.gif';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toggleModal, closeModal } from '../functions/OtherFns';
import { popular } from '../functions/fetchingFN';

function GenreContent() {
  const [addToList, setAddToList] = useState<number | null>(null);
  const [MT, setMT] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [age, setAge] = useState<string>('');
  const [cast, setCast] = useState<string[]>([]);

  const { favs, popularData, page, loading, genreTitle, setPage, setPopularData, setFavs, removeFav, setLoading } = useRandom();
  const { genreParam } = useParams<{ genreParam: string }>();
  const genreId = genreParam ? Number(genreParam) : null;
  const data = genreId && Array.isArray(popularData) && popularData.length > 0 ? popularData.filter((movie: any) => movie.genre_ids.includes(genreId)).filter((movie, index, self) =>index === self.findIndex((m) => ( m.id === movie.id))) : [];
  
  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const results = await popular(page);
    setPopularData([...popularData, ...results]);
    setLoading(false);
  };

  fetchData();
}, [page]);

   return (
    <>
    <div className="fav-main-cont">
      <div className="fav-cont">
        <h1 className='GC-title'>{genreTitle}</h1>
        {data.length <= 0 && (
          <p id="noFavs">
            its empty in here <img src={sad} alt="sad emoji" />
          </p>
         )}
      {data.length <= 0 && loading && <p className='loading'>Fetching please be patient... <img src={washing} alt="put your dirty shoes in my washing machine gif"/></p>}
        <div className="fav-chunk">
         {data.length > 0 &&
            data.map((movie: any) => (
              <div className="favs" key={movie.id}>
                <div
                  className="movie-card"
                  onMouseEnter={() => setAddToList(movie.id)}
                  onMouseLeave={() => setAddToList(null)}
                >
                  <img
                    onClick={() => {
                    const data = toggleModal(popularData, movie.id, setMT, setGenres, setAge, setCast);
                    setPopularData(data); 
                    }}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  {addToList === movie.id && (
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
                  )}

                  {movie.modal && (
                    <Modal
                      type={MT ? 'iframe' : 'img'}
                      class={MT ? 'MT' : 'trailer-fallback'}
                      src={MT || trailer}
                      img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || 'N/A'}
                      title={movie.title || 'N/A'}
                      date={movie.release_date || 'N/A'}
                      genre={genres[0] || 'N/A'}
                      genres={genres.length ? genres.join(', ') : 'N/A'}
                      age={age || 'N/A'}
                      desc={movie.overview || 'N/A'}
                      cast={cast.length ? cast.join(', ') : 'N/A'}
                      movie={movie}
                      id={movie.id}
                      click={() => {
                        const data = closeModal(popularData, movie.id);
                        setPopularData(data);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    <button className='load-more' onClick={setPage}>Load more</button>
    </div>
    <Footer/>
     </>
  );
}

export default GenreContent;
