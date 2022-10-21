import React, { useState } from "react"
import { signUp } from "../../services/api";
import SignIn from "../SignIn/SignIn";
import './SignUp.scss'


const SignUp = () => {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        pseudo: ""
    })
    const [errorMsg, setErrorMsg] = useState("");
    const [isFormSend, setIsFormSend] = useState(false)


    

    // Fonction pour envoyer les données au back à la validation du formulaire
    async function handleSignUp(e) {

        e.preventDefault();
        try {
            const data = await signUp(formData)
            console.log(data.error)

            /* Si la réponse contient une erreur alors on enregistre cette erreur dans errorMsg
            Si aucune erreur on passe isFormSend à true */ 
            if (data.error) {
                setErrorMsg(data.error)
            } else {
                setIsFormSend(true)
            }
        }
        catch (err) {
            console.log(err)
        }


    }

    /**
     * [Actualiser la valeur des champs à chaque changement ]
     *
     * @param   {Object}  e  [Event]
     *
     * @return  {Object}     [formData : email, password, pseudo]
     */
    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <div className="signup">           
            {isFormSend ? (
                <div>
                    <SignIn />
                    <p className="signup-confirm">Le compte a bien été créé, veuillez vous connecter</p>
                </div>
            )
                : (<form id="signup-form" onSubmit={handleSignUp}>
                    <label htmlFor="email">Email</label>
                    
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        // On enregistre la nouvelle valeur de la variable email à chaque modification du champ
                        onChange={handleChange}
                        value={formData.email}
                        className="form-input"
                    />

                    
                    <label htmlFor="pseudo">Pseudo</label>
                   

                    <input
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        // On enregistre la nouvelle valeur de la variable email à chaque modification du champ
                        onChange={handleChange}
                        value={formData.pseudo}
                        className="form-input"
                    />
                    
                    <label htmlFor="password">Mot de passe</label>
                    
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // On enregistre la nouvelle valeur de la variable password à chaque modification du champ
                        onChange={handleChange}
                        value={formData.password}
                        className="form-input"
                    />
                    
                    <input type="submit" value="Créer un compte" className="btn btn-log"/>
                    <p className="signup-error-msg">{errorMsg}</p>
                </form>)}

        </div>
    )
}

export default SignUp