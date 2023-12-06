const jwt = require('jsonwebtoken');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const TokenRepository = require('../repositories/tokenRepository');
const HashService = require("./cryptoService");

const secret = 'mySecret1234'

class TokenService {
    async generateAuthTokens(user){
        const payload = { id: user.id };
        const token = await this.generateToken(payload, secret, '15s');
        const refreshToken = await this.generateToken(payload, secret, '2h');
        const hashedRefreshToken = await HashService.hash(refreshToken);
        await TokenRepository.revokeTokenByUserId(user.id);
        await TokenRepository.createToken(hashedRefreshToken, user.id);
        return { token, refreshToken }
    };
    async generateToken(payload, secret, expiresIn){
        return jwt.sign(payload, secret, {expiresIn: expiresIn})
    };
    async generateRefreshToken(token){
        const { id: userId } = await this.verifyToken(token, process.env.JWT_SECRET);
        if(!userId) throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token not valid');
        const oldRefreshToken = await TokenRepository.getTokenByUserId(userId);
        const isValidToken = await HashService.compare(token, oldRefreshToken.value);
        if(!isValidToken) throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token not valid');
        const newAccessToken = await this.generateToken({userId: userId}, process.env.JWT_SECRET, '5d');
        const hashedNewAccessToken = await HashService.hash(newAccessToken);
        await TokenRepository.updateById(oldRefreshToken.id, hashedNewAccessToken);
        return newAccessToken
    }
    async verifyToken(token){
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            throw new ApiError(httpStatus.UNAUTHORIZED, error);
        }
    };
}

module.exports = new TokenService();
