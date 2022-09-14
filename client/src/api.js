
 const headers = {
    
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2MzA3NjE4OSwiZXhwIjoxNjYzMDc5Nzg5fQ.j-KIdIf6cAoHekodyCh7U7CvbdMdXZnoSK8qEzXuL_w'
 }
 
 
 async function signIn(dataLogin) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(dataLogin),
        headers
    })
    const data = response.json();
    
    return data;

}


async function signUp(dataSignUp) {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: 'POST',
        body: JSON.stringify(dataSignUp),
        headers
    })
    const data = response.json();
    return data;

}

async function getPosts(){
    const response = await fetch("http://localhost:3000/api/posts", headers)
    const posts = await response.json()
    return posts
    
}



module.exports = {signIn, signUp, getPosts}