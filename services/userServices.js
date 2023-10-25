const Repository = require('../repositories/userRepository')

class UserService {
  async createUser(full_name, email) {
    return await Repository.createUser(full_name, email);
  };

  async getUserById(id) {
    return Repository.getById(id);
  };

  async getAllUsers() {
    return Repository.getAll();
  };

  async updateUser(id, full_name, email) {
    return Repository.update(id, full_name, email);
  };

  async deleteUser(id) {
    return Repository.delete(id);
  };
}

module.exports = new UserService();
