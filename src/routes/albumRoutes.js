const express = require('express');
const validateSchema  = require('../middlewares/albumValidation');
const { createAlbumSchema, updateAlbumSchema, getByIdSchema } = require('../schemas/albumSchema');

function createAlbumRoutes(albumController) {
    const router = express.Router();
    router.post('/', validateSchema(createAlbumSchema), albumController.createAlbum.bind(albumController));
    router.get('/', albumController.getAlbums.bind(albumController));
    router.get('/:id', validateSchema(getByIdSchema), albumController.getAlbumById.bind(albumController));
    router.put('/:id', validateSchema(updateAlbumSchema), albumController.updateAlbum.bind(albumController));
    router.delete('/:id', validateSchema(getByIdSchema), albumController.deleteAlbum.bind(albumController));
    return router
}

module.exports = createAlbumRoutes;
