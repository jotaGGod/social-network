const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing user-related operations.
 */
class UserService {
  /**
   * Creates an instance of UserService.
   * @param {Object} userRepository - The repository for user data.
   * @param {Object} hashService - The service for hashing and comparing passwords.
   */
  constructor(userRepository, hashService) {
    this.userRepository = userRepository;
    this.hashService = hashService;
  }

  /**
   * Creates a new user.
   * @param {string} fullName - The full name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} A promise that resolves to the created user.
   * @throws {ApiError} If the email is already taken.
   */
  async create(fullName, email, password) {
    const isEmailTaken = await this.userRepository.getByEmail(email);
    if (isEmailTaken) throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
    const hashedPassword = await this.hashService.hash(password);
    return this.userRepository.create(fullName, email, hashedPassword);
  }

  /**
   * Retrieves a user by their ID.
   * @param {number} id - The ID of the user.
   * @returns {Promise<Object>} A promise that resolves to the user with the specified ID.
   * @throws {ApiError} If the user is not found.
   */
  async getUserById(id) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    return user;
  }

  /**
   * Checks if an email is already taken.
   * @param {string} email - The email to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the email is taken.
   */
  async isEmailTaken(email) {
    const existingUser = await this.userRepository.getByEmail(email);
    return !!existingUser;
  }

  /**
   * Retrieves all users.
   * @returns {Promise<Array>} A promise that resolves to an array of users.
   * @throws {ApiError} If no users are found.
   */
  async getAllUsers() {
    const users = await this.userRepository.getAll();
    if (!users) throw new ApiError(httpStatus.NOT_FOUND, 'No users found');
    return users;
  }

  /**
   * Updates a user by their ID.
   * @param {number} id - The ID of the user to update.
   * @param {string} fullName - The new full name of the user.
   * @param {string} email - The new email of the user.
   * @returns {Promise<void>}
   * @throws {ApiError} If the user is not found or the email is already taken.
   */
  async updateUserById(id, fullName, email) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    const isEmailTaken = await this.isEmailTaken(email);
    if (isEmailTaken) throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
    await this.userRepository.update(id, fullName, email);
  }

  /**
   * Deletes a user by their ID.
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<void>}
   * @throws {ApiError} If the user is not found.
   */
  async deleteUser(id) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    await this.userRepository.delete(id);
  }

  /**
   * Retrieves the feed news for a specific user.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Array>} A promise that resolves to an array of feed news.
   */
  async getFeedNews(userId) {
    return this.userRepository.getFeedNews(userId);
  }

  /**
   * Retrieves post statistics.
   * @returns {Promise<Object>} A promise that resolves to the post statistics.
   * @throws {ApiError} If no post statistics are found.
   */
  async getPostStatistics() {
    const postStatistics = await this.userRepository.getPostStatistics();
    if (!postStatistics) throw new ApiError(httpStatus.NOT_FOUND, 'No post statistics found');
    return postStatistics;
  }
}

module.exports = UserService;
