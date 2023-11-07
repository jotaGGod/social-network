const httpStatus = require('../utils/statusCodes');
const AlbumItemService = require('../services/albumItemService');

class AlbumItemController {
    async createAlbumItem(req, res) {
        const { post_id, album_id } = req.body;
        const albumItem = await AlbumItemService.createAlbumItem(post_id, album_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Album item created successfully!',
            data: albumItem
        });
    }
    async getAlbumItems(req, res) {
        const albumItem = await AlbumItemService.getAllAlbumItem();
        return res.status(httpStatus.OK).json(albumItem);
    }
    async deleteAlbumItem(req, res) {
        const { id } = req.params;
        await AlbumItemService.deleteAlbumItem(id);
        return res.status(httpStatus.OK).json({
            details: "Album item deleted successfully"
        });
    }
}

module.exports = new AlbumItemController();
