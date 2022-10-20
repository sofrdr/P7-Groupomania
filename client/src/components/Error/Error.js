import { useNavigate } from "react-router-dom";
import React from "react";
import './Error.scss'

/**
 * @param {Object} props
 * @param {Object} props.errorData
 * @param {String} props.errorData.messageToShow
 * @param {Boolean} [props.errorData.redirect]
 */
const Error = ({errorData}) =>{
    const {messageToShow, redirect} = errorData;
    const navigate = useNavigate()

    function click(){
        if (!redirect) return;
        navigate("/");
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