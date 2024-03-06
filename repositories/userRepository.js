const { assertIsInstanceOfContract } = require("./interfaces/validation");

class UserRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(full_name, email, hashedPassword) {
        return this.repository.create(full_name, email, hashedPassword);
    };
    async getByEmail(email) {
        return this.repository.getByEmail(email);
    };
    async getById(id){
       return this.repository.getById(id);
    };
    async getAll(){
        return this.repository.getAll();
    };
    async update(id, full_name, email) {
        this.repository.update(id, full_name, email);
    };
    async delete (id) {
        this.repository.delete(id);
    };
    async getFeedNews(id) {
        return this.repository.getFeedNews(id);
    };
    async getPostStatistics() {
        return this.repository.getPostStatistics();
    };
}

module.exports = UserRepository;
