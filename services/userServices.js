const Repository = require('../repositories/userRepository')

class UserService {
  async createUser(full_name, email) {

    const user = await Repository.createUser(full_name, email);

    return user;
  };

  async getUserById(id) {
    return Repository.getById(id);
  };

  async getAllUsers() {
    return Repository.getAll();
  };

  async updateUser(req) {
    return Repository.update(req);
  };

  async delete(id) {
    return Repository.deleteUSer(id);
  };
}

module.exports = new UserService();
