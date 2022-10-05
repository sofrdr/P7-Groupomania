const { db } = require('../models/database');
const { getUser } = require('../models/user-model');
const { getPost, getAllPosts, createPost, updatePostMessage, updatePostPicture, deletePost, updatePostComments, addLike, removeLike, updateLikers } = require('../models/post-model');
const { createComment, getComments, getOneComment, editComment, deleteComment } = require('../models/comment-model')
const fs = require('fs');

// Ajouter un post
exports.addPost = (req, res) => {

  try {

    // On récupère le userID du token 
    const userId = req.auth.userId;
    // On récupère l'utilisateur dans la BDD       
    const user = getUser(userId);
    const author = user.pseudo;


    if (req.file) {
      const picture = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
      console.log(req.file)

      createPost(userId, author, req.body.message || "", picture);
    } else {

      createPost(userId, author, req.body.message)
    }

    res.status(201).json('Le post a bien été créé')

  }
  catch (err) {

    console.log(err)
    res.status(400).json({ err });
  }
}

// Afficher tous les posts
exports.getPosts = (req, res) => {
  try {
    const posts = getAllPosts();
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(500).json({ err })
  }
}

// Modifier un post
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

      /* Si la requête contient une image alors on supprime l'image existante du dossier et on actualise l'image du post */
      if (req.file) {
        const picture = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
        const filename = post.picture.split('/images/')[1];
        fs.unlink('images/' + filename, (err) => {
          updatePostPicture(picture, id);
        })
      }

      if (message) {
        updatePostMessage(message, id)
      }
      res.status(200).json({ message: "Le post a bien été modifié" })
    }

  }
  catch (err) {
    res.status(404).json({ err })

  }


}

//Supprimer un post


exports.deletePost = (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId

  try {
    const post = getPost(id)
    const currentUser = getUser(userId)
    if (post.user_id !== req.auth.userId && currentUser.role !== 1) {
      res.status(403).json({ message: "Suppression non autorisée" })
    } else {


      if (post.picture !== null) {

        const filename = post.picture.split('/images/')[1];
        console.log(filename)
        fs.unlink('images/' + filename, (err) => {
          if (err){
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


// Ajouter ou retirer un like à un post

exports.likePost = (req, res) => {
  const userId = req.auth.userId;
  const id = req.params.id;
  let like = req.body.like

  const user = getUser(userId);
  //email de l'utilisateur authentifié
  const userMail = user.email;

  const post = getPost(id);
  console.log(">>", id, post)
  // tableau des utilisateurs qui aiment le post
  const usersLiked = post.usersLiked


  try {
    // L'utilisateur veut ajouter un like
    if (like === 1) {
      // On vérifie que l'utilisateur n'a pas déjà un like sur ce post
      if (usersLiked.includes(userId)) {
        res.status(401).json({ message: "Vous aimez déjà le post" })
      } else {
        // Si non le nombre de like est incrémenté de 1 et l'adresse mail de l'utilisateur est ajoutée au tableau des likers
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
        // si oui, on on décrémente le nombre de likes de 1 et son adresse mail est retirée du tableau des likers
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

// Ajouter un commentaire à un post
exports.commentPost = (req, res) => {

  try {
    const message = req.body.message;
    const userId = req.auth.userId;
    const user = getUser(userId);
    const author = user.pseudo;
    const id = req.params.id;

    // Un commentaire est ajouté à la table comments
    createComment(author, message, id)
    const comments = getComments(id)

    // On actualise la ligne comments de la table posts
    updatePostComments(comments, id)

    res.status(201).json({ message: "Le commentaire a bien été ajouté" })
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }



}

// Afficher tous les commentaires d'un post
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

// Modifier un commentaire

exports.editComment = (req, res) => {

  const id = req.params.id;
  const userId = req.auth.userId;

  try {

    const comment = getOneComment(id);
    const postId = comment.post_id;
    const currentUser = getUser(userId);
    const message = req.body.message;


    // On vérifie si l'utilisateur est l'auteur du commentaire ou a le rôle administrateur
    if (comment.author !== currentUser.pseudo && currentUser.role !== 1) {
      res.status(403).json({ message: "Modification du commentaire non autorisée" });
    } else {
      editComment(id, message);
      const comments = getComments(postId)
      // On actualise la ligne comments de la table posts
      updatePostComments(comments, postId)
      res.status(200).json({ message: "Le commentaire a bien été modifié" })
    }
  }
  catch (err) {
    res.status(404).json({ err })
  }

}


// Supprimer un commentaire

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