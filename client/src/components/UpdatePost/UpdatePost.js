import { React, useState } from "react";

// API
import { updatePost } from "../../services/api";

// Composant
import Error from "../Error/Error";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const UpdatePost = (props) => {

    const [img, setImg] = useState("")
    const [message, setMessage] = useState(props.message);
    const [showError, setShowError] = useState(null);

    const { updateCard, id, author, updateOptions, toggleModal, picture} = props

   

    // Envoi du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('message', message)
        if (img !== "") {
            formData.append('picture', img, img.name);
        }

        try {
            const data = await updatePost(formData, id)
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

    // Fonction pour fermer le composant et ne plus afficher les options
    const closeComponent = () => {
        toggleModal();
        updateOptions()
    }

    // On passe le state de showError à null pour fermer le composant Error
    const toggleError = () => {
        setShowError(null)
    }

   // Si une erreur est retournée par l'API, on l'affiche dans le composant Error
    if (showError !== null) return <Error errorData={showError} toggleError={toggleError}/>;
    return (
        <div className="card">
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="card-content--header-author">
                    <p>{author}</p>
                    <button onClick={closeComponent} title="Fermer la fenêtre de modification du post"><FontAwesomeIcon icon={faXmark} className="icon"  /></button>
                </div>

                <textarea
                    className="message-field"

                    name="message"
                    id="message"
                    placeholder="Ajouter un message ..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}> </textarea>

                <div className="card-content--image-container">
                    <img src={picture} alt="" className="card-content--image" />
                </div>

                <label htmlFor="file-update" className="file-upload">{picture ? "Modifier l'image" : "Ajouter une image"} <FontAwesomeIcon icon={faImage} className="file-upload-icon" /></label>
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

                <br/>

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