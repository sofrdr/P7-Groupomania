// Connexion base de données

const DataBase = require('better-sqlite3');
const db = new DataBase('./database.db', { fileMustExist: true });

function createTable(tableName, tableStructure){  
  db.exec(`CREATE TABLE IF NOT EXISTS ${tableName}(${tableStructure})`);
}

function joinTable(table1, table2, col1, col2){
  db.exec(`SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${col1} = ${table2}.${col2}`)
}


module.exports = {
  db,
  createTable,
  joinTable
}