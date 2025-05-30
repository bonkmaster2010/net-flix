import useRandom from "../Hooks/RandomStore";
import useMainStore from "../Hooks/MainStore";
import useLogin from "../Hooks/LoginStore";
import banner from '../images/banner3.png';
import noti from '../images/noti2.png';
import search from '../icons/search_icon.svg';
import bruh from '../icons/netflixPfp.png';
import { NavLink, Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import '../styles/Layout.css';

function Layout(){
    const [scrolled, setScrolled] = useState(false);
    const { setOriginalDatas, setDatas } = useMainStore();
    const {show, setShow} = useRandom();
    const {pfp, isLoggedIn} = useLogin(); 
    const navi = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY === 0);
        };
        handleScroll()
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (                                                                                            
        <>
           {isLoggedIn &&
            <nav className={scrolled ? "scrolled" : ""}>
                <div className="main-links">
                    <button onClick={() => {
                        setShow(false);
                        navi("/");
                        }} id="netflix"><img src={banner} alt="Netflix Banner" /></button>
                    <NavLink onClick={() => setShow(false)} to='/'>Home</NavLink>
                    <NavLink onClick={() => setShow(false)} to='/favs'>My List</NavLink>
                </div>

                <div className="extra-links">
                    <img onClick={() => {
                        setOriginalDatas([]);
                        setDatas([]);
                        setShow(!show);
                        }} id="search-icon" src={search} alt="search icon"/>
                    <p>Adult</p>
                    <img src={noti} alt="notis" />
                    <img onClick={() => navi("/profile")} src={pfp ? pfp : bruh} alt="netflix profile icon"/>
                </div>

            </nav>
            }
            <Outlet />
        </>
    )
}

export default Layout;
