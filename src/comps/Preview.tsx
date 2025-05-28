import Modal from "./Modal";
import trailer from '../images/trailer.jpg';
import play from '../icons/play_icon.png';
import info from '../icons/info_icon.png';
import { togglePreviewModal, closePreviewModal } from "../functions/OtherFns";
import '../styles/Preview.css'

function Preview({
  preview,
  setPreview,
  shortOV,
  MT,
  age,
  genres,
  cast,
  setMT,
  setGenres,
  setAge,
  setCast,

}: any){
    return (
                <>
        <div
          className="preview"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${preview?.poster_path})`,
          }}
        >
          <div className="preview-desc">
            <img
              src={`https://image.tmdb.org/t/p/original${preview?.poster_path}`}
              alt={preview?.title}
            />
            <h1>{preview?.title}</h1>
            <p>{shortOV}</p>
          <div className="preview-btns">
            <button className="prev-play"><img src={play} alt='play icon' id='play-img'/> Play</button>
            <button className="prev-more-info" onClick={(e) => {
              if(preview){
                e.stopPropagation()
                const newData = togglePreviewModal(preview, preview!.id, setMT, setGenres, setAge, setCast)
                setPreview(newData);
              }
            }}><img src={info} alt='info icon' id='info'/> More Info</button>
          </div>
          </div>
        </div>
                      {preview?.modal && (
                      <Modal
                      type={MT ? 'iframe' : 'img'}
                      class={MT ? "MT" : "trailer-fallback"}                      
                      src={MT ? MT : trailer}
                      img={`https://image.tmdb.org/t/p/w500${preview?.poster_path}`}
                      alt={preview?.title}
                      title={preview?.title}
                      date={preview?.release_date}
                      genre={genres[0]}
                      genres={genres.join(", ")}
                      age={age}
                      desc={preview?.overview}
                      cast={cast.join(", ")}
         click={() => setPreview((prev: any) => closePreviewModal(prev, preview!.id))}
              />
          )}
          </>
    )
}

export default Preview;