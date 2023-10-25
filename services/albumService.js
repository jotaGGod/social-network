const Repository = require('../repositories/albumRepository')

class AlbumService {
    async createAlbum(description, target_id) {
        return await Repository.create(description, target_id);
    };

    async getAlbumById(id) {
        return Repository.getById(id);
    };

    async getAllAlbums() {
        return Repository.getAll();
    };

    async updateAlbum(id, description, target_id) {
        return Repository.update(id, description, target_id);
    };

    async deleteAlbum(id) {
        return Repository.delete(id);
    };
}

module.exports = new AlbumService();
