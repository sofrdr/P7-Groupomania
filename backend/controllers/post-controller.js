const { db } = require('../models/database');
const fs = require('fs');

// Ajouter un post
exports.addPost = (req, res) => {

    function createPost(userId, message) {
        newPostStmt = db.prepare(`INSERT INTO posts (user_id, message, date) VALUES (@userId, @message, datetime('now', 'localtime'))`);
        newPostStmt.run({
            userId: userId,
            message: message
        })
    }

    try {
        const userId = req.auth.userId;

        if (req.file) {
            const postObject = JSON.parse(req.body.post)
            createPost(userId, postObject.message);
            db.prepare(`INSERT INTO posts (picture) VALUES (@picture)`)
                .run({
                    picture: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
                })

        } else {
            const { message } = req.body;
            createPost(userId, message);
        }

        res.status(201).json('Le post a bien été créé')
    }
    catch (err) {
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
    let message;
    function updatePostMessage(message, id) {
        db.prepare(`UPDATE posts SET message = @message WHERE id = @id`)
            .run({
                message: message,
                id: id
            })
    }

    function updatePostPicture(id) {
        db.prepare(`UPDATE posts SET picture = @picture WHERE id = @id`)
            .run({
                picture: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename,
                id: id
            })
    }

    try {
        const post = db.prepare(`SELECT * FROM posts WHERE id = @id`).get({ id: id });
        const currentUser = db.prepare(`SELECT * FROM users WHERE id = @id`).get({ id: req.auth.userId });
        if (post.user_id !== req.auth.userId && currentUser.role !== 1) {
            res.status(403).json({ message: "Modification non autorisée" })
        } else {
            if (req.file) {
                const postObject = JSON.parse(req.body.post);
                message = postObject.message;
                updatePostMessage(message, id);

                const filename = post.picture.split('/images/')[1];
                fs.unlink('images/' + filename, (err) => {
                    if (err) throw err;
                })
                updatePostPicture(id)
            } else {
                message = req.body.message;
                updatePostMessage(message, id);
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
            

            if (post.picture) {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink('images/' + filename, (err) => {
                    if (err) throw err;
                })
            }
            db.prepare(`DELETE FROM posts WHERE id = @id`).run({ id: id })
            res.status(200).json({ message: "Le post a bien été supprimé" })
        }
    }
    catch (err) {
        res.status(404).json({ err })
    }

}