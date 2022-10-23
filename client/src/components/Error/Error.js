import { useNavigate } from "react-router-dom";
import React from "react";
import './Error.scss'

/**
 * @param {Object} props
 * @param {Object} props.errorData
 * @param {String} props.errorData.messageToShow
 * @param {Boolean} [props.errorData.redirect]
 */
const Error = (props) => {
    const { messageToShow, redirect } = props.errorData;
    const {toggleError} = props
    const navigate = useNavigate()

    // Au clic si redirect === false alors on ferme le composant Error sinon on redirige l'utilisateur à la page de connexion
    const click = () => {
        if (!redirect) {
            toggleError();
        } else {
            navigate("/");
        }

    }
    return (
        <div className="error-modal" >
            <div className="error-modal_content">
                {messageToShow}
                <button onClick={click} className="error-modal_content--btn">Ok</button>
            </div>
        </div>
    )
}

export default Error