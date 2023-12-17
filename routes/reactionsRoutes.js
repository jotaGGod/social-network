const express = require('express');
const router = express.Router();
const ReactionsController = require('../controller/reactionsController');
const validateSchema  = require('../middlewares/reactionValidation');
const { createReactionsSchema, updateReactionsSchema, getByidSchema} = require('../schemas/reactionsSchema');

router.get('/', ReactionsController.getReactions);
router.post('/', validateSchema(createReactionsSchema), ReactionsController.createReaction);
router.get('/:id', validateSchema(getByidSchema), ReactionsController.getReactionById);
router.put('/:id', validateSchema(updateReactionsSchema), ReactionsController.updateReaction);
router.delete('/:id', validateSchema(getByidSchema), ReactionsController.deleteReaction);

module.exports = router;
