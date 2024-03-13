const express = require('express');
const validateSchema  = require('../middlewares/reactionValidation');
const { createReactionsSchema, updateReactionsSchema, getByidSchema} = require('../schemas/reactionsSchema');

function createReactionRoutes(reactionController) {
    const router = express.Router();
    router.get('/', reactionController.getReactions.bind(reactionController));
    router.post('/', validateSchema(createReactionsSchema), reactionController.createReaction.bind(reactionController));
    router.get('/:id', validateSchema(getByidSchema), reactionController.getReactionById.bind(reactionController));
    router.put('/:id', validateSchema(updateReactionsSchema), reactionController.updateReaction.bind(reactionController));
    router.delete('/:id', validateSchema(getByidSchema), reactionController.deleteReaction.bind(reactionController));
    return router
}

module.exports = createReactionRoutes;
