const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionTypeRepository {
    constructor(database) {
        this.database = database;
    }
    async create(description) {
        try {
            return this.database.create(description);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating reaction type');
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
            return this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting reaction type');
        }
    };
}

module.exports = ReactionTypeRepository;
