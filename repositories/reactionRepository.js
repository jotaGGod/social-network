const { assertIsInstanceOfContract } = require("./Interfaces/validation");

class ReactionRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(user_id, reaction_type_id, post_id) {
        return this.repository.create(user_id, reaction_type_id, post_id);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async getAll(){
        return this.repository.getAll();
    };
    async update(id, user_id, reaction_type_id, post_id) {
        this.repository.update(id, user_id, reaction_type_id, post_id);
    };
    async delete (id) {
        this.repository.delete(id);
    };
}

module.exports = ReactionRepository;
