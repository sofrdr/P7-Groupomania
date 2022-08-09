const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user-routes')
const postRoutes = require('./routes/post-routes')

const app = express();


app.use(express.json());

// routes

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);





module.exports = app;