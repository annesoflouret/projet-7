const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', multer, auth, postCtrl.createPosts);

router.get('/:id/comments', auth, commentCtrl.getAllComments);
router.post('/:id/comments', auth, commentCtrl.createComments);

module.exports = router;