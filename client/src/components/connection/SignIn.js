import React, {useState} from "react"

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dataLogin = {
        email,
        password
    }

    
    const handleSignIn = (e) => {
        
        e.preventDefault();
        fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            body: JSON.stringify(dataLogin),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => console.error(err)) 
    }
    return(
        <div>
            <form onSubmit={handleSignIn}>
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
                <input type="submit" value="Se connecter"/>
            </form>
        </div>
    )
}

export default SignIn