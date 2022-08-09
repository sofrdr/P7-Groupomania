const { db, createTable, joinTable } = require('./database');

const structurePost = /*sql*/`
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
message TEXT NOT NULL, 
picture VARCHAR(150), 
date TEXT,
likes TEXT, 
comments TEXT,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
`
createTable('posts', structurePost);
joinTable('posts','users', 'user_id', 'id');




