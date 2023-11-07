const express = require('express');
const router = express.Router();
const AlbumItemController = require('../controller/albumItemController');

router.post('/', AlbumItemController.createAlbumItem);
router.get('/', AlbumItemController.getAlbumItems);
router.delete('/:id', AlbumItemController.deleteAlbumItem);

module.exports = router;
