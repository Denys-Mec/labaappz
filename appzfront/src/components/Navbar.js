import "../style/navbar.css"
import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <nav className={"navigation"}>
                <div className={"avatar-side"}>
                    <img className={"avatar"} src="https://as1.ftcdn.net/v2/jpg/01/63/11/70/1000_F_163117064_syJkTuCddASYjvl4WqyRmnuy8cDXpoQY.jpg" alt={"avatar"}/>
                    <span>Петрик Ольга</span>
                </div>
                <Link className={location.pathname === '/home' ? 'nav-item active-link' : 'nav-item'} to="/home">
                    Головна
                </Link>
                <Link className={"nav-item"} to="">
                    Пацієнти
                </Link>
                <Link className={"nav-item"} to="">
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
                <Link className={"nav-item"} to="">
                    Вихід
                </Link>
            </nav>
        </div>
    );
};

export default Navbar;