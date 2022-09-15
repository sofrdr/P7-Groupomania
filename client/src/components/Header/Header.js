import React from "react";
import logo from "../../assets/icon-left-font.png"
import "./Header.scss"

const Header = () => {
    return(
        <header className="header">
            <img src={logo} alt="groupomania-logo" className="header--logo"/>
            <p className="header--profil">Bienvenue utilisateur !</p>
        </header>
    )
}

export default Header