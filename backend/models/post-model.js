const { db, createTable, joinTable } = require('./database');

const structurePost = /*sql*/`
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
author TEXT,
message TEXT NOT NULL, 
picture VARCHAR(150), 
date TEXT,
likes INTEGER DEFAULT 0,
usersLiked TEXT DEFAULT '[]', 
comments TEXT
`
createTable('posts', structurePost);
joinTable('posts', 'users', 'user_id', 'id');

/**
 * [Récupérer un post selon son id]
 *
 * @param   {Number}  id  [id du post]
 *
 * @return  {Object}      [post]
 */
function getPost(id) {
    const post = db.prepare(`SELECT * FROM posts WHERE id = @id`).get({ id: id });
    post.usersLiked = JSON.parse(post.usersLiked);
    return post;
}


/**
 * [Récupérer tous les posts]
 *
 * @return  {Array}  [posts]
 */
function getAllPosts() {
    const postStmt = db.prepare(`SELECT * FROM posts ORDER BY date DESC`)
    const posts = postStmt.all();
    return posts;
}


/**
 * [Créer un post]
 *
 * @param   {Number}  userId   [id de l'utilisateur]
 * @param   {String}  author   [pseudo de l'utilisateur]
 * @param   {String}  message  [message]
 * @param   {String}  picture  [url de l'image]
 *
 */
function createPost(userId, author, message, picture) {
    const newPost = db.prepare(`INSERT INTO posts (user_id, author,  message, date, picture) VALUES (@userId, @author, @message, datetime('now', 'localtime'), @picture)`)
    .run({
        userId: userId,
        author: author,
        message: message,
        picture: picture
    })
    return newPost
}

/**
 * [Modifier le message d'un post]
 *
 * @param   {String}  message  [message]
 * @param   {Number}  id       [id du post]
 *
 */
function updatePostMessage(message, id) {
<<<<<<< HEAD
     db.prepare(`UPDATE posts SET message = @message WHERE id = @id`)
=======
    const newPostMessage = db.prepare(`UPDATE posts SET message = @message WHERE id = @id`)
>>>>>>> 562c443044e85c54030a86ca6ce6cae9af297609
        .run({
            message: message,
            id: id
        })
    

}

/**
 * [Modifier l'image d'un post]
 *
 * @param   {String}  picture  [url de l'image]
 * @param   {Number}  id       [id du post]
 *
 */
function updatePostPicture(picture, id) {
   const newPostPicture = db.prepare(`UPDATE posts SET picture = @picture WHERE id = @id`).run({
        picture: picture,
        id: id
    })
}
    

/**
 * [Supprimer un post]
 *
 * @param   {Number}  id  [id du post]
 *
 */
function deletePost(id) {
    db.prepare(`DELETE FROM posts WHERE id = @id`).run({ id: id })
}

/**
 * [Ajouter un like]
 *
 * @param   {Number}  id  [id du post]
 *
 */
function addLike(id) {
    db.prepare(`UPDATE posts SET likes = likes + 1 WHERE id = @id`)
        .run({ id: id });
  
}


/**
 * [retirer un like]
 *
 * @param   {Number}  id  [id du post]
 *
 */
function removeLike(id){
    db.prepare(`UPDATE posts SET likes = likes - 1 WHERE id = @id`)
          .run({ id: id });
}


/**
 * [Actualiser les utilisateurs qui aiment le post]
 *
 * @param   {Array}  usersLiked  [Tableau des id des utilisateurs qui aiment le post]
 * @param   {Number}  id          [id du post]
 *
 */
function updateLikers(usersLiked, id){
    db.prepare(`UPDATE posts SET usersLiked = @usersLiked WHERE id = @id`)
          .run({ usersLiked: JSON.stringify(usersLiked), id: id })
}



/**
 * [Actualiser les commentaires liés au post]
 *
 * @param   {Array}  comments  [Commentaires]
 * @param   {Number}  id        [id du post]
 *
 */
function updatePostComments(comments, id) {
    db.prepare(`UPDATE posts SET comments = @comments WHERE id = @id`)
        .run({
            comments: JSON.stringify(comments),
            id: id
        })
}

module.exports = {
    getPost,
    getAllPosts,
    createPost,
    updatePostMessage,
    updatePostPicture,
    deletePost,
    updatePostComments,
    addLike, 
    removeLike,
    updateLikers
}

