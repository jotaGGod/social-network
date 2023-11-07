const Repository = require('../repositories/albumItemRepository');

class AlbumItemService {
    async createAlbumItem(post_id, album_id) {
        return await Repository.create(post_id, album_id);
    };
    async getAllAlbumItem() {
        return Repository.getAll();
    };
    async deleteAlbumItem(id) {
        return Repository.delete(id);
    };
}

module.exports = new AlbumItemService();
