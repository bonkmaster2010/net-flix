import space from '../images/cool-space-background.jpg'
import sad from '../icons/sad.gif'
import { useNavigate } from 'react-router';
import '../styles/404.css'

function PageNotFound(){
    const navi = useNavigate();
    return (
        <div className="PageNotFound" style={{backgroundImage: `url(${space})`}}>
            <h1>Lost your way?</h1>
            <p>Sorry, we can't find that page. You'll find loads to explore on the home page</p>
            <button onClick={() => navi('/')}>Netflix Home</button>
            <div className='NSES-404'>
            <p id='meSad'>i couldn't find the original 404 netflix background image <a href='https://www.youtube.com/@markiplier' target='_blank'><img src={sad} alt='sad joe emoji gif'/></a></p>
            <p id='NSES-404p'>Error Code: <b>NSES-404</b></p>
           </div>
        </div>
    )
}

export default PageNotFound;