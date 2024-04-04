const jwt = require('jsonwebtoken');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

const secret = 'mySecret1234'

class TokenService {
    constructor(tokenRepository, hashService) {
        this.tokenRepository = tokenRepository;
        this.hashService = hashService;
    }
    async generateAuthTokens(user){
        try{
            const payload = { id: user.id };
            const token = await this.generateToken(payload, secret, '1h');
            const refreshToken = await this.generateToken(payload, secret, '2h');
            const hashedRefreshToken = await this.hashService.hash(refreshToken);
            await this.tokenRepository.revokeTokenByUserId(user.id);
            await this.tokenRepository.create(hashedRefreshToken, user.id);
            return { token, refreshToken }
        }catch(err){
            console.log(err);
        }        
    };
    async generateToken(payload, secret, expiresIn){
        return jwt.sign(payload, secret, {expiresIn: expiresIn})
    };
    async generateRefreshToken(token){
        const { id: userId } = await this.verifyToken(token, process.env.JWT_SECRET);
        if(!userId) throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token not valid');
        const oldRefreshToken = await this.tokenRepository.getTokenByUserId(userId);
        const isValidToken = await this.hashService.compare(token, oldRefreshToken.value);
        if(!isValidToken) throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token not valid');
        const newAccessToken = await this.generateToken({userId: userId}, process.env.JWT_SECRET, '5d');
        const hashedNewAccessToken = await this.hashService.hash(newAccessToken);
        await this.tokenRepository.updateById(oldRefreshToken.id, hashedNewAccessToken);
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

module.exports = TokenService;
