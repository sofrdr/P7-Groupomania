import { React, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import Options from "../Options/Options";
import UpdateComment from "../UpdateComment/UpdateComment";
import Error from "../Error/Error";

import { deleteComment } from "../../services/api";
import "./Comment.scss"

// Day.js
import dayjs from 'dayjs';
import localeObject from "../../services/fr"
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale('fr', localeObject)


const Comment = (props) => {

    const { handleOptions, options, id, date, author, user, removeComment, postId, windowWidth } = props;

    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState(props.message)
    const [showError, setShowError] = useState(null)

    const pseudo = user.pseudo
    const isAuthorized = pseudo === author || user.isAdmin === 1

    

    const visibleOptions = options.type === "comment" && options.id === id;
   
    // Fonction qui change le state de showModal pour afficher ou non la fenêtre de modification du post (composant UpdatePost)
    const toggleModal = () => {
        setShowModal(!showModal)

    }

    // Fonction pour supprimer un commentaire
    const handleDeleteComment = async () => {
        try {
            await deleteComment(id)
            removeComment(postId, id)
        }
        catch (err) {
            console.log(err)
            setShowError(err)
        }
    }

    function updateOptions() {
        if (!options.type) return handleOptions({ type: "comment", id });
        if (options.id !== id) return handleOptions({ type: "comment", id });
        handleOptions({});
    }

    function updateMessage(message) {
        toggleModal();
        setMessage(message)
    }

    if (showError !== null) return <Error errorData={showError} />;
    return (

        <div>
            {showModal ? <div className={showModal ? "update-modal " : "hidden"}>
            <UpdateComment 
            id = {id}
            message = {message}
            author = {author}
            isModalOpen = {showModal}
            toggleModal = {toggleModal}
            updateMessage = {updateMessage}
            windowWidth={windowWidth} 
            updateOptions={updateOptions}         
            />

            </div>
                : <div className="comment-container">
                    <div className="comment-header">
                        <p className="comment-header--author">{author}</p>
                        <div className={isAuthorized ? "options" : "hidden"}>
                            <button title="Ouvrir les options de commentaire" onClick={updateOptions}><FontAwesomeIcon icon={faEllipsis} className="icon"  /></button>
                            {visibleOptions && <Options delete={handleDeleteComment} update={toggleModal} context="card"/>}
                        </div>
                    </div>


                    <div className="comment-content">
                        <p>{message}</p>
                        <p>{dayjs(date).fromNow()}</p>
                    </div>


                </div>}


        </div>
    )
}

export default Comment