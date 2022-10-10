import { React,  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateComment, refreshPage } from "../../services/api";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const UpdateComment = (props) => {


    const [message, setMessage] = useState(props.message)

    const {author, isModalOpen, id} = props
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await updateComment({message}, id)
            refreshPage()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="comment-container ">
            <form onSubmit={handleSubmit}>
            <div className="comment-header">
                    <p className="comment-header--author"> {author}</p>
                    <FontAwesomeIcon icon={faXmark} className="icon" onClick={isModalOpen && props.closeModal} />
                </div>

                <textarea
                className="new-comment-content"             
                type="text"
                id="updateMessage"
                name="updateMessage"
                placeholder="Laissez un commentaire ..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}>
                </textarea>
            </form>
            
        </div>
    )

}

export default UpdateComment