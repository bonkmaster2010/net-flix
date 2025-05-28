import Modal from './Modal';
import useRandom from '../Hooks/RandomStore';
import trailer from '../images/trailer.jpg'
import sad from '../icons/sad.gif'
import { toggleModal, closeModal } from '../functions/OtherFns';
import { useState, useEffect } from 'react';
import '../styles/favs.css'


function Favs() {
  const { favs, setFavs, removeFav } = useRandom();
  const [remove, setRemove] = useState<null | number>(null);
  const [MT, setMT] = useState<string | null>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [age, setAge] = useState<string>('');
  const [cast, setCast] = useState<string[]>([]);

  useEffect(() => console.log(favs), [])

  return (
    <>
    <div className='fav-main-cont'>
      <div className='fav-cont'>
      <h1>My List</h1>
    {favs.length <= 0 && <p id='noFavs'>its empty in here <img src={sad} alt='sad emoji'/> </p>}
    <div className="fav-chunk">
      
      {favs.length > 0 && favs.map((movie: any, i: number) => (  
        <div className='favs' key={i}>
              <div key={movie.id} 
              className="movie-card"
              onMouseEnter={() => setRemove(movie.id)}
              onMouseLeave={() => setRemove(null)}
              >     
             
                <img
                  onClick={() => setFavs(((prev: any) => toggleModal(prev, movie.id, setMT, setGenres, setAge, setCast)))}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
             
                {remove === movie.id && 
                 <div className='extra-options'>
                 <h4>{movie.title}</h4>
                <button className='add-to-list' onClick={() => removeFav(movie.id)}>
                  My List 
                  <span className='plus'>-</span>
                  </button>
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
                    genres={genres.join(", ") ? genres.join(", ") : 'N/A'}
                    age={age ? age : 'N/A'}
                    desc={movie.overview ? movie.overview : 'N/A'}
                    cast={cast.join(", ") ? cast.join(", ") : 'N/A'}
                    click={() => setFavs((prev: any) => closeModal(prev, movie.id))}
                  />
                )}
          
          </div>
        </div>
      ))}
        
        </div>
        </div>
      </div>
    </>
  );
}

export default Favs;