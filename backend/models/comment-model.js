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