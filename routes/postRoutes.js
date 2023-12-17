const express = require('express');
const router = express.Router();
const PostController = require('../controller/postController');
const validate  = require('../middlewares/postValidation');
const {createPostSchema, updatePostSchema, getByIdSchema} = require('../schemas/postValidation')

router.post('/', validate(createPostSchema), PostController.createPost);
router.get('/', PostController.getPosts);
router.get('/:id', validate(getByIdSchema), PostController.getPostById);
router.put('/:id', validate(updatePostSchema), PostController.updatePost);
router.delete('/:id', validate(getByIdSchema), PostController.deletePost);

module.exports = router;
