const express = require('express');
const router = express.Router();
const AlbumController = require('../controller/albumController');
const validateSchema  = require('../middlewares/albumValidation');
const { createAlbumSchema, updateAlbumSchema, getByIdSchema } = require('../schemas/albumSchema');

router.post('/', validateSchema(createAlbumSchema), AlbumController.createAlbum);
router.get('/', AlbumController.getAlbums);
router.get('/:id', validateSchema(getByIdSchema), AlbumController.getAlbumById);
router.put('/:id', validateSchema(updateAlbumSchema), AlbumController.updateAlbum);
router.delete('/:id', validateSchema(getByIdSchema), AlbumController.deleteAlbum);

module.exports = router;
