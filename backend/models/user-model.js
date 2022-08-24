const {createTable } = require('./database');
const {db} = require('./database');

const structureUser = /*sql*/`
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT,
  email VARCHAR(100) NOT NULL UNIQUE,
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

  //const uuid = uuidv4();
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (@email, @password)');
  stmt.run({
    email: email,
    password: password, 
    
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





