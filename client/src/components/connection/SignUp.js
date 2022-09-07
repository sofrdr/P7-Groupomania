import React, { useState } from "react"
import { signUp } from "../../api";
import SignIn from "./SignIn";


const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isFormSend, setIsFormSend] = useState(false)

    // Data à envoyer au back
    const dataSignUp = {
        email,
        password, 
        pseudo
    }





    // Fonction pour envoyer les données au back à la validation du formulaire
    async function handleSignUp(e) {

        e.preventDefault();
        try {
            const data = await signUp(dataSignUp)
            console.log(data)

            if (data.error) {
                setErrorMsg(data.error)
            } else {
                setIsFormSend(true)
            }
        }
        catch (err) {
            console.error(err)
        }


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
                    <input
                        type="email"
                        id="email"
                        name="email"
                        // On enregistre la nouvelle valeur de la variable email à chaque modification du champ
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        // On enregistre la nouvelle valeur de la variable email à chaque modification du champ
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />

                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // On enregistre la nouvelle valeur de la variable password à chaque modification du champ
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <input type="submit" value="Créer un compte" />
                    <div className="signup-error-msg">{errorMsg}</div>
                </form>)}

        </div>
    )
}

export default SignUp