import Footer from "./footer";
import useLogin from "../Hooks/LoginStore";
import Netflix from '../images/banner3.png';
import bg from '../images/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv.jpg';
import { submit } from "../functions/loginFNS";
import { useState } from 'react';
import '../styles/Login.css';

function Login(){
    const [user, setUser] = useState<any>('');
    const [pass, setPass] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const { setLogin } = useLogin();

    return(
        <>
      <img className="login-netflix-img" src={Netflix} alt="Netflix banner"/>
   <div className="login-main-cont" style={{background: `url(${bg})`}}>
        <div className="login-cont">
            <h1>Log in</h1>
            <input placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)}/>
            <input placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button className="login-btn" onClick={() => submit(setLogin, user, pass, email)}>Log in</button>
             <p id="OR">OR</p>
             <button className="sign-in-code">Use a Sign-in Code</button>
             <a href="#">Forgot password?</a>
             <p><input type="checkbox"/> Remember me</p>
             <div className="signup-text-cont">
             <p id="classNamesAreHard">New to Netflix? </p>
             <p id="signup-text">Sign up now.</p>
             </div>
        </div>
        </div>

        <Footer/>
        </>
    )
}

export default Login;