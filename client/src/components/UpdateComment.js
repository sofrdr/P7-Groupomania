import { React, useState } from "react";

import { updateComment } from "../services/api";

import Error from "./Error/Error";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";

const UpdateComment = (props) => {


    const [message, setMessage] = useState(props.message)
    const [showError, setShowError] = useState(null)

    const { author, isModalOpen, id, updateMessage, windowWidth, updateOptions } = props


    const toggleError = () => {
        setShowError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateComment({ message }, id)
            if (message !== "") {
                updateMessage(message)
            }
            updateOptions()

        } catch (err) {
            console.log(err)
            setShowError(err)
        }
    }


    if (showError !== null) return <Error errorData={showError} toggleError={toggleError} />;
    return (
        <div className="comment-container new-comment ">
            <form onSubmit={handleSubmit}>
                <div className="comment-header">
                    <p className="comment-header--author"> {author}</p>
                    <FontAwesomeIcon icon={faXmark} className="icon" onClick={isModalOpen && props.closeModal} />
                </div>

                <input
                    className="new-comment-content"
                    type="text"
                    id="updateMessage"
                    name="updateMessage"
                    placeholder="Laissez un commentaire ..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {windowWidth < 992 && <FontAwesomeIcon icon={faShareFromSquare} className="icon new-comment-icon" onClick={handleSubmit} />}
            </form>



        </div>
    )

}

export default UpdateComment