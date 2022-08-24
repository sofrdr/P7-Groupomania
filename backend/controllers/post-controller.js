const { db } = require('../models/database');
const { getUser } = require('../models/user-model');
const { getPost, getAllPosts, createPost, updatePostMessage, updatePostPicture, deletePost, updatePostComments } = require('../models/post-model');
const { createComment, getComments, getOneComment, editComment } = require('../models/comment-model')
const fs = require('fs');

// Ajouter un post
exports.addPost = (req, res) => {

  try {
    const userId = req.auth.userId;      // On récupère le userID du token 
    const user = getUser(userId);   // On récupère l'utilisateur dans la BDD 
    const author = user.email;
    console.log(author)
    const picture = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;

    createPost(userId, author, req.body.message || "", picture);
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
      const filename = post.picture.split('/images/')[1];
      console.log(filename)
      fs.unlink('images/' + filename, (err) => {
        if (err) throw err;
        deletePost(id);
        res.status(200).json({ message: "Le post a bien été supprimé" })
      })



    }
  }
  catch (err) {
    res.status(404).json({ err })
  }

}


// Ajouter un like à un post

exports.likePost = (req, res) => {
  const userId = req.auth.userId;
  const id = req.params.id;
  let like = req.body.like

  const user = getUser(userId);
  const userMail = user.email; //email de l'utilisateur authentifié

  const post = getPost(id);
  console.log(">>", id, post)
  const usersLiked = post.usersLiked // tableau des utilisateurs qui aiment le post


  try {
    if (like === 1) {
      if (usersLiked.includes(userMail)) {
        res.status(401).json({ message: "Vous aimez déjà le post" })
      } else {
        db.prepare(`UPDATE posts SET likes = likes + 1 WHERE id = @id`)
          .run({ id: id });

        usersLiked.push(userMail);
        db.prepare(`UPDATE posts SET usersLiked = @usersLiked WHERE id = @id`)
          .run({ usersLiked: JSON.stringify(usersLiked), id: id })
        res.status(201).json({ message: "Like pris en compte" })
      }


    }

    if (like === 0) {
      if (usersLiked.includes(userMail)) {
        db.prepare(`UPDATE posts SET likes = likes - 1 WHERE id = @id`)
          .run({ id: id });
        for (let i = 0; i < usersLiked.length; i++) {
          if (usersLiked[i] === userMail) {
            usersLiked.splice(i, 1)
          }
        }
        db.prepare(`UPDATE posts SET usersLiked = @usersLiked WHERE id = @id`)
          .run({ usersLiked: JSON.stringify(usersLiked), id: id })
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
    const author = user.email;
    const id = req.params.id;

    createComment(author, message, id)
    const comments = getComments(id)
   
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

    if (comment.author !== currentUser.email && currentUser.role !== 1) {
      res.status(403).json({ message: "Modification du commentaire non autorisée" });
    } else {
      editComment(id, message);
      const comments = getComments(postId)
      updatePostComments(comments, postId)
      res.status(200).json({ message: "Le commentaire a bien été modifié" })
    }
  }
  catch (err) {
    res.status(404).json({ err })
  }

}