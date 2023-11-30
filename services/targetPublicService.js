const Repository = require('../repositories/targetPublicRepository');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class TargetPublicService {
    async createTargetPublic(type) {
        return Repository.create(type);
    };
    async getAllTargetPublic() {
        return Repository.getAll();
    };
    async getById(id){
        const targetPublic = await Repository.getById(id);
        if (!targetPublic) throw new ApiError(httpStatus.NOT_FOUND, 'Target public not found.');
        return targetPublic;
    };
    async deleteTargetPublic(id) {
        await this.getById(id);
        return Repository.delete(id);
    };
}

module.exports = new TargetPublicService();
