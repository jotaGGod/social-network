const express = require('express');
const router = express.Router();
const PostController = require('../controller/postController');
const Validations  = require('../middlewares/validationPost');
const postSchema = require('../validation/postValidation')

router.post('/', Validations.validation(postSchema), PostController.createPost);
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPostById);
router.put('/:id', Validations.validation(postSchema), PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
