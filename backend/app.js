const express = require('express');
const userRoutes = require('./routes/user-routes')


const app = express();


app.use(express.json());

// routes

// app.use('api/auth', userRoutes);
// app.use('api/posts', postsRoutes);


// Connexion base de données

let db;

if (db !== undefined) return;
const DataBase = require('better-sqlite3');
db = new DataBase('./database.db', { fileMustExist: true });





module.exports = app;