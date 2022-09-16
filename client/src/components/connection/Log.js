import React, { useState } from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import "./Log.scss"
import logo from "../../assets/icon-left-font.png"

const Log = () => {


const [signInModal, setSignInModal] = useState(true);
const [signUpModal, setSignUpModal] = useState(false);

// On modifie le state de signUpModal et signInModal pour afficher le bon composant au clic
const handleConnection = (e) => {
    if(e.target.id === "register"){
        setSignUpModal(true);
        setSignInModal(false);
    }
    if(e.target.id === "login"){
        setSignInModal(true);
        setSignUpModal(false);
    }
}


    return (
        <div className="log-container">
            <img src={logo} alt="logo groupomania" className="log-container--image" />
            <div className="form">
                <ul className="form-selectors">
                    <li id="register" className="form-selectors-items" onClick={handleConnection}>S'inscrire</li>
                    <li id="login"  className="form-selectors-items" onClick={handleConnection}>Se connecter</li>
                </ul>
                
                {signInModal && <SignIn/>} 
                {signUpModal && <SignUp/>}
            </div>

        </div>
    );
}

export default Log;