import { NavLink, Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useRandom from "../Hooks/RandomStore";
import banner from '../images/banner3.png';
import noti from '../images/noti2.png';
import search from '../icons/search_icon.svg';
import bruh from '../icons/netflixPfp.png';
import '../styles/Layout.css';

function Layout(){
    const {show, setShow} = useRandom(); 
    const navi = useNavigate();
    const [scrolled, setScrolled] = useState(false);

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
                    <img onClick={() => setShow(!show)} id="search-icon" src={search} alt="search icon"/>
                    <p>Adult</p>
                    <img src={noti} alt="notis" />
                    <img src={bruh} alt="netflix profile icon"/>
                </div>

            </nav>
            <Outlet />
        </>
    )
}

export default Layout;
