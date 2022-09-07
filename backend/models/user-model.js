const {createTable } = require('./database');
const {db} = require('./database');

const structureUser = /*sql*/`
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  pseudo VARCHAR(50) NOT NULL UNIQUE,
  role INTEGER DEFAULT 0
`;


try {
  createTable('users', structureUser);

}
catch (err) {
  console.error(err)
}


function createUser(email, password, pseudo) {

  //const uuid = uuidv4();
  const stmt = db.prepare('INSERT INTO users (email, password, pseudo) VALUES (@email, @password, @pseudo)');
  stmt.run({
    email: email,
    password: password, 
    pseudo: pseudo
  });

}

function getUser(id){
  const user = db.prepare(`SELECT * FROM users WHERE id = @id`).get({id:id});
  return user;
}

function getUserByEmail(email){
  const user = db.prepare('SELECT * FROM users WHERE email= @email')
  .get({email : email});
  return user;
}

module.exports = {getUser, createUser, getUserByEmail}





