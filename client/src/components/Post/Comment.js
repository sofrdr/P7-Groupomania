import React from "react";

const Comment = (props) => {

    return(
        <div>
            <div>
              <p>{props.author}</p>  
            </div>
            <div>
                <p>{props.message}</p>
                <p>{props.date}</p>
            </div>
            

        </div>
    )
}

export default Comment