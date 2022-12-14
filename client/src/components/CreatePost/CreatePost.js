import React, { useState } from "react";

// API
import { addPost } from "../../services/api";

// Composant
import Error from "../Error/Error";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// Sass
import "./CreatePost.scss"

const CreatePost = (props) => {

    const [message, setMessage] = useState("");
    const [img, setImg] = useState("")
    const [showError, setShowError] = useState(null);


    const { createPost } = props;

    // Fonction pour réinitialiser le state img et message
    const removeData = () => {
        setImg("");
        setMessage("");
    }

    // On passe le state de showError à null pour fermer le composant Error
    const toggleError = () => {
        setShowError(null)
    }

    // Envoi du formulaire de création de post à l'API
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('message', message)
        if (img !== "") {
            formData.append('picture', img, img.name);
        }

        try {
            const data = await addPost(formData)
            const newPost = data.newPost
            createPost(newPost)
            removeData();
        }
        catch (err) {
            console.log(err)
            setShowError(err)
        }

    }

    // Si une erreur est retournée par l'API, on l'affiche dans le composant Error
    if (showError !== null) return <Error errorData={showError} toggleError={toggleError} />;
    return (
        <div className="card addpost">
            <form method="post" onSubmit={handleSubmit} encType="multipart/form-data" >
                <label htmlFor="message" className="hidden">Message</label>
                <textarea
                    className="message-field"
                    name="message"
                    id="message"
                    placeholder={`Quoi de neuf aujourd'hui ${props.user} ?`}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                >
                </textarea>


                <br />

                <label htmlFor="file" className="file-upload" >Ajouter une image ... <FontAwesomeIcon icon={faImage} className="file-upload-icon" /></label>
                <input
                    className="file-add"
                    type="file"
                    id="file"
                    name="picture"
                    onChange={(e) => setImg(e.target.files[0])}

                />


                {img !== "" && <div className="file-remove">
                    <p>{img.name}</p>
                    <button onClick={() => setImg("")}><FontAwesomeIcon icon={faXmark} className="file-remove--icon" /></button>
                </div>}

                <br />
                <input
                    type="submit"
                    value="Publier"
                    className="btn"

                />
            </form>


        </div>
    )



}

export default CreatePost