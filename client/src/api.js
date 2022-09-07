
 async function signIn(dataLogin) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(dataLogin),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json();
    return data;

}


async function signUp(dataSignUp) {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: 'POST',
        body: JSON.stringify(dataSignUp),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json();
    return data;

}

module.exports = {signIn, signUp}