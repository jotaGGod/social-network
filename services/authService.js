const httpStatus = require('../utils/statusCodes');
const ApiError = require('../utils/ApiError');
const userRepository = require('../repositories/userRepository');
const HashService = require("./cryptoService");
require('dotenv').config()


class authService {
    async loginUser (email, password) {
        const user = await userRepository.getByEmail(email);
        if(!user) throw new ApiError(httpStatus.UNAUTHORIZED,'Email not found');
        const isValidPassword = await HashService.compare(password, user.password);
        if(!isValidPassword) throw new ApiError(httpStatus.UNAUTHORIZED,'Password incorrect');
        return user
    };
}

module.exports = new authService();
