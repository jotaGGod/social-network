const express = require('express');
const router = express.Router();
const ReactionsController = require('../controller/reactionsController');
const Validations  = require('../middlewares/validationReactions');
const reactionSchema = require('../validation/reactionsValidation');

router.get('/', ReactionsController.getReactions);
router.post('/', Validations.validation(reactionSchema), ReactionsController.createReaction);
router.get('/:id', ReactionsController.getReactionById);
router.put('/:id', ReactionsController.updateReaction);
router.delete('/:id', ReactionsController.deleteReaction);

module.exports = router;
