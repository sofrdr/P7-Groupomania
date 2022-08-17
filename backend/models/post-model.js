const { db, createTable, joinTable } = require('./database');

const structurePost = /*sql*/`
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
author TEXT,
message TEXT NOT NULL, 
picture VARCHAR(150), 
date TEXT,
likes INTEGER DEFAULT 0,
usersLiked TEXT, 
comments TEXT,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
`
createTable('posts', structurePost);
joinTable('posts','users', 'user_id', 'id');

function getPost(id){
    const post = db.prepare(`SELECT * FROM posts WHERE id = @id`).get({ id: id });
    return post;
}

function getAllPosts() {
    const postStmt = db.prepare(`SELECT * FROM posts ORDER BY date DESC`)
    const posts = postStmt.all();
    return posts;
}

function createPost(userId, author, message, picture) {
    newPostStmt = db.prepare(`INSERT INTO posts (user_id, author,  message, date, picture) VALUES (@userId, @author, @message, datetime('now', 'localtime'), @picture)`);
    newPostStmt.run({
        userId: userId,
        author: author,
        message: message,
        picture: picture
    })
}

function updatePostMessage(message, id) {
    db.prepare(`UPDATE posts SET message = @message WHERE id = @id`)
        .run({
            message: message,
            id: id
        })

}

function updatePostPicture(picture, id) {
    db.prepare(`UPDATE posts SET picture = @picture WHERE id = @id`).run({
        picture: picture,
        id: id
    })
}

function deletePost(id){
    db.prepare(`DELETE FROM posts WHERE id = @id`).run({ id: id })
}

module.exports = {
    getPost, 
    getAllPosts,
    createPost,
    updatePostMessage,
    updatePostPicture,
    deletePost
}

