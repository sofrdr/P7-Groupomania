import React, { useState } from "react";
import { addPost } from "../../../services/api";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import "./CreatePost.scss"

const CreatePost = (props) => {

    const [message, setMessage] = useState("");
    const [img, setImg] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { createPost } = props;

    const removeImgName = () => {
        setImg("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('message', message)
        if (img !== "") {
            formData.append('picture', img, img.name);
        }

        try {
            const data = await addPost(formData)
            if (data.error) {
                setErrorMessage(data.error)
                setMessage("")
            } else {
                const newPost = data.newPost
                createPost(newPost)
                removeImgName();
                setMessage("");
                setErrorMessage("");
            }

        }
        catch (err) {
            console.log(err)
        }

    }


    return (
        <div className="card addpost">
            <form method="post" onSubmit={handleSubmit} encType="multipart/form-data" >
                <textarea
                    className="message-field"

                    name="message"
                    id="message"
                    placeholder={`Quoi de neuf aujourd'hui ${props.user} ?`}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}> </textarea>


                <br />

                <label htmlFor="file" className="file-upload">Ajouter une image ... <FontAwesomeIcon icon={faImage} className="file-upload-icon" /></label>
                <input
                    className="file-add"
                    type="file"
                    id="file"
                    name="picture"
                    onChange={(e) => setImg(e.target.files[0])}

                />


                {img !== "" && <div className="file-remove">
                    <p>{img.name}</p>
                    <FontAwesomeIcon icon={faXmark} className="file-remove--icon" onClick={removeImgName} />
                </div>}

                <br />
                <input
                    type="submit"
                    value="Publier"
                    className="btn"

                />

                {errorMessage !== "" && <p className="errormsg">{errorMessage}</p>}
            </form>


        </div>
    )



}

export default CreatePost