import {React, useState} from "react";
import { Navigate } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import logo from "../../assets/icon-left-font.png"
import "./Header.scss"

const Header = (props) => {

    const [redirect, setRedirect] = useState(false)

   
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


if(redirect){
    return <Navigate to="/" />
}        
    return (
        <header className="header">
            <a href={window.location}><img src={logo} alt="groupomania-logo" className="header--logo" /></a>
            <div className="header-profil">
                <p >Bienvenue {props.user} !</p>
                <div className="header-logout" onClick={disconnect}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="icon header-logout--icon" />
                    <p>Déconnexion</p>
                </div>

            </div>

        </header>
    )
}

export default Header