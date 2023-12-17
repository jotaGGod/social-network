const express = require('express');
const router = express.Router();
const CommentsController = require('../controller/commentsController');
const validateSchema  = require('../middlewares/commentsValidation');
const {createCommentSchema, updateCommentSchema, getByIdSchema} = require('../schemas/commentsSchema');

router.post('/', validateSchema(createCommentSchema), CommentsController.createComment);
router.get('/', CommentsController.getComments);
router.get('/:id', validateSchema(getByIdSchema), CommentsController.getCommentById);
router.put('/:id', validateSchema(updateCommentSchema), CommentsController.updateComment);
router.delete('/:id', validateSchema(getByIdSchema), CommentsController.deleteComment);

module.exports = router;
