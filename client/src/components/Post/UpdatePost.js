import { React, useEffect, useState } from "react";
import { refreshPage, updatePost } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const UpdatePost = (props) => {



    const [img, setImg] = useState("")
    const id = props.id
    const author = props.author
    const image = props.picture
    const [message, setMessage] = useState(props.message);


    console.log(img)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('message', message)
        if (img !== "") {
            formData.append('picture', img, img.name);
        }

        try {
            await updatePost(formData, id)
            refreshPage()

        }
        catch (err) {
            console.log(err)
        }

    }

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
                    placeholder={`Quoi de neuf aujourd'hui ${props.user} ?`}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}> </textarea>
                <br />

                <div className="card-content--image-container">
                    <img src={image} alt="" className="card-content--image" />
                </div>

                <label htmlFor="file-update" className="file-upload">{image ? "Modifier l'image" : "Ajouter une image"} <FontAwesomeIcon icon={faImage} className="file-upload-icon" /></label>
                <input
                    className="addFile"
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