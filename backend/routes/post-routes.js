const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-controller');
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')

router.post('/', auth, multer, postCtrl.addPost);
router.get('/', auth, postCtrl.getPosts);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost)
router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router;