const { db, createTable, joinTable } = require('./database');

const structureComment = /*sql*/`
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
author TEXT NOT NULL, 
message TEXT NOT NULL,
date TEXT,
post_id INTEGER NOT NULL,
FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
`;

createTable('comments', structureComment);
joinTable('comments', 'posts', 'post_id', 'id');

/**
 * [Récupérer les commentaires liés à un post]
 *
 * @param   {Number}  id  [id du post]
 *
 * @return  {Array}      [commentaires]
 */
function getComments(id) {
    const comments = db.prepare(`SELECT * FROM comments WHERE post_id = ? ORDER BY date DESC`)
        .all(id);
    return comments;
}


/**
 * [Récupérer un commentaire selon son id]
 *
 * @param   {Number}  id  [id du commentaire]
 *
 * @return  {Object}      [commentaire]
 */
function getOneComment(id) {
    const comment = db.prepare(`SELECT * FROM comments WHERE id = @id`)
        .get({ id: id });
    return comment;
}


/**
 * [Créer un commentaire]
 *
 * @param   {String}  author   [pseudo de l'utilisateur]
 * @param   {String}  message  [message]
 * @param   {Number}  post_id  [id du post]
 *
 */
function createComment(author, message, post_id) {
    newComment = db.prepare(`INSERT INTO comments (author, message, date, post_id) VALUES (@author, @message, datetime('now', 'localtime'), @post_id)`)
        .run({
            author: author,
            message: message,
            post_id: post_id
        })
}

/**
 * [Modifier un commentaire]
 *
 * @param   {Number}  id       [id du commentaire]
 * @param   {String}  message  [message ]

 */
function editComment(id, message) {
    db.prepare(`UPDATE comments SET message = @message WHERE id = @id`)
        .run({
            message: message, 
            id: id
        })
}

/**
 * [Supprimer un commentaire]
 *
 * @param   {Number}  id  [id du commentaire]
 *
 */
function deleteComment(id){
    db.prepare(`DELETE FROM comments WHERE id = @id`)
    .run({id: id})
}

module.exports = { getComments, createComment, getOneComment, editComment, deleteComment };