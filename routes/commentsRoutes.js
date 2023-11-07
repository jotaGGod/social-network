const express = require('express');
const router = express.Router();
const CommentsController = require('../controller/commentsController');
const Validations  = require('../middlewares/validationComments');
const commentsSchema = require('../validation/commentsValidation');

router.post('/', Validations.validation(commentsSchema), CommentsController.createComment);
router.get('/', CommentsController.getComments);
router.get('/:id', CommentsController.getCommentById);
router.put('/:id', Validations.validation(commentsSchema), CommentsController.updateComment);
router.delete('/:id', CommentsController.deleteComment);

module.exports = router;
