
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}




function setToken(token) {
    headers.Authorization = 'Bearer ' + token;
    localStorage.setItem('token', token)
    alert('ok')
}



async function signIn(dataLogin) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(dataLogin),
        headers
    })
    const data = await response.json();
    setToken(data.token);
    

    return data;

}


async function signUp(dataSignUp) {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: 'POST',
        body: JSON.stringify(dataSignUp),
        headers,

    })
    const data = response.json();
    return data;
}

async function getPosts() {
    console.log(headers);
    const response = await fetch("http://localhost:3000/api/posts", { headers })
    const posts = await response.json()
    return posts

}


async function getOnePost(id){
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {headers})
    const post = await response.json();
    return post
}


async function addPost(formData) {
    const response = await fetch("http://localhost:3000/api/posts", {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': '*/*',
            'Authorization': headers.Authorization
        }
    })
    const data = await response.json()
    return data
}


async function updatePost(formData, id){
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
            'Accept': '*/*',
            'Authorization': headers.Authorization
        }
    })
    const data = await response.json()
    return data
}


async function deletePost(id) {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
        headers
    });
    const data = await response.json()
    console.log(data)
}



/**
 * @param {Boolean} like
 * @param {Number} id
 */
async function likePost(like, id) {
    const response = await fetch(`http://localhost:3000/api/posts/${id}/like`, {
        method: 'POST',
        body: JSON.stringify({ like: like ? 0 : 1 }),
        headers
    })
    const data = await response.json();
    console.log(data)
}


async function addComment(comment, id) {
    const response = await fetch(`http://localhost:3000/api/posts/${id}/comment`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers
    })
    const data = await response.json();
    console.log(data)
}

async function deleteComment(id){
    const response = await fetch(`http://localhost:3000/api/posts/comment/${id}`, {
        method: 'DELETE',
        headers
    })
    const data = await response.json();
    console.log(data)
}

function refreshPage() {
    window.location.reload()
}

module.exports = { signIn, signUp, getPosts, addPost, likePost,  addComment, deletePost, deleteComment, refreshPage, getOnePost, updatePost }