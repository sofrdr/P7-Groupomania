import React, { useEffect, useState } from "react";
import { likePost, getUserInfos } from "../../../services/api";
import "./Card.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';




const Card = (props) => {


    const [showModal, setShowModal] = useState(false)
    
    const [user, setUser] = useState("")
    const [like, setLike] = useState(0)

    const postId = props.id
    const usersLike = props.usersLiked
    console.log(usersLike)


    useEffect(() => {
        const data = getUserInfos();
        setUser(data)
        
    }, [])

    console.log(user)

     const handleLike =  async () => {
        like === 0 ? setLike(1) : setLike(0);
        console.log({like: like, id: postId})
        try{
            await likePost({like : like}, postId)
        }
        catch(err){
            console.log(err)
        } 

    }

    return (
        <article className="card">

            <div className="card-content">

                <div >
                    <div className="card-content--header-author">
                        <p>{props.author} </p>
                        <FontAwesomeIcon icon={faEllipsis} className="icon"/>
                    </div>

                    <p>{props.date}</p>
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
                        <FontAwesomeIcon icon={faComment} className="icon"/>
                        {props.numberOfComments}
                    </div>
                </div>

                <div className="card-comments">
                    {props.comments}
                    <p onClick={props.handleComments} className="card-comments--onclick">
                        {props.showAllComments ? "Voir moins de commentaires" : "Voir tous les commentaires"}</p>
                </div>
            </div>


        </article>
    )




}



export default Card