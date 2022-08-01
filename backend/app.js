const express = require('express');
const userRoutes = require('./routes/user-routes')


const app = express();


app.use(express.json());

// routes

app.use('/api/auth', userRoutes);
// app.use('api/posts', postsRoutes);





module.exports = app;