const { db, createTable } = require('./database');

const structurePost = /*sql*/`
id INTEGER PRIMARY KEY AUTOINCREMENT,
posterId VARCHAR(50) NOT NULL,
message TEXT NOT NULL, 
picture VARCHAR(150), 
date TEXT,
likes TEXT, 
comments TEXT
`
createTable('posts', structurePost);

;


function getAllPosts(){
    const postStmt = db.prepare(`SELECT * FROM posts ORDER BY date DESC`)
    const posts = postStmt.all();
    return posts;
}

function createPost(posterId, message) {
    newPostStmt = db.prepare(`INSERT INTO posts (posterId, message, date) VALUES (@posterId, @message, datetime('now', 'localtime'))`);
    newPostStmt.run({
        posterId: posterId,
        message: message
    })
}

module.exports = {
    createPost,
    getAllPosts
};