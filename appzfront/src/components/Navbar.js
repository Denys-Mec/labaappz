import "../style/navbar.css";
import "../style/general.css";

import React, { useEffect, useRef, useState } from "react";
import tippy from 'tippy.js';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isShowed, setIsShowed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const wrapperRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target) && isShowed && isMobile) {
                    closeMenu();
                }
            }

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, isShowed, isMobile]);
    }

    useOutsideAlerter(wrapperRef);

    useEffect(() => {
        tippy('#myBtn', {
            content: "Example",
            allowHTML: true,
            arrow: true,
            theme: "custom"
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const showMenu = () => {
        setIsShowed(!isShowed);

        let nav = document.getElementsByClassName("navigation")[0];
        nav.style.display = "flex";
        nav.style.width = "80%";
        let btn = document.getElementsByClassName("menu-btn")[0];
        btn.style.display = "none";
    }

    const closeMenu = () => {
        setIsShowed(!isShowed);

        let nav = document.getElementsByClassName("navigation")[0];
        nav.style.display = "none";
        let btn = document.getElementsByClassName("menu-btn")[0];
        btn.style.display = "block";
    }

    return (
        <div>
            <button className={"menu-btn"} onClick={showMenu}></button>
            <nav ref={wrapperRef} className={"navigation"}>
                <div className={"avatar-side"}>
                    <img id="myBtn" className={"avatar"} src="https://as1.ftcdn.net/v2/jpg/01/63/11/70/1000_F_163117064_syJkTuCddASYjvl4WqyRmnuy8cDXpoQY.jpg" alt={"avatar"} />
                    <span>Петрик Ольга</span>
                </div>
                <Link className={"nav-item"} to="">
                    Головна
                </Link>
                <Link className={"nav-item"} to="">
                    Пацієнти
                </Link>
                <Link className={location.pathname === '/questionnaires' ? 'nav-item active-link' : 'nav-item'} to="/questionnaires">
                    Опитувальники
                </Link>
                <span className={(location.pathname === '/questions' || location.pathname === '/chatbot') ? 'nav-item help-nav active-link' : 'nav-item help-nav'} onClick={handleToggle}>
                    Допомога
                </span>
                {isExpanded && (
                    <div className={"expanded-nav"}>
                        <Link className={"expanded-nav-item"} to={""}>Інструкція</Link>
                        <Link className={"expanded-nav-item"} to={"/questions"}>Питання</Link>
                        <Link className={"expanded-nav-item"} to={"/chatbot"}>Чат-бот</Link>
                    </div>
                )}
                <Link className={"nav-item"} to="/">
                    Вихід
                </Link>
            </nav>
        </div>
    );
};

export default Navbar;
