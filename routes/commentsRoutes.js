const express = require('express');
const router = express.Router();
const CommentsController = require('../controller/commentsController');
const validate  = require('../middlewares/validationComments');
const {createCommentSchema, updateCommentSchema, getByIdSchema} = require('../validation/commentsValidation');

router.post('/', validate(createCommentSchema), CommentsController.createComment);
router.get('/', CommentsController.getComments);
router.get('/:id', validate(getByIdSchema), CommentsController.getCommentById);
router.put('/:id', validate(updateCommentSchema), CommentsController.updateComment);
router.delete('/:id', validate(getByIdSchema), CommentsController.deleteComment);

module.exports = router;
