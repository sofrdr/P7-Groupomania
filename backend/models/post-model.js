const { db, createTable } = require('./database');

const structurePost = /*sql*/`
id INTEGER PRIMARY KEY AUTOINCREMENT,
posterId VARCHAR NOT NULL,
message TEXT NOT NULL, 
picture VARCHAR, 
likes TEXT, 
comments TEXT
`
createTable('posts', structurePost);
