import React from "react";
import "./Comment.scss"

const Comment = (props) => {

    return(
        <div className="comment-container">
            
              <p>{props.author}</p>  
            
            <div className="comment-content">
                <p>{props.message}</p>
                <p>{props.date}</p>
            </div>
            

        </div>
    )
}

export default Comment