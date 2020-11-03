import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { AppContext } from "../../context/AppContext";
import { CSSTransition } from "react-transition-group";

interface IProps {
    Logout: () => void;
}

const HeaderView = (props: IProps) => {
    const isLoggedIn = localStorage.getItem('jwt');
    const email = localStorage.getItem('email');
    const appContext = useContext(AppContext);
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };
    return (
    <header className="Header">
        <a className="navbar-brand" href="/">
        <img src={require("../../assets/logo.png")} className="Logo" alt="logo" />
        </a>
        <CSSTransition
            in={!isSmallScreen || isNavVisible}
            timeout={350}
            classNames="NavAnimation"
            unmountOnExit>
            <nav className="Nav">
                { isLoggedIn != null   &&
                <a href="/AttackBase" style={{fontSize: "large", fontWeight: "bold", color: "red"}}>Attack</a>
                }
                { isLoggedIn != null   &&
                    <a href="/HunterBase" style={{fontSize: "large", fontWeight: "bold", color: "red"}}>Your HunterBase</a>
                }
                { isLoggedIn == null &&
                    <a className="nav-link" href="../Register/Register.tsx">Register</a>
                }
                { isLoggedIn == null   &&
                    <a href="/Login" className="nav-link">Login</a>
                }
                { isLoggedIn != null   &&
                    <h6 className="nav-link text-white" >{email}</h6>
                }
                { isLoggedIn != null   &&
                    <button type="button" style={{float: "right"}} onClick={(e) => props.Logout()} >Logout</button>
                }
            </nav>
        </CSSTransition>
    </header>
    )
};
export default HeaderView;
