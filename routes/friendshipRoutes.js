const express = require('express');
const router = express.Router();
const FriendshipController = require('../controller/friendshipController');
const validateSchema  = require('../middlewares/friendshipValidation');
const { createFriendshipSchema, getByidSchema } = require('../schemas/friendshipSchema');

router.post('/', validateSchema(createFriendshipSchema), FriendshipController.createFriendship);
router.get('/', FriendshipController.getFriendships);
router.delete('/:id', validateSchema(getByidSchema), FriendshipController.deleteFriendship);
router.get('/:id', validateSchema(getByidSchema), FriendshipController.getById);

module.exports = router;
