const express = require('express');
const validateSchema  = require('../middlewares/friendshipValidation');
const { createFriendshipSchema, getByIdSchema } = require('../schemas/friendshipSchema');

function createFriendshipRoutes(friendshipController) {
    const router = express.Router();
    router.post('/', validateSchema(createFriendshipSchema), friendshipController.create.bind(friendshipController));
    router.get('/', friendshipController.getFriendships.bind(friendshipController));
    router.get('/:id', friendshipController.getById.bind(friendshipController));
    router.delete('/:id', friendshipController.deleteFriendship.bind(friendshipController));
    return router
}

module.exports = createFriendshipRoutes;
