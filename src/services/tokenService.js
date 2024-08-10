const jwt = require('jsonwebtoken');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing JWT tokens.
 */
class TokenService {
    /**
     * Creates an instance of TokenService.
     * @param {Object} tokenRepository - The repository for token data.
     * @param {Object} hashService - The service for hashing and comparing hashes.
     */
    constructor(tokenRepository, hashService) {
        this.tokenRepository = tokenRepository;
        this.hashService = hashService;
    }

    /**
     * Generates authentication tokens for a user.
     * @param {number} user - The ID of the user for whom to generate tokens.
     * @returns {Promise<Object>} A promise that resolves to an object containing the access token and refresh token.
     */
    async generateAuthTokens(user) {
        const payload = { id: user };
        const token = await this.generateToken(payload, process.env.JWT_SECRET, '2h');
        const refreshToken = await this.generateToken(payload, process.env.JWT_SECRET, '10h');
        const hashedRefreshToken = await this.hashService.hash(refreshToken);
        await this.tokenRepository.revokeTokenByUserId(user);
        await this.tokenRepository.create(hashedRefreshToken, user);
        return { token, refreshToken };
    }

    /**
     * Generates a JWT token.
     * @param {Object} payload - The payload to include in the token.
     * @param {string} secret - The secret key to sign the token.
     * @param {string} expiresIn - The expiration time for the token (e.g., '2h').
     * @returns {Promise<string>} A promise that resolves to the generated token.
     */
    async generateToken(payload, secret, expiresIn) {
        return jwt.sign(payload, secret, { expiresIn });
    }

    /**
     * Extracts the user ID from a token.
     * @param {string} token - The token to verify.
     * @returns {Promise<number>} A promise that resolves to the user ID.
     * @throws {ApiError} If the token is invalid.
     */
    async getIdFromToken(token) {
        const { id: userId } = await this.verifyToken(token);
        if (!userId) throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not valid');
        return userId;
    }

    /**
     * Generates a new access token using a refresh token.
     * @param {string} refreshToken - The refresh token to validate.
     * @returns {Promise<string>} A promise that resolves to the new access token.
     * @throws {ApiError} If the refresh token is invalid.
     */
    async generateRefreshToken(refreshToken) {
        const userId = await this.getIdFromToken(refreshToken);
        const oldRefreshToken = await this.tokenRepository.getTokenByUserId(userId);
        const isValidToken = await this.hashService.compare(refreshToken, oldRefreshToken.value);
        if (!isValidToken) throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token not valid');
        const newAccessToken = await this.generateToken({ id: userId }, process.env.JWT_SECRET, '2h');
        const hashedNewAccessToken = await this.hashService.hash(newAccessToken);
        await this.tokenRepository.updateById(oldRefreshToken.id, hashedNewAccessToken);
        return newAccessToken;
    }

    /**
     * Verifies a JWT token.
     * @param {string} token - The token to verify.
     * @returns {Promise<Object>} A promise that resolves to the decoded token payload.
     * @throws {ApiError} If the token is invalid or verification fails.
     */
    async verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
        }
    }
}

module.exports = TokenService;
