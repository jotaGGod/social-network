const Repository = require('../repositories/targetPublicRepository');

class TargetPublicService {
    async createTargetPublic(type) {
        return await Repository.create(type);
    };
    async getAllTargetPublic() {
        return Repository.getAll();
    };
    async deleteTargetPublic(id) {
        return Repository.delete(id);
    };
}

module.exports = new TargetPublicService();
