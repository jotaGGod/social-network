const express = require('express');
const router = express.Router();
const AlbumItemController = require('../controller/albumItemController');
const validateSchema = require("../middlewares/albumItemValidation");
const { createAlbumItemSchema, getByIdSchema } = require("../schemas/albumItemSchema");


router.post('/', validateSchema(createAlbumItemSchema), AlbumItemController.createAlbumItem);
router.get('/', AlbumItemController.getAlbumItems);
router.delete('/:id', validateSchema(getByIdSchema), AlbumItemController.deleteAlbumItem);

module.exports = router;
