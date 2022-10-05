import React from "react";
import logo from "../../assets/icon-left-font.png"
import "./Header.scss"

const Header = (props) => {
    return(
        <header className="header">
            <img src={logo} alt="groupomania-logo" className="header--logo"/>
            <p className="header--profil">Bienvenue {props.user} !</p>
        </header>
    )
}

export default Header