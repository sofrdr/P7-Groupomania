const {createPost, getAllPosts} = require('../models/post-model')


exports.addPost = (req, res) => {
    try {
        const {message, posterId} = req.body;       
        createPost(posterId, message);
        res.status(201).json('Le post a bien été créé')
    }
    catch (err) {
        res.status(400).json({err});
    }
}


exports.getPosts = (req, res) => {
    try{
       const posts = getAllPosts();
       res.status(200).json(posts); 
    }
    catch(err){
        res.status(500).json({err})
    }
}
