import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import './Options.scss'

const Options = (props) => {



    return(
        <div className="options-container" >
            <ul >
                <li onClick={props.update} ><FontAwesomeIcon icon={faPen} className="options-icon"/>Modifier</li>
                <li onClick={props.delete}> <FontAwesomeIcon icon={faTrash} className="options-icon"/>Supprimer</li>
                
            </ul>
        </div>
    )
}

export default Options