const { db, createTable } = require('./database');

const structureUser = /*sql*/`
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  role INTEGER DEFAULT 0
`;


try {
  createTable('users', structureUser);

}
catch (err) {
  console.error(err)
}


function createUser(email, password) {
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (@email, @password)');
  stmt.run({
    email: email,
    password: password
  });

}


const newUserStmt = db.prepare('SELECT id, email FROM users WHERE email= ?');


module.exports = {
  createUser,
  newUserStmt
}