
 const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
 }

 

 let user; 

 function setToken(token){
  headers.Authorization= 'Bearer '+token;
  localStorage.setItem('token', token)
  alert('ok')
 }

 function getUserInfos(){
  return user;
 }

 async function signIn(dataLogin) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(dataLogin),
        headers
    })
    const data = await response.json();
    setToken(data.token);
    user = data.user;
    
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

async function getPosts(){
  console.log(headers);
    const response = await fetch("http://localhost:3000/api/posts", {headers})
    const posts = await response.json()
    return posts
    
}


async function addPostMessage(message){
    const response = await fetch("http://localhost:3000/api/posts", {
        method: 'POST',
        body: JSON.stringify(message),       
        headers : {
            'Accept': 'application/json',
            'Content-Type': ' application/json',
            'Authorization': headers.Authorization
        }       
})
const data = await response.json()
return data
}

async function addPostData(formData){
    const response = await fetch("http://localhost:3000/api/posts", {
        method: 'POST',
        body: formData,    
        headers : {
            'Accept': '*/*',
            //'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Authorization': headers.Authorization
        }       
})
const data = await response.json()
return data
}

/**
 * @param {Boolean} like
 * @param {Number} id
 */
async function likePost(like, id){
    const response = await fetch(`http://localhost:3000/api/posts/${id}/like`, {
        method: 'POST',
        body: JSON.stringify({like : like ? 0 : 1}),
        headers
    })
    const data = await response.json();
    console.log(data)
}


async function addComment(comment, id){
    const response = await fetch(`http://localhost:3000/api/posts/${id}/comment`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers
    })
    const data = await response.json();
    console.log(data)
}

module.exports = {signIn, signUp, getPosts, addPostMessage, addPostData, likePost, getUserInfos, addComment}