import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import "./Comment.scss"

const Comment = (props) => {

    return (
        <div className="comment-container">
            <div className="comment-header">
               <p className="comment-header--author">{props.author}</p> 
               <FontAwesomeIcon icon={faEllipsis}/>
            </div>
            

            <div className="comment-content">
                <p>{props.message}</p>
                <p>{props.date}</p>
            </div>


        </div>
    )
}

export default Comment