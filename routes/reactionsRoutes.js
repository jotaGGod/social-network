const express = require('express');
const router = express.Router();
const ReactionsController = require('../controller/reactionsController');
const Validations  = require('../middlewares/validationReactions');
const reactionSchema = require('../validation/reactionsValidation');

router.post('/', Validations.validation(reactionSchema), ReactionsController.createReaction);
router.get('/', ReactionsController.getReactions);
router.get('/:id', ReactionsController.getReactionByid);
router.put('/:id', Validations.validation(reactionSchema), ReactionsController.updateReaction);
router.delete('/:id', ReactionsController.deleteReaction);

module.exports = router;