const express = require('express');
const helmet = require('helmet')
const path = require('path');
const userRoutes = require('./routes/user-routes')
const postRoutes = require('./routes/post-routes')

const app = express();


app.use(express.json());


// Configuration des en-têtes

app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);





module.exports = app;