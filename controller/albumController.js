const httpStatus = require('../utils/statusCodes');

class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    async createAlbum(req, res) {
        const { description, target_id } = req.body;
        const album = await this.albumService.createAlbum(description, target_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Album created successfully!',
            data: album
        });
    }
    async getAlbumById(req, res) {
        const { id } = req.params;
        const album = await this.albumService.getAlbumById(id);
        return res.status(httpStatus.OK).json(album);
    }
    async getAlbums(req, res) {
        const album = await this.albumService.getAllAlbums();
        return res.status(httpStatus.OK).json(album);
    }
    async updateAlbum(req, res) {
        const { id } = req.params;
        const { description, target_id } = req.body;
        await this.albumService.updateAlbum(id, description, target_id);
        return res.status(httpStatus.OK).json({
            details: "Album updated successfully"
        });
    }
    async deleteAlbum(req, res) {
        const { id } = req.params;
        await this.albumService.deleteAlbum(id);
        return res.status(httpStatus.OK).json({
            details: "Album deleted successfully"
        });
    }
}

module.exports = AlbumController;
