const Repository = require('../repositories/albumRepository');
const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

class AlbumService {
    async createAlbum(description, target_id) {
        return await Repository.create(description, target_id);
    };
    async getAlbumById(id) {
        const album = await Repository.getById(id);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        return album;
    };
    async getAllAlbums() {
        return Repository.getAll();
    };
    async updateAlbum(id, description, target_id) {
        const album = await Repository.getById(id);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        return Repository.update(id, description, target_id);
    };
    async deleteAlbum(id) {
        const album = await Repository.getById(id);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        return Repository.delete(id);
    };
}

module.exports = new AlbumService();
