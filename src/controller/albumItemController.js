const httpStatus = require('../utils/statusCodes');

class AlbumItemController {
    constructor(albumItemService) {
        this.albumItemService = albumItemService;
    }
    async createAlbumItem(req, res) {
        const { post_id, album_id } = req.body;
        const albumItem = await this.albumItemService.createAlbumItem(post_id, album_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Album item created successfully!',
            data: albumItem
        });
    }
    async getAlbumItems(req, res) {
        const albumItem = await this.albumItemService.getAllAlbumItem();
        return res.status(httpStatus.OK).json(albumItem);
    }
    async deleteAlbumItem(req, res) {
        const { id } = req.params;
        await this.albumItemService.deleteAlbumItem(id);
        return res.status(httpStatus.OK).json({
            details: "Album item deleted successfully"
        });
    }
}

module.exports = AlbumItemController;
