import { React, useState } from "react";
import { updatePost } from "../../services/api";

import Error from "../Error/Error";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const UpdatePost = (props) => {

    const [img, setImg] = useState("")
    const [image, setImage] = useState(props.picture)
    const [message, setMessage] = useState(props.message);
    const [showError, setShowError] = useState(null);

    const { updateCard, id, author, updateOptions } = props

   


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('message', message)
        if (img !== "") {
            formData.append('picture', img, img.name);
        }

        try {
            const data = await updatePost(formData, id)
            console.log(data.newPost)
            const newMessage = data.newPost.message
            
            const newImg = data.newPost.picture
            updateCard({
                newMessage,
                newImg
            })
            updateOptions()
        
        }
        catch (err) {
            console.log(err)
            setShowError(err)
        }

    }

   
    if (showError !== null) return <Error errorData={showError} />;
    return (
        <div className="card">
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="card-content--header-author">
                    <p>{author}</p>
                    <FontAwesomeIcon icon={faXmark} className="icon" onClick={props.isModalOpen && props.closeModal} />
                </div>

                <textarea
                    className="message-field"

                    name="message"
                    id="message"
                    placeholder="Ajouter un message ..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}> </textarea>
                <br />

                <div className="card-content--image-container">
                    <img src={image} alt="" className="card-content--image" />
                </div>

                <label htmlFor="file-update" className="file-upload">{image ? "Modifier l'image" : "Ajouter une image"} <FontAwesomeIcon icon={faImage} className="file-upload-icon" /></label>
                <input
                    className="file-add"
                    type="file"
                    id="file-update"
                    name="picture"
                    onChange={(e) => setImg(e.target.files[0])}

                />

                {img !== "" && <div className="file-remove">
                    <p>{img.name}</p>
                    <FontAwesomeIcon icon={faXmark} className="file-remove--icon" onClick={() => setImg("")} />
                </div>}



                <br />


                <input
                    type="submit"
                    value="Modifier la publication"
                    className="btn"

                />
            </form>
        </div>
    )
}

export default UpdatePost