import React, {  useState } from "react";


import { likePost } from "../../../services/api";
import Options from "../Options/Options";
import AddComment from "../AddComment/AddComment";
import "./Card.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)




const Card = (props) => {

    const [showOptions, setShowOptions] = useState(false)
    const [addComment, setAddComment] = useState(false)
    
    
    
    const date = props.date
    
    const postId = props.id
    const usersLike = props.usersLiked
    const userId = props.user
    
    // Si l'utilisateur aime déjà le post alors like = 1 sinon like = 0 
    let like; 
    if(usersLike.includes(userId)){
        like = 1;
    }else{
        like = 0;
    }

    
    // Au clic, si la valeur de like était 0 elle passe à 1 (l'utilisateur ajoute un like)
    // si la valeur de like était à 1 elle passe à 0 (l'utilisateur retire son like)
     const handleLike =  async () => {
        like === 0 ? like = 1 : like = 0;
        console.log({like: like, id: postId})
        try{
            await likePost({like : like}, postId)
        }
        catch(err){
            console.log(err)
        } 

    }

    const handleOptions = () => {
        setShowOptions(prevShowOptions => !prevShowOptions)

    }


    const handleAddComment = () => {
        setAddComment(prevAddComment => !prevAddComment)
    }
    

    return (
        <article className="card">

            <div className="card-content">

                <div >
                    <div className="card-content--header-author">
                        <p>{props.author} </p>
                        <div className="options">
                         <FontAwesomeIcon icon={faEllipsis} className="icon" onClick={handleOptions}/>
                        {showOptions && <Options/>}   
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
                        <FontAwesomeIcon icon={faHeart} className={like === 1 ? "icon heart-filled" : "icon"} onClick={handleLike}/>
                        {props.likes}
                    </div>
                    <div className="card-content--indicators-elt">
                        <FontAwesomeIcon icon={faComment} className="icon" onClick={handleAddComment}/>
                        {props.numberOfComments}
                    </div>
                </div>

                <div className="card-comments">
                    {addComment && <AddComment postId={postId}/>}
                    {props.comments}
                    {props.comments.length < 2 ? "" : <p onClick={props.handleComments} className="card-comments--onclick">
                        {props.showAllComments ? "Voir moins de commentaires" : "Voir tous les commentaires"}</p>}
                    
                </div>
            </div>


        </article>
    )




}



export default Card