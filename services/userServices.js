const Repository = require('../repositories/userRepository')

class UserService {
  async createUser(full_name, email, criptoPass) {
    return await Repository.createUser(full_name, email, criptoPass);
  };

  async loginUser(email, password) {
    return await Repository.login(email, password);
  }

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
