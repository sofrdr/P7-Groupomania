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


function getComments(id) {
    const comments = db.prepare(`SELECT * FROM comments WHERE post_id = ? ORDER BY date DESC`)
        .all(id);
    return comments;
}

function getOneComment(id) {
    const comment = db.prepare(`SELECT * FROM comments WHERE id = @id`)
        .get({ id: id });
    return comment;
}

function createComment(author, message, post_id) {
    newComment = db.prepare(`INSERT INTO comments (author, message, date, post_id) VALUES (@author, @message, datetime('now', 'localtime'), @post_id)`)
        .run({
            author: author,
            message: message,
            post_id: post_id
        })
}


function editComment(id, message) {
    db.prepare(`UPDATE comments SET message = @message WHERE id = @id`)
        .run({
            message: message, 
            id: id
        })
}


module.exports = { getComments, createComment, getOneComment, editComment };