// Connexion base de données

const DataBase = require('better-sqlite3');
const db = new DataBase('./database.db', { fileMustExist: true });

function createTable(tableName, tableStructure){  
  db.exec(`CREATE TABLE IF NOT EXISTS ${tableName}(${tableStructure})`);
}



module.exports = {
  db,
  createTable,
  
}