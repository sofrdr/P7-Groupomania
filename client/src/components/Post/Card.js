import React from "react";



const Card = (props) => {


    
    return(
        <article >
            <div>
                <p>{props.author}</p>
                <p>{props.date}</p>
            </div>
            <div>
                <p>{props.message}</p>
                <img src={props.picture} alt=""/>
                <div>
                    <div>{props.likes}</div>
                    <div>{props.numberOfComments}</div>
                </div>
            </div>
            <div>
                {props.comments}
                <button onClick={props.handleComments}>{props.showAllComments ? "Voir moins de commentaires" : "Voir tous les commentaires"}</button>
            </div>

        </article>
    )




}



export default Card