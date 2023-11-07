const express = require('express');
const router = express.Router();
const ReactionsTypeController = require('../controller/reactionsTypeController');

router.post('/', ReactionsTypeController.createReactionType);
router.get('/', ReactionsTypeController.getReactionsType);
router.delete('/:id', ReactionsTypeController.deleteReactionType);

module.exports = router;
