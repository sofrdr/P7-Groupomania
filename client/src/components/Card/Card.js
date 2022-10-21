/**
 * @typedef {import("../Post/Posts.js").showOptions} showOptions
 */

import React, { useState } from "react";


import { likePost, deletePost } from "../../services/api";
import Options from "../Options/Options";
import AddComment from "../AddComment/AddComment";
import UpdatePost from "../UpdatePost";
import Error from "../Error/Error";
import "./Card.scss";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

// Day.js
import dayjs from 'dayjs';
import localeObject from "../../services/fr"
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale('fr', localeObject)

const Card = (props) => {

    const { handleOptions, options, id, user, date, author, comments, handleComments, showAllComments, numberOfComments, createComment, removePost, windowWidth } = props;

    const [addComment, setAddComment] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false)
    const [showAllText, setShowAllText] = useState(false)
    const [message, setMessage] = useState(props.message)
    const [image, setImage] = useState(props.picture)
    const [showError, setShowError] = useState(null)

   
    const userId = user.id
    const pseudo = user.pseudo

    const usersLike = props.usersLiked
    const initiallyLiked = usersLike.includes(userId)
    const [like, updateLike] = useState(initiallyLiked);
    const likes = props.likes - (initiallyLiked ? 1 : 0);
    let count = likes + (like ? 1 : 0);


    // Au clic, si la valeur de like était 0 elle passe à 1 (l'utilisateur ajoute un like)
    // si la valeur de like était à 1 elle passe à 0 (l'utilisateur retire son like)
    const handleLike = async () => {
        console.log({ like: like, id: id })
        try {
            updateLike(!like);
            await likePost(like, id)
        }
        catch (err) {
            console.log(err)
            setShowError(err)
        }

    }


    // isAuthorized = true si l'auteur du post est l'utilisateur connecté
    const isAuthorized = pseudo === author

    const visibleOptions = options.type === "post" && options.id === id;


    function updateOptions() {
        if (!options.type) return handleOptions({ type: "post", id });
        if (options.id !== id) return handleOptions({ type: "post", id });
        handleOptions({});
    }

    /* Fonction pour supprimer un post  */
    const handleDeletePost = async () => {
        try {
            await deletePost(id);
            removePost(id)

        } catch (err) {
            console.log(err)
            setShowError(err)
        }
    }


    const toggleError = () => {
        setShowError(null)
    }

     // Fonction qui change le state de showUpdate pour afficher ou non la fenêtre de modification du post (composant UpdatePost)
     const toggleModal = () => {
        setShowUpdate(!showUpdate)
    }

    function updateCard({newImg, newMessage}){
              
        toggleModal();
        setImage(newImg)
        setMessage(newMessage)
    }

   
    // Fonction qui change le state addComment pour afficher ou non le champ pour ajouter un commentaire (composant AddComment)
    const toggleAddComment = () => {
        setAddComment(prevAddComment => !prevAddComment)
    }


    // Fonction qui change le state showAllText pour affciher ou non le post en entier
    const displayText = () => {
        setShowAllText(prevShowAllText => !prevShowAllText)
    }

    

    if (showError !== null) return <Error errorData={showError} />;
    return (

        // Si showUpdate = true alors on affiche le composant de modification du post (UpdatePost) sinon on affiche le post
        <div  >
            {showUpdate ? <div className={showUpdate ? "update-modal " : "hidden"}>

                <UpdatePost
                    id={id}
                    message={message}
                    author={author}
                    picture={image}
                    isModalOpen={showUpdate}
                    closeModal={toggleModal}
                    updateCard={updateCard}
                    updateOptions={updateOptions}
                    toggleError={toggleError}
                    

                /></div>

                :
                <article className="card">
                    <div className="card-content">

                        <div >
                            <div className="card-content--header-author">
                                <p>{author} </p>

                                {/* L'icône des options est affichée seulement si l'utilisateur est autorisé à modifier ou supprimer  */}
                                <div className={isAuthorized ? "options" : "hidden"} >
                                    <FontAwesomeIcon icon={faEllipsis} className="icon" onClick={updateOptions} />
                                    {visibleOptions &&
                                        <Options
                                            update={toggleModal}
                                            delete={handleDeletePost}
                                            context="card"

                                        />}

                                </div>
                            </div>

                            <p>{dayjs(date).fromNow()}</p>

                        </div>
                        {/* Si le post a plus de 500 caractères et que showAllText = false, on affiche seulement les 15 premières lignes avec "text-hidden" 
                              et le bouton qui permet d'afficher plus ou de réduire le texte */}
                        <p className={(message.length > 500 && showAllText === false) ? "card-content--message text-hidden"
                            : "card-content--message"}>{message}</p>
                        {message.length > 500 && <div className="card-content--message_display" onClick={displayText}>{showAllText ? "Réduire"
                            : "Afficher plus"}</div>}

                        <div className="card-content--image-container">
                            <img src={image} alt="" className="card-content--image" />
                        </div>

                        <div className="card-content--indicators">
                            <div className="card-content--indicators-elt">
                                <div >
                                    <FontAwesomeIcon icon={faHeart} className={like ? "hidden" : "icon"} onClick={handleLike} />
                                    <FontAwesomeIcon icon={faHeartSolid} className={like ? "icon heart-filled " : " hidden"} onClick={handleLike} />
                                    {count}
                                </div>

                            </div>
                            <div className="card-content--indicators-elt">
                                <FontAwesomeIcon icon={faComment} className="icon" onClick={toggleAddComment} />
                                {numberOfComments}
                            </div>
                        </div>


                        <div className="card-comments">
                            {addComment && 
                            <AddComment 
                            id={id}
                            windowWidth={windowWidth} 
                            createComment={createComment}                          
                            toggleAddComment={toggleAddComment}
                            toggleError={toggleError}
                             />}
                            {comments}
                            {comments.length < 3 ? "" : <p onClick={handleComments} className="card-comments--onclick">
                                {showAllComments ? "Voir moins de commentaires" : "Voir tous les commentaires"}</p>}

                        </div>
                    </div>
                </article>
            }



        </div>


    )




}



export default Card