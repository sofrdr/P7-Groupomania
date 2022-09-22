import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import './Options.scss'

const Options = () => {
    return(
        <div className="options-container">
            <ul>
                <li><FontAwesomeIcon icon={faPen} className="options-icon"/>Modifier</li>
                <li> <FontAwesomeIcon icon={faTrash} className="options-icon"/>Supprimer</li>
                <li> <FontAwesomeIcon icon={faEyeSlash} className="options-icon"/>Masquer</li>
            </ul>
        </div>
    )
}

export default Options