const httpStatus = require('../utils/statusCodes');

class AlbumItemController {
    /**
     * Creates an instance of AlbumItemController.
     * @param {object} albumItemService - The album item service.
     * @param {object} tokenService - The token service.
     */
    constructor(albumItemService, tokenService) {
        this.albumItemService = albumItemService;
        this.tokenService = tokenService;
    }

    /**
     * Creates a new album item.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created album item.
     */
    async createAlbumItem(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { post_id: postId, album_id: albumItemId } = req.body;
        const albumItem = await this.albumItemService.createAlbumItem(postId, albumItemId);
        return res.status(httpStatus.CREATED).json({
            message: 'Album item created successfully!',
            data: albumItem
        });
    }

    /**
     * Gets all album items for a user.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of album items.
     */
    async getAlbumItems(req, res) {
        const { authorization: token } = req.headers;
        const albumItemId = await this.tokenService.getIdFromToken(token);
        const albumItem = await this.albumItemService.getAllAlbumItem(albumItemId);
        return res.status(httpStatus.OK).json(albumItem);
    }

    /**
     * Deletes an album item.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deleteAlbumItem(req, res) {
        const { id: albumItemId } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        await this.albumItemService.deleteAlbumItem(albumItemId);
        return res.status(httpStatus.OK).json({
            details: "Album item deleted successfully"
        });
    }
}

module.exports = AlbumItemController;
