const express = require('express');
const router = express.Router();
const FriendshipController = require('../controller/friendshipController');
const validate  = require('../middlewares/validationFriendship');
const { createFriendshipSchema, getByidSchema } = require('../validation/friendshipValidation');

router.post('/', validate(createFriendshipSchema), FriendshipController.createFriendship);
router.get('/', FriendshipController.getFriendships);
router.delete('/:id', validate(getByidSchema), FriendshipController.deleteFriendship);
router.get('/:id', validate(getByidSchema), FriendshipController.getById);

module.exports = router;
