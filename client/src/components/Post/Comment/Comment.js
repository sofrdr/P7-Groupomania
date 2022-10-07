import {React, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Options from "../Options/Options";
import { deleteComment, refreshPage } from "../../../services/api";
import "./Comment.scss"

const Comment = (props) => {

    const [showOptions, setShowOptions] = useState(false)

    const commentId = props.id;

    const handleOptions = () => {
        setShowOptions(prevShowOptions => !prevShowOptions)
    }

    const handleDeleteComment = async () => {
        try{
            await deleteComment(commentId)
            refreshPage()
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="comment-container">
            <div className="comment-header">
                <p className="comment-header--author">{props.author}</p>
                <div className="options">
                    <FontAwesomeIcon icon={faEllipsis} className="icon" onClick={handleOptions} />
                    {showOptions && <Options delete={handleDeleteComment}/>}
                </div>
            </div>


            <div className="comment-content">
                <p>{props.message}</p>
                <p>{props.date}</p>
            </div>


        </div>
    )
}

export default Comment