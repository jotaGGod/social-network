const httpStatus = require('../utils/statusCodes');
const AlbumService = require('../services/albumService');

class AlbumController {
    async createAlbum(req, res) {
        const { description, target_id } = req.body;
        const album = await AlbumService.createAlbum(description, target_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Album created successfully!',
            data: album
        });
    }
    async getAlbumById(req, res) {
        const { id } = req.params;
        const album = await AlbumService.getAlbumById(id);
        return res.status(httpStatus.OK).json(album);
    }
    async getAlbums(req, res) {
        const album = await AlbumService.getAllAlbums();
        return res.status(httpStatus.OK).json(album);
    }
    async updateAlbum(req, res) {
        const { id } = req.params;
        const { description, target_id } = req.body;
        await AlbumService.updateAlbum(id, description, target_id);
        return res.status(httpStatus.OK).json({
            details: "Album updated successfully"
        });
    }
    async deleteAlbum(req, res) {
        const { id } = req.params;
        await AlbumService.deleteAlbum(id);
        return res.status(httpStatus.OK).json({
            details: "Album deleted successfully"
        });
    }
}

module.exports = new AlbumController();
