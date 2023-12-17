const express = require('express');
const router = express.Router();
const AlbumController = require('../controller/albumController');
const validate  = require('../middlewares/albumValidation');
const { createAlbumSchema, updateAlbumSchema, getByIdSchema } = require('../schemas/albumValidation');

router.post('/', validate(createAlbumSchema), AlbumController.createAlbum);
router.get('/', AlbumController.getAlbums);
router.get('/:id', validate(getByIdSchema), AlbumController.getAlbumById);
router.put('/:id', validate(updateAlbumSchema), AlbumController.updateAlbum);
router.delete('/:id', validate(getByIdSchema), AlbumController.deleteAlbum);

module.exports = router;
