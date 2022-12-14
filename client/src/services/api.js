
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}

// Fonction pour afficher des messages d'erreurs personnalisés selon le type d'erreur, renvoie un objet response
function errorHandler(err) {
    const response = {};
    switch (err) {
        case "Requête non authentifiée":  
            localStorage.clear();
            response.messageToShow = "La session a expiré, merci de vous reconnecter";
            response.redirect = true;
            break;
        case "Champ message vide":
            response.messageToShow = "Merci d'écrire un message ou de sélectionner une image";
            response.redirect = false;
            break;
        case "Message trop long": 
            response.messageToShow = "Le message dépasse les 60 000 caractères autorisés";
            response.redirect = false;
            break;
        case "Commentaire vide":
            response.messageToShow = "Merci de saisir un commentaire";
            response.redirect = false;
            break;
        case "Commentaire trop long":
            response.messageToShow = "Le commentaire dépasse les 8 000 caractères autorisés";
            response.redirect = false;
            break;
        default:
            response.messageToShow = "Une erreur s'est produite :(";
            response.redirect = false
            break;
    }
    throw response;
}

// ---------------------- USERS ------------------------------------------------------------------------------------

/**
 * [Ajouter le token à l'en-tête Authorization et l'enregister dans le localStorage]
 *
 * @param   {String}  token  [jwt]
 *
 * 
 */
function setToken(token) {
    headers.Authorization = 'Bearer ' + token;
    localStorage.setItem('token', token)

}


/**
 * [Identifier l'utilisateur]
 *
 * @param   {Object}  dataLogin  [email, password]
 *
 * @return  {Object}             [user: pseudo]
 */
async function signIn(dataLogin) {
    const response = await fetch("http://localhost:3001/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(dataLogin),
        headers
    })
    const data = await response.json();
    setToken(data.token);
    return data;

}

/**
 * [Créer un compte utilisateur]
 *
 * @param   {Object}  dataSignUp  [email, pseudo, password]
 *
 * @return  {Object}              [email, id]
 */
async function signUp(dataSignUp) {
    const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: 'POST',
        body: JSON.stringify(dataSignUp),
        headers,

    })
    const data = response.json();
    return data;
}



// --------------------------- POSTS -------------------------------------------------------------------------------

/**
 * [Afficher tous les posts]
 *
 * @return  {Array}  [Tous les posts enregistrés en BDD]
 */
async function getPosts() {

    const response = await fetch("http://localhost:3001/api/posts", { headers })
    const posts = await response.json()
    return posts

}

/**
 * [Ajouter un post]
 *
 * @param   {Object}  formData  [picture, message]
 *
 * @return  {Object}            [message : Confirmation de la création du post, newPost : nouveau post]
 */
async function addPost(formData) {
    try {
        const response = await fetch("http://localhost:3001/api/posts", {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': '*/*',
                'Authorization': headers.Authorization
            }
        })
        const data = await response.json()
        if (data.error) throw data.error;
        return data
    }
    catch (err) {
        errorHandler(err)
    }

}

/**
 * [Modifier un post]
 *
 * @param   {Object}  formData  [picture, message]
 * @param   {Number}  id        [id du post]
 *
 * @return {Object}           [message : Confirmation de la modification du post, newPost :  post modifié]
 *
 */
async function updatePost(formData, id) {
    try {
        const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
            method: 'PUT',
            body: formData,
            headers: {
                'Accept': '*/*',
                'Authorization': headers.Authorization
            }
        })
        const data = await response.json()
        if (data.error) throw data.error;
        return data
    }
    catch (err) {
        errorHandler(err)
    }
}

/**
 * [Supprimer un post]
 *
 * @param   {Number}  id  [id du post]
 *
 * @return {Object}       [message : Confirmation de la suppression du post]
 * 
 */
async function deletePost(id) {
    try{
        const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'DELETE',
        headers
    });
    const data = await response.json()
    if (data.error) throw data.error;

    }
    catch(err){
        errorHandler(err)
    }
}



/**
 * [Ajouter ou retirer un like à un post]
 * 
 * @param {Boolean} like
 * @param {Number} id       [id du post]
 * 
 * @return {Object}             [message : Confirmation de l'ajout ou du retrait du like']
 */
async function likePost(like, id) {
    try{
       const response = await fetch(`http://localhost:3001/api/posts/${id}/like`, {
        method: 'POST',
        body: JSON.stringify({ like: like ? 0 : 1 }),
        headers
    })
    const data = await response.json();
    if (data.error) throw data.error;
    }
    catch(err){
        errorHandler(err)
    }
}

// ------------------------------- COMMENTS -------------------------------------------------------------------


/**
 * [Ajouter un commentaire]
 *
 * @param   {String}  comment  [message]
 * @param   {Number}  id       [id du post]
 *
 * @return  {Object}           [message : Confirmation de l'ajout du commentaire, newComment : nouveau commentaire]
 */

async function addComment(comment, id) {
    try {
        const response = await fetch(`http://localhost:3001/api/posts/${id}/comment`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers
        })
        const data = await response.json();      
        if (data.error) throw data.error;
        return data
    }
    catch (err) {
        errorHandler(err);
    }
}


/**
 * [Supprimer un commentaire]
 *
 * @param   {Number}  id  [id du commentaire à supprimer]
 *
 * @return  {Object}      [message : Confirmation de la suppression]
 */
async function deleteComment(id) {
    try{
       const response = await fetch(`http://localhost:3001/api/posts/comment/${id}`, {
        method: 'DELETE',
        headers
    })
    const data = await response.json();
    if (data.error) throw data.error;
    }
    catch(err){
        errorHandler(err)
    }
}

/**
 * [Modifier un commentaire]
 *
 * @param   {String}  comment  [message]
 * @param   {Number}  id       [id du commentaire à modifier]
 *
 * @return  {Object}           [message : Confirmation de la modification]
 */
async function updateComment(comment, id) {
    try{
      const response = await fetch(`http://localhost:3001/api/posts/comment/${id}`, {
        method: 'PUT',
        body: JSON.stringify(comment),
        headers
    })
    const data = await response.json();
    if (data.error) throw data.error;
    }
    catch(err){
        errorHandler(err)
    }
}


module.exports = {
    signIn,
    signUp,
    getPosts,
    addPost,
    likePost,
    addComment,
    deletePost,
    deleteComment,
    updatePost,
    updateComment
}
