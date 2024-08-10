const bcrypt = require('bcrypt');

/**
 * Service class for cryptographic operations using bcrypt.
 */
class CryptoService {
    /**
     * Hashes a given input string.
     * @param {string} input - The input string to be hashed.
     * @returns {Promise<string>} A promise that resolves to the hashed output.
     */
    hash(input) {
        return bcrypt.hash(input, 10);
    };

    /**
     * Compares a given input string with a hashed output.
     * @param {string} input - The input string to compare.
     * @param {string} hashedOutput - The hashed output to compare against.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the input matches the hashed output.
     */
    compare(input, hashedOutput) {
        return bcrypt.compare(input, hashedOutput);
    };
}

module.exports = CryptoService;
