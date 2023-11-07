const express = require('express');
const router = express.Router();
const AlbumController = require('../controller/albumController');
const Validations  = require('../middlewares/validationAlbum');
const albumSchema = require('../validation/albumValidation');

router.post('/', Validations.validation(albumSchema), AlbumController.createAlbum);
router.get('/', AlbumController.getAlbums);
router.get('/:id', AlbumController.getAlbumById);
router.put('/:id', Validations.validation(albumSchema), AlbumController.updateAlbum);
router.delete('/:id', AlbumController.deleteAlbum);

module.exports = router;
