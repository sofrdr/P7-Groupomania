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


function getUser(id){
  const user = db.prepare(`SELECT * FROM users WHERE id = @id`).get({id:id});
  return user;
}

module.exports = {getUser}





