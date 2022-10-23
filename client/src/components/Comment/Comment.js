import { React, useState } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

// Composants
import Options from "../Options/Options";
import UpdateComment from "../UpdateComment/UpdateComment";
import Error from "../Error/Error";

// API
import { deleteComment } from "../../services/api";

// Sass
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

    // isAuthorized = true si l'utilisateur connecté est admin ou auteur du post 
    const isAuthorized = pseudo === author || user.isAdmin === 1

    

    const visibleOptions = options.type === "comment" && options.id === id;
   
    // Fonction qui change le state de showModal pour afficher ou non la fenêtre de modification du commentaire (composant UpdateComment)
    const toggleModal = () => {
        setShowModal(!showModal)

    }

    // Fonction qui change le state de message après la modification du commentaire
    const updateMessage = (message) => {
        toggleModal();
        setMessage(message)
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

    // On définit le type d'options et l'id du commentaire associé
    const updateOptions = () => {
        if (!options.type) return handleOptions({ type: "comment", id });
        if (options.id !== id) return handleOptions({ type: "comment", id });
        handleOptions({});
    }


   // Si une erreur est retournée par l'API, on l'affiche dans le composant Error
    if (showError !== null) return <Error errorData={showError} />;
    return (

        // Si showModal = true alors on affiche le composant de modification du commentaire (UpdateComment) sinon on affiche le commentaire
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