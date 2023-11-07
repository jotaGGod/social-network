const Repository = require('../repositories/userRepository');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const HashService = require("./hashService")

class UserService {
  async createUser(full_name, email, password) {
    const emailAlreadyExists = await Repository.getByEmail(email);
    if (emailAlreadyExists) throw new ApiError(httpStatus.CONFLICT,'Email already taken');
    const hashedPassword = await HashService.hash(password);
    return Repository.createUser(full_name, email, hashedPassword);
  };
  async loginUser(email, password) {
    return Repository.login(email, password);
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
