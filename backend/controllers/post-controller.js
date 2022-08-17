const { db } = require('../models/database');
const {getUser} = require('../models/user-model');
const fs = require('fs');

// Ajouter un post
exports.addPost = (req, res) => {

    function createPost(userId, author, message, picture) {
        newPostStmt = db.prepare(`INSERT INTO posts (user_id, author,  message, date, picture) VALUES (@userId, @author, @message, datetime('now', 'localtime'), @picture)`);
        newPostStmt.run({
            userId: userId,
            author: author,
            message: message,
            picture: picture
        })
    }

    try {
        const userId = req.auth.userId;
        
        const user = getUser(userId);
        const author = user.email;
        console.log(author)
        const picture = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename

        createPost(userId, author, req.body.message || "", picture);
        res.status(201).json('Le post a bien été créé')
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ err });
    }
}

// Afficher tous les posts
exports.getPosts = (req, res) => {

    function getAllPosts() {
        const postStmt = db.prepare(`SELECT * FROM posts ORDER BY date DESC`)
        const posts = postStmt.all();
        return posts;
    }

    try {
        const posts = getAllPosts();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({ err })
    }
}

// Modifier un post
exports.modifyPost = (req, res) => {

    const id = req.params.id;

    function updatePostMessage(message, id) {
        db.prepare(`UPDATE posts SET message = @message WHERE id = @id`)
            .run({
                message: message,
                id: id
            })

    }

    function updatePostPicture(picture, id) {
        db.prepare(`UPDATE posts SET picture = @picture WHERE id = @id`).run({
            picture: picture,
            id: id
        })
    }


    try {
        const post = db.prepare(`SELECT * FROM posts WHERE id = @id`).get({ id: id });
        const currentUser = db.prepare(`SELECT * FROM users WHERE id = @id`).get({ id: req.auth.userId });
        if (post.user_id !== req.auth.userId && currentUser.role !== 1) {
            res.status(403).json({ message: "Modification non autorisée" })
        } else {

            const message = req.body.message;

            if (req.file) {
                const picture = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
                const filename = post.picture.split('/images/')[1];
                fs.unlink('images/' + filename, (err) => {
                    updatePostPicture(picture, id);
                })
            }

            if (message) {
                updatePostMessage(message, id)
            }
            res.status(200).json({ message: "Le post a bien été modifié" })
        }

    }
    catch (err) {
        res.status(404).json({ err })
        
    }


}

//Supprimer un post


exports.deletePost = (req, res) => {
    const id = req.params.id;

    try {
        const post = db.prepare(`SELECT * FROM posts WHERE id = @id`).get({ id: id });
        const currentUser = db.prepare(`SELECT * FROM users WHERE id = @id`).get({ id: req.auth.userId });
        if (post.user_id !== req.auth.userId && currentUser.role !== 1) {
            res.status(403).json({ message: "Suppression non autorisée" })
        } else {
            const filename = post.picture.split('/images/')[1];
            console.log(filename)
            fs.unlink('images/' + filename, (err) => {
                if (err) throw err;
                db.prepare(`DELETE FROM posts WHERE id = @id`).run({ id: id })
                res.status(200).json({ message: "Le post a bien été supprimé" })
            })



        }
    }
    catch (err) {
        res.status(404).json({ err })
    }

}