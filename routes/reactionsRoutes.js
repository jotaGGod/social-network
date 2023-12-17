const express = require('express');
const router = express.Router();
const ReactionsController = require('../controller/reactionsController');
const validate  = require('../middlewares/reactionValidation');
const { createReactionsSchema, updateReactionsSchema, getByidSchema} = require('../schemas/reactionsSchema');

router.get('/', ReactionsController.getReactions);
router.post('/', validate(createReactionsSchema), ReactionsController.createReaction);
router.get('/:id', validate(getByidSchema), ReactionsController.getReactionById);
router.put('/:id', validate(updateReactionsSchema), ReactionsController.updateReaction);
router.delete('/:id', validate(getByidSchema), ReactionsController.deleteReaction);

module.exports = router;
