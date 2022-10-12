import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import logo from "../../assets/icon-left-font.png"
import { returnToLogin } from "../../services/api";
import "./Header.scss"

const Header = (props) => {

    const disconnect = () => {
        try {
            returnToLogin()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <header className="header">
            <a href={window.location}><img src={logo} alt="groupomania-logo" className="header--logo" /></a>
            <div className="header-profil">
                <p >Bienvenue {props.user} !</p>
                <div className="header-logout" onClick={disconnect}>
                  <FontAwesomeIcon icon={faRightFromBracket} className="icon header-logout--icon"  />
                <p>Déconnexion</p>  
                </div>
                
            </div>

        </header>
    )
}

export default Header