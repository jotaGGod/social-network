const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class TargetPublicRepository {
    constructor(database) {
        this.database = database;
    }
    async create(type) {
        try {
            return this.database.create(type);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating target public');
        }
    };
    async getAll(){
        return this.database.getAll()
    };
    async getById(id){
        return this.database.getById(id);
    };
    async delete(id) {
        try {
            return this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting a target public');
        }
    };
}

module.exports = TargetPublicRepository;
