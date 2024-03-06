const { assertIsInstanceOfContract } = require("./Interfaces/validation");

class PostRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(description, user_id, target_id, type_id) {
        return this.repository.create(description, user_id, target_id, type_id);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async getAll(){
        return this.repository.getAll();
    };
    async update(id, description, user_id, target_id, type_id) {
        this.repository.update(id, description, user_id, target_id, type_id);
    };
    async delete (id) {
        this.repository.delete(id);
    };
}

module.exports = PostRepository;
