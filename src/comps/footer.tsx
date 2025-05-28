import '../styles/footer.css';
import FB from '../images/facebook_icon.png'
import yt from '../images/youtube_icon.png';
import tw from '../images/twitter_icon.png';
import ig from '../images/instagram_icon.png';


function Footer(){
   return (
   <div className='footer'>
    <div className='socials'>
        <a target='_black'> <img src={FB} alt='facebook icon'/> </a>
        <a target='_black'> <img src={yt} alt='youtube icon'/> </a>
        <a target='_black'> <img src={tw} alt='Twitter icon'/> </a>
        <a target='_black'> <img src={ig} alt='instagram icon'/> </a>
    </div>
    <div className='extra'>
        <p>Audio Description</p>
        <p>Investor Relations</p>
        <p>Legal Notices</p>
        <p>Help Center</p>
        <p>Jobs</p>
        <p>Cookie Preferences</p>
        <p>Gift Cards</p>
        <p>Terms of Use</p>
        <p>Corporate Information</p>
        <p>Media Center</p>
        <p>Privacy</p>
        <p>Contact Us</p>
    </div>

   </div>
   )
}

export default Footer;