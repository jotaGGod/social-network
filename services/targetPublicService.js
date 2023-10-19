const Repository = require('../repositories/targetPublicRepository');

class TargetPublicService {
    async createTargetPublic(type) {

        const fileType = await Repository.create(type);

        return fileType;
    };

    async getAllTargetPublic() {
        return Repository.getAll();
    };

    async deleteTargetPublic(id) {
        return Repository.delete(id);
    };
}

module.exports = new TargetPublicService();