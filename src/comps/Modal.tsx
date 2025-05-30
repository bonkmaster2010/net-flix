import useRandom from '../Hooks/RandomStore';
import N from '../icons/N.png';
import { closeModal } from '../functions/OtherFns';
import '../styles/Modal.css';

function Modal(props: any){

    const { setFavs, removeFav, favs } = useRandom();
    
    return (
    <div className="overlay">  
            <div className='modal-bg' style={{background: `url(${props.img})`}}></div>
            <div className='modal-bg-color'></div>

         <div className="modal">
            <button onClick={props.click} className='modal-close'><img className='modal-close-icon' src={N} alt='netflix N icon'/></button>
          <props.type className={props.class} src={props.src} allowFullScreen></props.type>
           
            <div className="info">
             <h2>{props.title}</h2>
             
             <div className="extra-info">
                <p>{props.date}</p>
                •
                <p>{props.age} </p>
                •
                <p>{props.genre}</p>
             </div>
             
             <div className="desc">
                <p>{props.desc}</p>
             </div>

             <div className='desc-btn-cont'>
                 {!favs.some(m => m.id === props.id) ? <button className='add-to-list'  onClick={() => {
                    setFavs(props.movie);
                    setFavs((prev: any) => closeModal(prev, props.movie.id));
                 }}>
                    My List
                    <span className='plus'>+</span>
                    </button> : <button className="add-to-list"  onClick={() => removeFav(props.id)}>
                      My List 
                      <span className="plus">-</span>
                    </button>
                    }  
             </div>
            </div>
                <h2 id='MD'>More Details</h2>

             <div className='more-details'>
                <div className='wf'>
                    <p>Watch offline</p>
                    <p id='MD-text'>Available to download</p>
                    <p>Genres</p>
                    <p id="MD-text">{props.genres}</p>
                </div>

                <div className='audio'>
                    <p>Audio</p>
                    <p id='MD-text'>English</p>
                    <p>Subtitles</p>
                    <p id='MD-text'>English</p>
                </div>
                
                <div className='cast'>
                    <p>Stars</p>
                    <p id='MD-text'>{props.cast}</p>
                </div>
             </div>
        </div>
    </div>)

}

export default Modal;