import React, { useState } from "react"
import { signIn } from "../../api";


const SignIn = () => {

    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""

    })

    const [token, setToken] = useState("")

    function setHeaders(){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
    }

    // Fonction pour envoyer les données au back à la validation du formulaire

    

    async function handleSignIn(e) {

        e.preventDefault();

        try {
            const data = await signIn(formData)
            setToken(data.token)
            console.log(data)
            

            if (data.error) {
                setErrorMsg(data.error)
            } else {
                window.location.assign("/home")
            }
        }
        catch (err) {
            console.error(err)
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