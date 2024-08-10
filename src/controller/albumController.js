const httpStatus = require('../utils/statusCodes');

class AlbumController {
    /**
     * Creates an instance of AlbumController.
     * @param {object} albumService - The album service.
     * @param {object} tokenService - The token service.
     */
    constructor(albumService, tokenService) {
        this.albumService = albumService;
        this.tokenService = tokenService;
    }

    /**
     * Creates a new album.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created album.
     */
    async createAlbum(req, res) {
        const { description, target_id: targetId } = req.body;
        const album = await this.albumService.createAlbum(description, targetId);
        return res.status(httpStatus.CREATED).json({
            message: 'Album created successfully!',
            data: album
        });
    }

    /**
     * Gets an album by ID.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The album.
     */
    async getAlbumById(req, res) {
        const { id: albumId } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const album = await this.albumService.getAlbumById(albumId);
        return res.status(httpStatus.OK).json(album);
    }

    /**
     * Gets all albums for a user.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of albums.
     */
    async getAlbums(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const album = await this.albumService.getAllAlbums(userId);
        return res.status(httpStatus.OK).json(album);
    }

    /**
     * Updates an album.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The updated album.
     */
    async updateAlbum(req, res) {
        const { id: albumId } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { description, target_id: targetId } = req.body;
        await this.albumService.updateAlbum(albumId, description, targetId);
        return res.status(httpStatus.OK).json({
            details: "Album updated successfully"
        });
    }

    /**
     * Deletes an album.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deleteAlbum(req, res) {
        const { id: albumId } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        await this.albumService.deleteAlbum(albumId);
        return res.status(httpStatus.OK).json({
            details: "Album deleted successfully"
        });
    }
}

module.exports = AlbumController;
