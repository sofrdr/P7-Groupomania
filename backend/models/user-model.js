const db = require('../app')

const structureUser = `
id INTEGER PRIMARY KEY AUTOINCREMENT,
email TEXT NOT NULL UNIQUE,
password VARCHAR(50) NOT NULL,
role INTEGER DEFAULT 0
`;


function createTable(tableName, tableStructure){  
    db.exec(`CREATE TABLE IF NOT EXISTS ${tableName}(${tableStructure})`);
}

createTable('users', structureUser);


const stmt = db.prepare('INSERT INTO users (email, password) VALUES (@email, @password)');
stmt.run({
    email: 'sophie@test.fr',
    password: 'test123'
});