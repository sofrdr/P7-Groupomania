import React from "react";



const Card = (props) => {


    
    return(
        <article className="card">
            <div className="card-header">
                <p>{props.author}</p>
                <p>{props.date}</p>
            </div>
            <div className="card-content">
                <p className="card-content--message">{props.message}</p>
                <img src={props.picture} alt="" className="card-content--image"/>
                <div>
                    <div>{props.likes}</div>
                    <div>{props.numberOfComments}</div>
                </div>
            </div>
            <div className="card-comments">
                {props.comments}
                <button onClick={props.handleComments}>{props.showAllComments ? "Voir moins de commentaires" : "Voir tous les commentaires"}</button>
            </div>

        </article>
    )




}



export default Card