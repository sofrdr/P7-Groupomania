import React, { useState } from "react"
import { Navigate } from "react-router-dom";

// API
import { signIn } from "../../services/api";

// Sass
import './SignIn.scss'


const SignIn = () => {

    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loggedIn, setLoggedIn] = useState(false);


    // Fonction pour envoyer les données à l'API à la validation du formulaire

    async function handleSignIn(e) {

        e.preventDefault();

        try {
            const data = await signIn(formData)
            // On recupère dans la réponse l'objet user et on l'enregistre dans le localStorage
            const user = data.user
            localStorage.setItem("user", JSON.stringify(user))


            /* Si la réponse contient une erreur alors on enregistre cette erreur dans errorMsg
            Si aucune erreur on passe loggedIn à true */
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


    /**
     * [Actualiser la valeur des champs à chaque changement ]
     *
     * @param   {Object}  e  [Event]
     *
     * @return  {Object}     [formData : email, password]
     */
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    // Si l'utilisateur est bien connecté on le redirige vers la page home
    
    if (loggedIn) return <Navigate to='/home' />

    return (
        <div>
            <form onSubmit={handleSignIn} id="form-signin"  >
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

                <input type="submit" value="Se connecter" className="btn btn-log" />

                {/*Affichage des messages d'erreur ici */}
                {errorMsg && <p>{errorMsg}</p>}
            </form>
        </div>
    )
}




export default SignIn