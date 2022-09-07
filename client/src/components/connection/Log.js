import React, { useState } from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

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
            <div className="form-container">
                <ul>
                    <li id="register" onClick={handleConnection}>S'inscrire</li>
                    <li id="login" onClick={handleConnection}>Se connecter</li>
                </ul>
                
                {signInModal && <SignIn/>} 
                {signUpModal && <SignUp/>}
            </div>

        </div>
    );
}

export default Log;