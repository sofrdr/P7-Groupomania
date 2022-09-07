import React, { useState } from "react"
import {signIn} from "../../api";

const SignIn = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


    // Data à envoyer au back
    const dataLogin = {
        email,
        password
    }

    // Fonction pour envoyer les données au back à la validation du formulaire
    async function handleSignIn(e) {

        e.preventDefault();

        try {
            const data = await signIn(dataLogin)
            console.log(data)

            if (data.error) {
                setErrorMsg(data.error)
            }else{
                window.location.assign("/home")
            }
        }
        catch (err) {
            console.error(err)
        }



    }

    return (
        <div>
            <form onSubmit={handleSignIn} id="form-signin">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    // On enregistre la nouvelle valeur de la variable email à chaque modification du champ
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
                <input type="submit" value="Se connecter" />
                <div>{errorMsg}</div>
            </form>
        </div>
    )
}

export default SignIn