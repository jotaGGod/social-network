const express = require('express');
const router = express.Router();
const FriendshipController = require('../controller/friendshipController');
const Validations  = require('../middlewares/validationFriendship');
const friendshipSchema = require('../validation/friendshipValidation');


router.post('/', Validations.validation(friendshipSchema), FriendshipController.createFriendship);
router.get('/', FriendshipController.getFriendships);
router.delete('/:id', Validations.validation(friendshipSchema), FriendshipController.deleteFriendship);


module.exports = router;