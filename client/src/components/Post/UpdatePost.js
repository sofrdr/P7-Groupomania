import {React, useEffect, useState} from "react";
import { getOnePost, updatePost } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const UpdatePost = (props) => {

    
    
    const [img, setImg] = useState("")
    const id = props.id
    const author = props.author
    const picture = props.picture
    
    const [message, setMessage] = useState(props.message);





  const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('message', message)
        if (img !== "") {
            formData.append('picture', img, img.name);
        }

        try {
            await updatePost(formData, id)
            
        }
        catch (err) {
            console.log(err)
        }

    } 

    return(
        <div className="card">
        <form method="post" encType="multipart/form-data">
        <div className="card-content--header-author">
           <p>{author}</p> 
           <FontAwesomeIcon icon={faXmark} className="icon" onClick={props.isModalOpen && props.closeModal}/>
        </div>
            
            <input
                className="message-field"
                type="text"
                name="message"
                id="message"               
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <br />

            <div className="card-content--image-container">
                    <img src={picture} alt="" className="card-content--image" />
                </div>

            <label htmlFor="file" className="file-upload">Modifier l'image ... <FontAwesomeIcon icon={faImage} className="file-upload-icon"/></label>
            <input
                className="addFile"
                type="file"
                id="file"
                name="picture"
                onChange={(e) => setImg(e.target.files[0])}

            />

            <br />
            <input
                type="submit"
                value="Modifier la publication"
                className="btn"

            />
        </form></div>
    )
}

export default UpdatePost