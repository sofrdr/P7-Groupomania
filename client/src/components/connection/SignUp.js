import React, { useState } from "react"
import { signUp } from "../../services/api";
import SignIn from "./SignIn";


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
            console.log(data)

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
        <div className="signup-form-container">
            {isFormSend ? (
                <div>
                    <SignIn />
                    <p>Le compte a bien été créé, veuillez vous connecter</p>
                </div>
            )
                : (<form id="signup-form" onSubmit={handleSignUp}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        // On enregistre la nouvelle valeur de la variable email à chaque modification du champ
                        onChange={handleChange}
                        value={formData.email}
                    />

                    <br />
                    <br />
                    <label htmlFor="pseudo">Pseudo</label>
                    <br />

                    <input
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        // On enregistre la nouvelle valeur de la variable email à chaque modification du champ
                        onChange={handleChange}
                        value={formData.pseudo}
                    />
                    <br />
                    <br />
                    <label htmlFor="password">Mot de passe</label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // On enregistre la nouvelle valeur de la variable password à chaque modification du champ
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <br />
                    <br />
                    <input type="submit" value="Créer un compte" />
                    <div className="signup-error-msg">{errorMsg}</div>
                </form>)}

        </div>
    )
}

export default SignUp