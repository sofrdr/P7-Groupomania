import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Options from "../Options/Options";
import UpdateComment from "../UpdateComment";
import { deleteComment, refreshPage } from "../../../services/api";
import "./Comment.scss"

// Day.js
import dayjs from 'dayjs';
import localeObject from "../../../services/fr"
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale('fr', localeObject)





const Comment = (props) => {

    const { handleOptions, options, id, message, date, author, user } = props;

    const [showModal, setShowModal] = useState(false)

    const pseudo = user.pseudo
    const isAuthorized = pseudo === author

    const visibleOptions = options.type === "comment" && options.id === id;
   
    // Fonction qui change le state de showModal pour afficher ou non la fenêtre de modification du post (composant UpdatePost)
    const toggleModal = () => {
        setShowModal(!showModal)

    }

    // Fonction pour supprimer un commentaire
    const handleDeleteComment = async () => {
        try {
            await deleteComment(id)
            refreshPage()
        }
        catch (err) {
            console.log(err)
        }
    }

    function updateOptions() {
        if (!options.type) return handleOptions({ type: "comment", id });
        if (options.id !== id) return handleOptions({ type: "comment", id });
        handleOptions({});
    }
    return (

        <div>
            {showModal ? <div className={showModal ? "update-modal " : "hidden"}>
            <UpdateComment 
            id = {id}
            message = {message}
            author = {author}
            isModalOpen = {showModal}
            closeModal = {toggleModal}

            
            />
            </div>
                : <div className="comment-container">
                    <div className="comment-header">
                        <p className="comment-header--author">{author}</p>
                        <div className={isAuthorized ? "options" : "hidden"}>
                            <FontAwesomeIcon icon={faEllipsis} className="icon" onClick={updateOptions} />
                            {visibleOptions && <Options delete={handleDeleteComment} update={toggleModal}/>}
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