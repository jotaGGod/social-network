const express = require('express');
const router = express.Router();
const TargetPublicController = require('../controller/targetPublicRoutes');
const Validations  = require('../middlewares/validationFriendship');
const friendshipSchema = require('../validation/friendshipValidation');


router.post('/', TargetPublicController.createTargetPublic);
router.get('/', TargetPublicController.getTargetPublics);
router.delete('/:id', TargetPublicController.deleteTargetPublic);


module.exports = router;