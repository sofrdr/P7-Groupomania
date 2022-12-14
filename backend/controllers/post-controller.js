const { getUser } = require('../models/user-model');
const { getPost, getAllPosts, createPost, updatePostMessage, updatePostPicture, deletePost, updatePostComments, addLike, removeLike, updateLikers } = require('../models/post-model');
const { createComment, getComments, getOneComment, editComment, deleteComment } = require('../models/comment-model')
const fs = require('fs');
const validator = require('validator')


// --------- AJOUTER UN POST -------------------------

exports.addPost = (req, res) => {

  try {

    // On récupère le userID du token 
    const userId = req.auth.userId;
    // On récupère l'utilisateur dans la BDD       
    const user = getUser(userId);
    const author = user.pseudo;
    const message = req.body.message

    // On empêche l'envoi des caractères <, >, &, ', " et /
    const sanitizedMessage = validator.escape(message)



    let newPostDb;

    // Si le message dépasse 60 000 caractères on renvoie une erreur
    if (validator.isLength(message, { max: 60000 }) === false) {
      throw new Error("Message trop long");
    }

    if (req.file) {
      const picture = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
      newPostDb = createPost(userId, author, sanitizedMessage || "", picture);
    } else {
      // Si la requête ne contient pas de fichier et que le champ message est vide on renvoie une erreur 
      if (validator.isEmpty(message, { ignore_whitespace: true })) {
        throw new Error("Champ message vide")
      } else {
        newPostDb = createPost(userId, author, sanitizedMessage)
      }


    }

    const newPostId = newPostDb.lastInsertRowid
    // On récupère le nouveau post créé et l'envoie dans la réponse
    const newPost = getPost(newPostId)
    res.status(201).json({ message: "Le post a bien été créé", newPost })

  }
  catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
}



// ----------------- AFFICHER TOUS LES POSTS -----------------------------

exports.getPosts = (req, res) => {
  try {
    const posts = getAllPosts();
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(500).json({ err })
  }
}

// ---------------------- MODIFIER UN POST --------------------------------

exports.modifyPost = (req, res) => {

  const id = req.params.id;
  const userId = req.auth.userId

  try {
    // On récupère le bon post dans la BDD avec l'id des params
    const post = getPost(id)
    const currentUser = getUser(userId)

    /* Si l'uilisateur qui a créé le post est différent de l'utilisateur authentifié ET qu'il n'est pas admin alors la modification
    n'est pas autorisée */

    if (post.user_id !== req.auth.userId && currentUser.role !== 1) {
      res.status(403).json({ message: "Modification non autorisée" })
    } else {
      const message = req.body.message;
      // On empêche l'envoi des caractères <, >, &, ', " et /
      const sanitizedMessage = validator.escape(message)

      /* Si la requête contient une image et que le post contenait déjà une image alors on supprime l'image existante 
      du dossier. On actualise ensuite l'image du post */

      let newPost;

      if (req.file) {
        const picture = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename

        let filename;

        if (post.picture) {
          filename = post.picture.split('/images/')[1];
          fs.unlinkSync('images/' + filename);
        }
        updatePostPicture(picture, id);
      }

      // Si le post d'origine ne contient pas d'image et que l'utilisateur saisit un message vide  ou > à 60000 caractères on renvoie une erreur
      if (post.picture === null && message === "") {
        throw new Error("Champ message vide")
      } else if (validator.isLength(message, { max: 60000 }) === false) {
        throw new Error("Message trop long")
      } else {
        updatePostMessage(sanitizedMessage, id)

      }

      // On récupère le post modifié et l'envoie dans la réponse
      newPost = getPost(id)

      res.status(200).json({ message: "Le post a bien été modifié", newPost })
    }

  }
  catch (err) {
    res.status(404).json({ error: err.message })

  }


}

// ----------- SUPPRIMER UN POST ----------------------------


exports.deletePost = (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId

  try {
    const post = getPost(id)
    const currentUser = getUser(userId)

    // Si l'utilisateur connecté n'est pas l'auteur du post et qu'il n'est pas admin alors la suppression n'est pas autorisée
    if (post.user_id !== req.auth.userId && currentUser.role !== 1) {
      res.status(403).json({ message: "Suppression non autorisée" })
    } else {

      // Si le post contient une image on la supprime du dossier /images
      if (post.picture !== null) {

        const filename = post.picture.split('/images/')[1];
        console.log(filename)
        fs.unlink('images/' + filename, (err) => {
          if (err) {
            throw err;
          }

        })
      }
      deletePost(id);
      res.status(200).json({ message: "Le post a bien été supprimé" })


    }
  }
  catch (err) {
    res.status(404).json({ err })
  }

}


// ------------- AJOUTER OU RETIRER UN LIKE -----------------------------------

exports.likePost = (req, res) => {
  const userId = req.auth.userId;
  const id = req.params.id;
  let like = req.body.like

  const post = getPost(id);

  // tableau des utilisateurs qui aiment le post
  const usersLiked = post.usersLiked


  try {
    // L'utilisateur veut ajouter un like
    if (like === 1) {
      // On vérifie que l'utilisateur n'a pas déjà un like sur ce post
      if (usersLiked.includes(userId)) {
        res.status(401).json({ message: "Vous aimez déjà le post" })
      } else {
        // Si non, le nombre de like est incrémenté de 1 et l'adresse mail de l'utilisateur est ajoutée au tableau des likers
        addLike(id)
        usersLiked.push(userId);
        updateLikers(usersLiked, id)
        res.status(201).json({ message: "Like pris en compte" })
      }


    }

    // L'utilisateur veut retirer son like
    if (like === 0) {
      // On vérifie qu'il fait bien partie des likers
      if (usersLiked.includes(userId)) {
        // si oui, on on décrémente le nombre de likes de 1 et son id est retiré du tableau des likers
        removeLike(id)
        for (let i = 0; i < usersLiked.length; i++) {
          if (usersLiked[i] === userId) {
            usersLiked.splice(i, 1)
          }
        }
        updateLikers(usersLiked, id)
        res.status(201).json({ message: "Retrait du like pris en compte" })

      } else {
        res.status(401).json({ message: "Retrait du like impossible" })
      }
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }



}

//  ------------ AJOUTER UN COMMENTAIRE ----------------------------

exports.commentPost = (req, res) => {

  try {
    const message = req.body.message;
    const userId = req.auth.userId;
    const user = getUser(userId);
    const author = user.pseudo;
    const id = req.params.id;

    // On empêche l'envoi des caractères <, >, &, ', " et /
    const sanitizedMessage = validator.escape(message)


    let newCommentDb;

    // Si le commentaire est vide ou dépasse les 8000 caractères on renvoie une erreur
    if (validator.isEmpty(message, { ignore_whitespace: true })) {
      throw new Error("Commentaire vide")
    } else if (validator.isLength(message, { max: 8000 }) === false) {
      throw new Error("Commentaire trop long")
    } else {
      // Un commentaire est ajouté à la table comments
      newCommentDb = createComment(author, sanitizedMessage, id)
    }
    const newCommentId = newCommentDb.lastInsertRowid;


    // On actualise la ligne comments de la table posts
    const comments = getComments(id)
    updatePostComments(comments, id)

    // On récupère le nouveau commentaire pour l'envoyer dans la réponse
    const newComment = getOneComment(newCommentId)

    res.status(201).json({ message: "Le commentaire a bien été ajouté", newComment })
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message })
  }



}

// ---------- AFFICHER TOUS LES COMMENTAIRES D'UN POST ------------------------

exports.getComments = (req, res) => {

  try {
    const id = req.params.id;

    const comments = getComments(id);
    res.status(200).json(comments)

  }
  catch (err) {
    res.status(500).json({ err })
  }

}

// ------------------ MODIFIER UN COMMENTAIRE --------------------------------

exports.editComment = (req, res) => {

  const id = req.params.id;
  const userId = req.auth.userId;

  try {

    const comment = getOneComment(id);
    const postId = comment.post_id;
    const currentUser = getUser(userId);
    const message = req.body.message;

    // On empêche l'envoi des caractères <, >, &, ', " et /
    const sanitizedMessage = validator.escape(message)


    // On vérifie si l'utilisateur est l'auteur du commentaire ou a le rôle administrateur
    if (comment.author !== currentUser.pseudo && currentUser.role !== 1) {
      res.status(403).json({ message: "Modification du commentaire non autorisée" });
      // Si le champ message est vide ou dépasse les 8000 caractères on renvoie une erreur 
    } else if (validator.isEmpty(message, { ignore_whitespace: true })) {
      throw new Error("Commentaire vide")
    } else if (validator.isLength(message, { max: 8000 }) === false) {
      throw new Error("Commentaire trop long")
    }
    else {
      editComment(id, sanitizedMessage);
      const comments = getComments(postId)
      // On actualise la ligne comments de la table posts
      updatePostComments(comments, postId)
      res.status(200).json({ message: "Le commentaire a bien été modifié" })
    }
  }
  catch (err) {
    res.status(404).json({ error: err.message })
  }

}


// ---------------- SUPPRIMER UN COMMENTAIRE --------------------------------------

exports.deleteComment = (req, res) => {

  const id = req.params.id;
  const userId = req.auth.userId;

  try {

    const comment = getOneComment(id);
    const currentUser = getUser(userId);
    const postId = comment.post_id;

    // On vérifie si l'utilisateur est l'auteur du commentaire ou a le rôle administrateur
    if (comment.author !== currentUser.pseudo && currentUser.role !== 1) {
      res.status(403).json({ message: "Suppression du commentaire non autorisée" });
    } else {
      deleteComment(id);
      const comments = getComments(postId)
      // On actualise la ligne comments de la table posts
      updatePostComments(comments, postId)
      res.status(200).json({ message: "Le commentaire a bien été supprimé" })
    }


  }
  catch (err) {
    res.status(404).json({ err })
  }

}