import React, { useState } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";

// API
import { addComment } from "../../services/api";

// Component
import Error from "../Error/Error";

// Sass
import "./AddComment.scss"



const AddComment = (props) => {

    const [message, setmessage] = useState("")
    const [showError, setShowError] = useState(null);

    const postId = props.id
    const { createComment, toggleAddComment, windowWidth} = props

    
    // Le state message est modifié à chaque saisie de l'utilisateur
    const handlemessage = (e) => {
        setmessage(e.target.value)
    }

    // On passe le state de showError à null pour fermer le composant Error
    const toggleError = () => {
        setShowError(null)
    }


    // Envoi du formulaire à l'API
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await addComment({ message }, postId)
            const newComment = data.newComment
            // Si le champ message n'est pas vide, le nouveau commentaire est ajouté et le composant AddComment se ferme
            if (message !== "") {
                createComment(postId, newComment)
                toggleAddComment()
            }

        } catch (err) {
            setShowError(err);
        }
    }
    if (showError !== null) return <Error errorData={showError} toggleError={toggleError} />;
    return (
        <div className="comment-container new-comment">
            <form onSubmit={handleSubmit}>
                <input
                    className="new-comment-content"
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Laissez un commentaire ..."
                    value={message}
                    onChange={handlemessage}
                />

                {/* Si l'écran est < 992 px on ajoute une icone qui au clic envoie le commentaire */}
                {windowWidth < 992 && <FontAwesomeIcon icon={faShareFromSquare} className="icon new-comment-icon" onClick={handleSubmit}/>}
            </form>

        </div>
    )

}

export default AddComment