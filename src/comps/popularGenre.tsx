import Modal from './Modal';
import trailerFB from '../images/trailer.jpg';
import useRandom from '../Hooks/RandomStore';
import { useState, useEffect } from 'react';
import { modals } from '../functions/fetchingFN';
import { toggleModal, closeModal } from '../functions/OtherFns';
import '../styles/Pop.css';

interface Props{
  addToList: null | number,
  setAddToList: any,
  genre: string;
  id: number;
  data: any[];
}

function Pop({addToList, setAddToList, data, genre, id }: Props){
    const [datas, setDatas] = useState<any[]>([]);
    const [MT, setMT] = useState("");
    const [age, setAge] = useState("");
    const [genres, setGenres] = useState([]);
    const [Cast, setCast] = useState<string[]>([]);
    const { setFavs, removeFav, favs } = useRandom();
    useEffect(() => {
      setDatas(modals(data));
    }, [data])


    
    return (
        <>
    <h2 className="genre-name">{genre}</h2>
    <div className='movie-cont'>
      {datas.filter((movie: any) => movie.genre_ids.includes(id)).map((movie: any) => (
        <div key={movie.id} 
          className='movie-card'          
          onMouseEnter={() => setAddToList(`${genre}-${movie.id}`)}
          onMouseLeave={() => setAddToList(null)} >
          
          <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          onClick={() => setDatas(datas => toggleModal(datas, movie.id, setMT, setGenres, setAge, setCast))} 
          />
           
           {String(addToList) === `${genre}-${movie.id}` && 
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
              click={() => setDatas(datas => closeModal(datas, movie.id))}
              type={MT ? 'iframe' : 'img'}
              class={MT ? "MT" : "trailer-fallback"}                
              src={MT ? MT : trailerFB}
              img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title ? movie.title : 'N/A'}
              desc={movie.desc ? movie.desc : 'N/A'}
              genre={genres[0] ? genres[0] : 'N/A'}
              date={movie.release_date ? movie.release_date : 'N/A'}
              age={age ? age : 'N/A'}
              genres={genres.join(", ") ? genres.join(", ") : 'N/A'}
              cast={Cast.join(", ") ? Cast.join(", ") : 'N/A'}
            />
          )}
        </div>
     ))}
    </div>
        </>
    )
}

export default Pop;