import { React, useState } from "react";
import { Navigate } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';

import Options from "../Options/Options";
import logo from "../../assets/icon-left-font.png"
import "./Header.scss"

const Header = (props) => {

    const [redirect, setRedirect] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const { user, windowWidth } = props



    // Déconnexion de l'utilisateur : nettoyage du localStorage et retour à la page de connexion
    const disconnect = () => {
        try {
            localStorage.clear();
            setRedirect(true)
        }
        catch (err) {
            console.log(err)
        }
    }


    if (redirect) {
        return <Navigate to="/" />
    }
    return (
        <header className="header">
            <a href={window.location} className="header--logo"><img src={logo} alt="groupomania-logo" /></a>
            {windowWidth >= 992 &&
                <p className="header-profil">Bienvenue {user} !</p>}
            {windowWidth >= 992 ?
                <div className="header-logout" onClick={disconnect}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="icon header-logout--icon" />
                    <p>Déconnexion</p>
                </div>
                : <div className="header-logout">
                    <FontAwesomeIcon icon={faBars} className="icon" onClick={() => setShowOptions(prevShowOptions => !prevShowOptions)}/>
                    {showOptions && 
                    <Options
                    user={user}
                    disconnect={disconnect}
                    context = "header"/>}
                </div>}



        </header>
    )
}

export default Header