import "../style/navbar.css";
import "../style/general.css";
import tippy from 'tippy.js';
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        tippy('#myBtn', {
            content: "Example",
            allowHTML: true,
            arrow: true,
            theme: "custom"
        });
    }, []);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <nav className={"navigation"}>
                <div className={"avatar-side"}>
                    <img id="myBtn" className={"avatar"} src="https://as1.ftcdn.net/v2/jpg/01/63/11/70/1000_F_163117064_syJkTuCddASYjvl4WqyRmnuy8cDXpoQY.jpg" alt={"avatar"}/>
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