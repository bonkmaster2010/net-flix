import Modal from "./Modal";
import Filter from "./Filter";
import useRandom from "../Hooks/RandomStore";
import useMainStore from "../Hooks/MainStore";
import trailer from '../images/trailer.jpg';
import washing from '../icons/put-ur-dirty-shoes-in-my-washing-machine.gif';
import { toggleModal, closeModal } from "../functions/OtherFns"
import '../styles/Query.css'

function Query({
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
}: any) {
  const { favs, loading, setFavs, removeFav } = useRandom();
  const { datas, setDatas } = useMainStore();

  return (
    <>
      <div className="query-main-cont">
        {loading && datas.length === 0 && (
          <p className="loading">Fetching please be patient... <img src={washing} alt="put your dirty shoes in my washing machine gif"/></p>
        )}
        <Filter/>
        {datas.length > 0 && <div className="query-cont">
          <div className="query-chunk">
            {datas.map((movie: any) => (
              <div
                key={movie.id}
                className="movie-card"
                onMouseEnter={() => setAddToList(movie.id)}
                onMouseLeave={() => setAddToList(null)}
              >
                <img
                  onClick={() => {
                    const newData = toggleModal(
                      datas,
                      movie.id,
                      setMT,
                      setGenres,
                      setAge,
                      setCast
                    );
                    setDatas(newData);
                  }}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                {addToList === movie.id && (
                  <div className="extra-options">
                    <h4>{movie.title}</h4>
                    {!favs.some((m) => m.id === movie.id) ? (
                      <button
                        className="add-to-list"
                        onClick={() => setFavs(movie)}
                      >
                        My List <span className="plus">+</span>
                      </button>
                    ) : (
                      <button
                        className="add-to-list"
                        onClick={() => removeFav(movie.id)}
                      >
                        My List <span className="plus">-</span>
                      </button>
                    )}
                  </div>
                )}

                {movie.modal && (
                  <Modal
                    type={MT ? "iframe" : "img"}
                    class={MT ? "MT" : "trailer-fallback"}
                    src={MT ? MT : trailer}
                    img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || "N/A"}
                    title={movie.title || "N/A"}
                    date={movie.release_date || "N/A"}
                    genre={genres[0] || "N/A"}
                    genres={genres.length > 0 ? genres.join(", ") : "N/A"}
                    age={age || "N/A"}
                    desc={movie.overview || "N/A"}
                    cast={cast.length > 0 ? cast.join(", ") : "N/A"}
                    movie={movie}
                    id={movie.id}
                    click={() => {
                      const newData = closeModal(datas, movie.id);
                      setDatas(newData);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>}
      </div>
    </>
  );
}

export default Query;

