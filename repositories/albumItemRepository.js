const {assertIsInstanceOfContract} = require("./Interfaces/albumItemRepositoryAbstract");

class AlbumItemRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(post_id, album_id) {
        return this.repository.create(post_id, album_id);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async getAll(){
        return this.repository.getAll();
    };
    async delete (id) {
        this.repository.delete(id);
    };
}

module.exports = AlbumItemRepository;
