const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class TargetPublicRepository {
    constructor(database) {
        this.database = database;
    }
    async create(type) {
        return this.database.create(type);
    };
    async getAll(){
        return this.database.getAll()
    };
    async getById(id){
        return this.database.getById(id);
    };
    async delete(id) {
        return this.database.delete(id);
    };
}

module.exports = TargetPublicRepository;
