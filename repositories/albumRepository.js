const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class AlbumRepository {
    constructor(database) {
        this.database = database;
    }
    async create(description, target_id) {
        try {
            return this.database.create(description, target_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating a new album');
        }
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, description, target_id) {
        try {
            this.database.update(id, description, target_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating album');
        }
    };
    async delete (id) {
        try {
            this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting album');
        }
    };
}

module.exports = AlbumRepository;
