const express = require('express');
const router = express.Router();
const PostController = require('../controller/postController');
const validateSchema  = require('../middlewares/postValidation');
const {createPostSchema, updatePostSchema, getByIdSchema} = require('../schemas/postSchema')

router.post('/', validateSchema(createPostSchema), PostController.createPost);
router.get('/', PostController.getPosts);
router.get('/:id', validateSchema(getByIdSchema), PostController.getPostById);
router.put('/:id', validateSchema(updatePostSchema), PostController.updatePost);
router.delete('/:id', validateSchema(getByIdSchema), PostController.deletePost);

module.exports = router;
