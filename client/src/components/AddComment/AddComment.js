import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";

import { addComment } from "../../services/api";
import "./AddComment.scss"
import Error from "../Error/Error";

const AddComment = (props) => {

    const [message, setmessage] = useState("")
    const [showError, setShowError] = useState(null);

    const postId = props.id
    const { createComment, toggleAddComment, windowWidth} = props

    

    const handlemessage = (e) => {
        setmessage(e.target.value)
    }

    const toggleError = () => {
        setShowError(null)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await addComment({ message }, postId)
            const newComment = data.newComment
            if (message !== "") {
                createComment(postId, newComment)
                toggleAddComment()
            }

        } catch (err) {
            setShowError(err);
        }
    }
    if (showError !== null) return <Error errorData={showError} toggleError={toggleError} />;
    return (
        <div className="comment-container new-comment">
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

                {windowWidth < 992 && <FontAwesomeIcon icon={faShareFromSquare} className="icon new-comment-icon" onClick={handleSubmit}/>}
            </form>

        </div>
    )

}

export default AddComment