const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class AlbumItemRepository {
    constructor(database) {
        this.database = database;
    }
    async create(post_id, album_id) {
        try {
            return this.database.create(post_id, album_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating album item');
        }
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async delete (id) {
        try {
            await this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting album item');
        }
    };

}

module.exports = AlbumItemRepository;
