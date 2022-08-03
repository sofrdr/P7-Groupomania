const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-controller');
const auth = require('../middlewares/auth')

router.post('/', postCtrl.addPost);
router.get('/', postCtrl.getPosts)

module.exports = router;