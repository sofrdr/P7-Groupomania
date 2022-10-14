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

/**
 * [Ajouter un utilisateur en BDD]
 *
 * @param   {String}  email     [email]
 * @param   {String}  password  [mot de passe]
 * @param   {String}  pseudo    [pseudo]
 *
 */
function createUser(email, password, pseudo) {

  //const uuid = uuidv4();
  const stmt = db.prepare('INSERT INTO users (email, password, pseudo) VALUES (@email, @password, @pseudo)');
  stmt.run({
    email: email,
    password: password, 
    pseudo: pseudo
  });

}

/**
 * [Récupérer les infos d'un utilisateur selon son id]
 *
 * @param   {Number}  id  [id de l'utilisateur]
 *
 */
function getUser(id){
  const user = db.prepare(`SELECT * FROM users WHERE id = @id`).get({id:id});
  return user;
}

/**
 * [Récupérer les infos d'un utilisateur selon son email]
 *
 * @param   {String}  email  [email de l'utilisateur]
 *
 */
function getUserByEmail(email){
  const user = db.prepare('SELECT * FROM users WHERE email= @email')
  .get({email : email});
  return user;
}

module.exports = {getUser, createUser, getUserByEmail}





