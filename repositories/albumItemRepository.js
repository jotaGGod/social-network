const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class AlbumItemRepository {
    constructor(database) {
        this.database = database;
    }
    async create(post_id, album_id) {
        return this.database.create(post_id, album_id);
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async delete (id) {
        this.database.delete(id);
    };

}

module.exports = AlbumItemRepository;
