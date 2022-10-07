import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import './Options.scss'

const Options = (props) => {
    return(
        <div className="options-container" focusable = {true}>
            <ul >
                <li onClick={props.update}><FontAwesomeIcon icon={faPen} className="options-icon"/>Modifier</li>
                <li onClick={props.delete}> <FontAwesomeIcon icon={faTrash} className="options-icon"/>Supprimer</li>
                <li> <FontAwesomeIcon icon={faEyeSlash} className="options-icon"/>Masquer</li>
            </ul>
        </div>
    )
}

export default Options