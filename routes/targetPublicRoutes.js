const express = require('express');
const router = express.Router();
const TargetPublicController = require('../controller/targetPublicController');

router.post('/', TargetPublicController.createTargetPublic);
router.get('/', TargetPublicController.getTargetPublics);
router.delete('/:id', TargetPublicController.deleteTargetPublic);

module.exports = router;
