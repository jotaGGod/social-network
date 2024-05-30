const express = require('express');
const validateSchema  = require('../middlewares/friendshipValidation');
const { authorizationSchema } = require('../schemas/friendshipSchema');

function createFriendshipRoutes(friendshipController) {
    const router = express.Router();
    router.get('/', validateSchema(authorizationSchema), friendshipController.getFriendships.bind(friendshipController));
    router.delete('/:id', validateSchema(authorizationSchema), friendshipController.deleteFriendship.bind(friendshipController));
    return router
}

module.exports = createFriendshipRoutes;
