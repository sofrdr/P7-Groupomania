import React, { useState } from "react";
import { addComment } from "../../../services/api";
import "./AddComment.scss"

const AddComment = (props) => {

    const [message, setmessage] = useState("")

    const postId = props.postId

    const handlemessage = (e) => {
        setmessage(e.target.value)
    }
    console.log({message})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await addComment({message}, postId)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="comment-container ">
            <form onSubmit={handleSubmit}>
                <input   
                className="new-comment-content"             
                type="text"
                id="message"
                name="message"
                placeholder="Laissez un commentaire ..."
                value={message}
                onChange={handlemessage}
                />
            </form>
            
        </div>
    )

}

export default AddComment