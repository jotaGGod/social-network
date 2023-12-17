const express = require('express');
const router = express.Router();
const FriendshipController = require('../controller/friendshipController');
const validate  = require('../middlewares/friendshipValidation');
const { createFriendshipSchema, getByidSchema } = require('../schemas/friendshipValidation');

router.post('/', validate(createFriendshipSchema), FriendshipController.createFriendship);
router.get('/', FriendshipController.getFriendships);
router.delete('/:id', validate(getByidSchema), FriendshipController.deleteFriendship);
router.get('/:id', validate(getByidSchema), FriendshipController.getById);

module.exports = router;
