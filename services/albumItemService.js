const Repository = require('../repositories/albumItemRepository');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class AlbumItemService {
    async createAlbumItem(post_id, album_id) {
        return await Repository.create(post_id, album_id);
    };
    async getAllAlbumItem() {
        return Repository.getAll();
    };
    async deleteAlbumItem(id) {
        const albumItem = await Repository.getById(id);
        if (!albumItem) throw new ApiError(httpStatus.NOT_FOUND, 'Album item not found');
        return Repository.delete(id);
    };
}

module.exports = new AlbumItemService();
