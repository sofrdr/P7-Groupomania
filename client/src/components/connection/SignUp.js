import React, { useState } from "react"

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dataSignUp = {
        email,
        password
    }

    const handleSignUp = (e) => {
        
        e.preventDefault();
        fetch("http://localhost:3000/api/auth/signup", {
            method: 'POST',
            body: JSON.stringify(dataSignUp),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => console.error(err)) 
    }

    return(
        <div className="signup-form-container">
            <form id="signup-form" onSubmit={handleSignUp}>
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                id="email" 
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />

                <label htmlFor="password">Mot de passe</label>
                <input 
                type="password" 
                id="password" 
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
                <input type="submit" value="Créer un compte"/>
            </form>
        </div>
    )
}

export default SignUp