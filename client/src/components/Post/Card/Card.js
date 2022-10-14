/**
 * @typedef {import("../Posts.js").showOptions} showOptions
 */

import React, { useState } from "react";


import { likePost, deletePost, refreshPage } from "../../../services/api";
import Options from "../Options/Options";
import AddComment from "../AddComment/AddComment";
import UpdatePost from "../UpdatePost";
import "./Card.scss";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';

// Day.js
import dayjs from 'dayjs';
import localeObject from "../../../services/fr"
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale('fr', localeObject)



/**
 * @todo vérifier types
 * @params {Object} props
 * @params {String} props.key
 * @params {String} props.id
 * @params {String} props.user
 * @params {String} props.author
 * @params {String} props.date
 * @params {String} props.message
 * @params {String} props.picture
 * @params {String} props.likes
 * @params {String} props.usersLiked
 * @params {String} props.numberOfComments
 * @params {String} props.comments
 * @params {String} props.handleComments=
 * @params {String} props.showAllComments
 * @params {String} props.handleOptions
 * @params {showOptions} props.options
 */
const Card = (props) => {

    const {handleOptions, options, id, user, date, author} = props;
    const [addComment, setAddComment] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [showAllText, setShowAllText] = useState(false)
    const [message, setMessage] = useState(props.message)

    const visibleOptions = options.type === "post" && options.id===id;  
    console.log(typeof id)
   
    const usersLike = props.usersLiked
    
    const userId = user.id
    const pseudo = user.pseudo
    const isAuthorized = pseudo === author

    const initiallyLiked = usersLike.includes(userId)
    const [like, updateLike] = useState(initiallyLiked);
    const likes = props.likes - (initiallyLiked ? 1 : 0);
    let count = likes + (like ? 1 : 0);


    function updateOptions(){
        if (!options.type) return handleOptions({type:"post", id});
        if (options.id !== id) return handleOptions({type:"post", id});
        handleOptions({});
    }

    function updateMessage(message){
        toggleModal();
        setMessage(message)
    }


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
        }

    }

    // Fonction qui change le state de showModal pour afficher ou non la fenêtre de modification du post (composant UpdatePost)
    const toggleModal = () => {
        setShowModal(!showModal)

    }

    /* Fonction pour supprimer un post
    Paramètre : id du post
    Rafraîchissement de la page */
    const handleDeletePost = async () => {
        try {
            await deletePost(id)
            refreshPage()
        } catch (err) {
            console.log(err)
        }
    }

    // Fonction qui change le state addComment pour afficher ou non le champ pour ajouter un commentaire (composant AddComment)
    const toggleAddComment = () => {
        setAddComment(prevAddComment => !prevAddComment)
    }

    const displayText = () => {
        setShowAllText(prevShowAllText => !prevShowAllText)
    }

    return (

        // Si showModal = true alors on affiche la fenêtre de modification du post (composant UpdatePost) sinon on affiche le post
        <div >
            {showModal ? <div className={showModal ? "update-modal " : "hidden"}>

                <UpdatePost
                    id={id}
                    message={props.message}
                    author={props.author}
                    picture={props.picture}
                    isModalOpen={showModal}
                    closeModal={toggleModal}
                    updateMessage={updateMessage}
                    
                /></div>

                :
                <article className="card">
                    <div className="card-content">

                        <div > 
                            <div className="card-content--header-author">
                                <p>{author} </p>
                                <div className={isAuthorized ? "options" : "hidden"} >
                                    <FontAwesomeIcon icon={faEllipsis} className="icon" onClick={updateOptions} />
                                    {visibleOptions && 
                                    <Options 
                                    update={toggleModal} 
                                    delete={handleDeletePost} 
                                    toggleOptions={updateOptions}
                                    />}
                                    
                                </div>
                            </div>
                            <p>{dayjs(date).fromNow()}</p>
                        </div>
                                        
                        <p  className={(message.length > 500 && showAllText === false) ? "card-content--message text-hidden" : "card-content--message"}>{message}</p>
                        {message.length > 500 && <div className="card-content--message_display" onClick={displayText}>{showAllText ? "Réduire" : "Afficher plus"}</div>}                  
                        <div className="card-content--image-container">
                            <img src={props.picture} alt="" className="card-content--image" />
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
                                {props.numberOfComments}
                            </div>
                        </div>

                        
                        <div className="card-comments">                           
                            {addComment && <AddComment id={id} />}
                            {props.comments}
                            {props.comments.length < 3 ? "" : <p onClick={props.handleComments} className="card-comments--onclick">
                                {props.showAllComments ? "Voir moins de commentaires" : "Voir tous les commentaires"}</p>}

                        </div>
                    </div>
                </article>
            }



        </div>


    )




}



export default Card