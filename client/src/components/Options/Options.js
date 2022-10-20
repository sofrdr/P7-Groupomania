import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import './Options.scss'

const Options = (props) => {

    const { context, user } = props

    return (
        <div className={context === "card" ? "options-container options-container-card" : "options-container options-container-header"} >
            {context === "card" ? <ul >
                <li onClick={props.update} ><FontAwesomeIcon icon={faPen} className="options-icon" />Modifier</li>
                <li onClick={props.delete}> <FontAwesomeIcon icon={faTrash} className="options-icon" />Supprimer</li>
            </ul> :
                <ul>
                    <li>{user}</li>
                    <li onClick={props.disconnect}><FontAwesomeIcon icon={faRightFromBracket} className="options-icon"/>Déconnexion</li>
                </ul>}

        </div>
    )
}

export default Options