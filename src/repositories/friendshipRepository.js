const { assertIsInstanceOfContract } = require("./interfaces/validation");

class FriendshipRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(senderId, receiverId) {
        return this.repository.create(senderId, receiverId);
    };
    async getAll(userId){
        return this.repository.getAll(userId);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async delete(id){
        this.repository.delete(id);
    };
}

module.exports = FriendshipRepository;
