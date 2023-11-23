const express = require('express');
const router = express.Router();
const FriendshipController = require('../controller/friendshipController');
const Validations  = require('../middlewares/validationFriendship');
const friendshipSchema = require('../validation/friendshipValidation');

router.post('/', Validations.validation(friendshipSchema), FriendshipController.createFriendship);
router.get('/', FriendshipController.getFriendships);
router.delete('/:id', FriendshipController.deleteFriendship);
router.get('/:id', FriendshipController.getById);

module.exports = router;
