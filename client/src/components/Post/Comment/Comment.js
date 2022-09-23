import {React, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Options from "../Options/Options";
import "./Comment.scss"

const Comment = (props) => {

    const [showOptions, setShowOptions] = useState(false)

    const handleOptions = () => {
        setShowOptions(prevShowOptions => !prevShowOptions)
    }

    return (
        <div className="comment-container">
            <div className="comment-header">
                <p className="comment-header--author">{props.author}</p>
                <div className="options">
                    <FontAwesomeIcon icon={faEllipsis} className="icon" onClick={handleOptions} />
                    {showOptions && <Options />}
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