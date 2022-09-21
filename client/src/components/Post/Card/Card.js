import React from "react";
import "./Card.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';


const Card = (props) => {



    return (
        <article className="card">

            <div className="card-content">

                <div >
                    <div className="card-content--header-author">
                        <p>{props.author} </p>
                        <FontAwesomeIcon icon={faEllipsis}/>
                    </div>

                    <p>{props.date}</p>
                </div>
                <p className="card-content--message">{props.message}</p>
                <div className="card-content--image-container">
                    <img src={props.picture} alt="" className="card-content--image" />
                </div>

                <div className="card-content--indicators">
                    <div className="card-content--indicators-elt">
                        <FontAwesomeIcon icon={faHeart} />
                        {props.likes}
                    </div>
                    <div className="card-content--indicators-elt">
                        <FontAwesomeIcon icon={faComment} />
                        {props.numberOfComments}
                    </div>
                </div>

                <div className="card-comments">
                    {props.comments}
                    <p onClick={props.handleComments} className="card-comments--onclick">
                        {props.showAllComments ? "Voir moins de commentaires" : "Voir tous les commentaires"}</p>
                </div>
            </div>


        </article>
    )




}



export default Card