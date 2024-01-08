const express = require('express');
const router = express.Router();
const ReactionsTypeController = require('../controller/reactionsTypeController');
const validateSchema = require("../middlewares/reactionsTypeValidation");
const { createReactionTypeSchema, getByIdSchema } = require("../schemas/reactionsTypeSchema");

router.post('/', validateSchema(createReactionTypeSchema), ReactionsTypeController.createReactionType);
router.get('/', ReactionsTypeController.getReactionsType);
router.delete('/:id', validateSchema(getByIdSchema), ReactionsTypeController.deleteReactionType);

module.exports = router;
