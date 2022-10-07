import React, { useState } from "react";


import { likePost, deletePost, refreshPage } from "../../../services/api";
import Options from "../Options/Options";
import AddComment from "../AddComment/AddComment";
import UpdatePost from "../UpdatePost";
import "./Card.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)




const Card = (props) => {

    const [showOptions, setShowOptions] = useState(false)
    const [addComment, setAddComment] = useState(false);
    const [showModal, setShowModal] = useState(false)



    const date = props.date

    const postId = props.id
    const usersLike = props.usersLiked
    const userId = props.user

    const initiallyLiked = usersLike.includes(userId)
    const [like, updateLike] = useState(initiallyLiked);
    const likes = props.likes - (initiallyLiked ? 1 : 0);
    let count = likes + (like ? 1 : 0);



    // Au clic, si la valeur de like était 0 elle passe à 1 (l'utilisateur ajoute un like)
    // si la valeur de like était à 1 elle passe à 0 (l'utilisateur retire son like)
    const handleLike = async () => {
        console.log({ like: like, id: postId })
        try {
            updateLike(!like);
            await likePost(like, postId)

        }
        catch (err) {
            console.log(err)
        }

    }

    // Fonction qui change le state showOptions pour afficher ou non la fenêtre avec les options de modification et suppression (composant Options)
    const handleOptions = () => {
        setShowOptions(prevShowOptions => !prevShowOptions)

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
            await deletePost(postId)
            refreshPage()
        } catch (err) {
            console.log(err)
        }
    }

    // Fonction qui change le state addComment pour afficher ou non le champ pour ajouter un commentaire (composant AddComment)
    const handleAddComment = () => {
        setAddComment(prevAddComment => !prevAddComment)
    }


    return (

        // Si showModal = true alors on affiche la fenêtre de modification du post (composant UpdatePost) sinon on affiche le post
        <div >
            {showModal ? <div className={showModal ? "update-modal " : "update-modal-hidden"}>

                <UpdatePost
                    id={postId}
                    message={props.message}
                    author={props.author}
                    picture={props.picture}
                    isModalOpen={showModal}
                    closeModal={toggleModal}
                /></div>

                :
                <article className="card">
                    <div className="card-content">

                        <div >
                            <div className="card-content--header-author">
                                <p>{props.author} </p>
                                <div className="options" >
                                    <FontAwesomeIcon icon={faEllipsis} className="icon" onClick={handleOptions} />
                                    {showOptions && <Options update={toggleModal} delete={handleDeletePost} />}
                                </div>
                            </div>
                            <p>{dayjs(date).fromNow()}</p>
                        </div>

                        <p className="card-content--message">{props.message}</p>

                        <div className="card-content--image-container">
                            <img src={props.picture} alt="" className="card-content--image" />
                        </div>

                        <div className="card-content--indicators">
                            <div className="card-content--indicators-elt">
                               <div >
                                <FontAwesomeIcon icon={faHeart} className={like ? "hidden" : "icon"} onClick={handleLike} />
                                <FontAwesomeIcon icon={faHeartSolid} className={like ? "icon heart-filled" : " hidden"} onClick={handleLike} />
                                {count}
                                </div> 
                                
                            </div>
                            <div className="card-content--indicators-elt">
                                <FontAwesomeIcon icon={faComment} className="icon" onClick={handleAddComment} />
                                {props.numberOfComments}
                            </div>
                        </div>

                        
                        <div className="card-comments">                           
                            {addComment && <AddComment postId={postId} />}
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