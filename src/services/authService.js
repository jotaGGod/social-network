const httpStatus = require('../utils/statusCodes');
const ApiError = require('../utils/ApiError');
require('dotenv').config();

/**
 * Service class for user authentication.
 */
class AuthenticateService {
    /**
     * Creates an instance of AuthenticateService.
     * @param {Object} userRepository - The repository for user data.
     * @param {Object} hashService - The service for password hashing and comparison.
     */
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    };

    /**
     * Authenticates a user based on email and password.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @throws {ApiError} If the email is not found or the password is incorrect.
     * @returns {Promise<number>} The ID of the authenticated user.
     */
    async authenticateLoginUser(email, password) {
        const user = await this.userRepository.getByEmail(email);
        if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password incorrect');
        const isValidPassword = await this.hashService.compare(password, user.password);
        if (!isValidPassword) throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password incorrect');
        return user.id;
    };
}

module.exports = AuthenticateService;
