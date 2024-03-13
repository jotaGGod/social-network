const httpStatus = require('../utils/statusCodes');
const ApiError = require('../utils/ApiError');
const userRepository = require('../repositories/userRepository');
const HashService = require("./cryptoService");
require('dotenv').config()


class AuthenticateService {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }
    async authenticateLoginUser (email, password) {
        const user = await this.userRepository.getByEmail(email);
        if(!user) throw new ApiError(httpStatus.UNAUTHORIZED,'Email not found');
        const isValidPassword = await this.hashService.compare(password, user.password);
        if(!isValidPassword) throw new ApiError(httpStatus.UNAUTHORIZED,'Password incorrect');
        return user
    };
}

module.exports = AuthenticateService;
