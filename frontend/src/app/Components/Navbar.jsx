'use client';

import { useState, useEffect } from 'react';
import { DiZend } from "react-icons/di";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import './Navbar.css'
import Loginpopup from './Loginpopup';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import Profilelogin from './Profile/Profilelogin'



const Navbar = () => {
    const [clicked, setClicked] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
   
   

    const handleClick = () => {
        setClicked(!clicked);
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                const position = window.scrollY;
                setScrollPosition(position);
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);
    return (
        <div>

            <div className="container">
                <div className="header">
                    <div className="logo"><Link href='/'><DiZend /></Link></div>
                    <span>abcd@example.com | 937783883</span>
                    <div ><button className="header-button ">Get 5 free quotations</button></div>
                </div>
            </div>
            <nav className="navbar" style={{ top: scrollPosition > 0 ? '0' : 'auto' }}>
                <input type='checkbox' id='menu-click' />
                <label htmlFor="menu-click" className="menu-btn hamburger" onClick={handleClick}>

                    {clicked ? <RxCross1 /> : <RxHamburgerMenu />}
                </label>

                <div className="nav-links">

                    <DropdownMenu />

                    <ul>
                        <Link href='/'><li>Home</li></Link>
                        <li>Custom Exhibition Stands</li>
                        <li>Trade Shows</li>
                        <li>Blogs</li>
                    </ul>

                </div>
                {loggedIn ? <Profilelogin setLoggedIn={setLoggedIn}/> : <Loginpopup setLoggedIn={setLoggedIn} />}            

                {/* <span className="user-greeting">
                    {loggedIn ? <p>Hello,{setName}</p> : <Loginpopup setLoggedIn={setLoggedIn} />}
                </span>
                {loggedIn && <Profilelogin setLoggedIn={setLoggedIn} />}  */}

            </nav>

        </div>

    )
}

export default Navbar