import { React, useState } from "react";

// API
import { updateComment } from "../../services/api";

// Composant
import Error from "../Error/Error";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";

const UpdateComment = (props) => {


    const [message, setMessage] = useState(props.message)
    const [showError, setShowError] = useState(null)

    const { author, id, updateMessage, windowWidth, updateOptions, toggleModal } = props


    // On passe le state de showError à null pour fermer le composant Error
    const toggleError = () => {
        setShowError(null)
    }

    // Fonction pour fermer le composant et ne plus afficher les options
    const closeComponent = () => {
        toggleModal();
        updateOptions()
    }

    // Envoi du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateComment({ message }, id)
            // Si le nouveau commentaire n'est pas vide on actualise la valeur de message
            if (message !== "") {
                updateMessage(message)
            }
            updateOptions()

        } catch (err) {
            console.log(err)
            setShowError(err)
        }
    }

    // Si une erreur est retournée par l'API, on l'affiche dans le composant Error
    if (showError !== null) return <Error errorData={showError} toggleError={toggleError} />;
    return (
        <div className="comment-container new-comment ">
            <form onSubmit={handleSubmit}>
                <div className="comment-header">
                    <p className="comment-header--author"> {author}</p>
                    <button title="Fermer la fenêtre de modification du commentaire" onClick={closeComponent}><FontAwesomeIcon icon={faXmark} className="icon" /></button>
                </div>

                <input
                    className="new-comment-content"
                    type="text"
                    id="updateMessage"
                    name="updateMessage"
                    placeholder="Laissez un commentaire ..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                {/* Si l'écran est < 992 px on ajoute une icone qui au clic envoie le commentaire */}
                {windowWidth < 992 && <FontAwesomeIcon icon={faShareFromSquare} className="icon new-comment-icon" onClick={handleSubmit} />}
            </form>



        </div>
    )

}

export default UpdateComment