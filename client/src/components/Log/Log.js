import React, { useState } from "react"

// Composants
import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"

// Sass
import "./Log.scss"


import logo from "../../assets/icon-left-font.svg"

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
            <img src={logo} alt="logo groupomania" />
            <div className="form">
                <ul className="form-selectors">
                    <li  className="form-selectors-items"  ><button id="register"  onClick={handleConnection}   className={signUpModal ? "form-selectors_btn--focus" : "form-selectors_btn"}>S'inscrire</button></li>
                    <li   className="form-selectors-items"  ><button id="login"   onClick={handleConnection}  className={signInModal ? "form-selectors_btn--focus" : "form-selectors_btn"}>Se connecter</button></li>
                </ul>
                
                {signInModal && <SignIn/>} 
                {signUpModal && <SignUp/>}
            </div>

        </div>
    );
}

export default Log;