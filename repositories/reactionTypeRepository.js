const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionTypeRepository {
    constructor(database) {
        this.database = database;
    }
    async create(description) {
        return this.database.create(description);
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async delete (id) {
        return this.database.delete(id);
    };
}

module.exports = ReactionTypeRepository;
