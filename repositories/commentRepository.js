const {assertIsInstanceOfContract} = require("./Interfaces/commentRepositoryAbstract");

class CommentRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(description, user_id, post_id) {
        return this.repository.create(description, user_id, post_id);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async getAll(){
        return this.repository.getAll();
    };
    async update(id, description, user_id, post_id) {
        this.repository.update(id, description, user_id, post_id);
    };
    async delete (id) {
        this.repository.delete(id);
    };
}

module.exports = CommentRepository;
