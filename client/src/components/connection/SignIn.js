import React, { useState } from "react"
import {Navigate} from "react-router-dom";
import { signIn } from "../../services/api";


const SignIn = () => {

    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""

    })

    const [loggedIn, setLoggedIn] = useState(false);

   
    // Fonction pour envoyer les données au back à la validation du formulaire

    

    async function handleSignIn(e) {

        e.preventDefault();

        try {
            const data = await signIn(formData)
            
            console.log(data)
            

            if (data.error) {
                setErrorMsg(data.error)
            } else {
                setLoggedIn(true)
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

    if (loggedIn) return <Navigate to='/home' />

    return (
        <div>
            <form onSubmit={handleSignIn} id="form-signin">
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
                <input type="submit" value="Se connecter" />
                <div>{errorMsg}</div>
            </form>
        </div>
    )
}




export default SignIn