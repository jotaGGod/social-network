const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing users.
 * @class UserRepository
 */
class UserRepository {
    /**
     * Creates an instance of UserRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new user.
     * @param {string} fullName - The full name of the user.
     * @param {string} email - The email address of the user.
     * @param {string} hashedPassword - The hashed password of the user.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(fullName, email, hashedPassword) {
        return this.repository.create(fullName, email, hashedPassword);
    }

    /**
     * Retrieves a user by their email address.
     * @param {string} email - The email address of the user to retrieve.
     * @returns {Promise} A promise that resolves with the user details.
     */
    getByEmail(email) {
        return this.repository.getByEmail(email);
    }

    /**
     * Retrieves a user by their ID.
     * @param {number} userId - The ID of the user to retrieve.
     * @returns {Promise} A promise that resolves with the user details.
     */
    getById(userId) {
        return this.repository.getById(userId);
    }

    /**
     * Retrieves all users.
     * @returns {Promise} A promise that resolves with a list of all users.
     */
    getAll() {
        return this.repository.getAll();
    }

    /**
     * Updates a user's details.
     * @param {number} userId - The ID of the user to update.
     * @param {string} fullName - The updated full name of the user.
     * @param {string} email - The updated email address of the user.
     * @param {string} hashedPassword - The updated hashed password of the user.
     * @returns {Promise} A promise that resolves when the user is updated.
     */
    update(userId, fullName, email, hashedPassword) {
        return this.repository.update(userId, fullName, email, hashedPassword);
    }

    /**
     * Deletes a user by their ID.
     * @param {number} userId - The ID of the user to delete.
     * @returns {Promise} A promise that resolves when the user is deleted.
     */
    delete(userId) {
        return this.repository.delete(userId);
    }

    /**
     * Retrieves the news feed for a user.
     * @param {number} userId - The ID of the user whose feed is to be retrieved.
     * @returns {Promise} A promise that resolves with the user's news feed.
     */
    getFeedNews(userId) {
        return this.repository.getFeedNews(userId);
    }

    /**
     * Retrieves statistics for posts.
     * @returns {Promise} A promise that resolves with the post statistics.
     */
    getPostStatistics() {
        return this.repository.getPostStatistics();
    }
}

module.exports = UserRepository;
