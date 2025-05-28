import '../styles/Modal.css';

function Modal(props: any){
  
    return (<div className="overlay">
      
            <div className='modal-bg' style={{background: `url(${props.img})`}}></div>
            <div className='modal-bg-color'></div>

         <div className="modal">
            <button onClick={props.click} className='modal-close'>&times;</button>
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