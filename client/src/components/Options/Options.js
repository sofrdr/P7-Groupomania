import React from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// Sass
import './Options.scss'

const Options = (props) => {

    const { context, user } = props

    return (
        // Si le contexte passé en props est card alors on affiche les options de modification et suppression, sinon on affiche les options propres au header
        <div className={context === "card" ? "options-container options-container-card" : "options-container options-container-header"} >
            {context === "card" ? <ul >
                <li  ><button title="Modifier le contenu" onClick={props.update} className="options_btn"><FontAwesomeIcon icon={faPen} className="options-icon" />Modifier</button></li>
                <li ><button title="Supprimer le contenu" onClick={props.delete} className="options_btn"><FontAwesomeIcon icon={faTrash} className="options-icon" />Supprimer</button> </li>
            </ul> :
                <ul>
                    <li>{user}</li>
                    <li onClick={props.disconnect}><FontAwesomeIcon icon={faRightFromBracket} className="options-icon"/>Déconnexion</li>
                </ul>}

        </div>
    )
}

export default Options