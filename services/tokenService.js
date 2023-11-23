const jwt = require('jsonwebtoken');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

const secret = 'mySecret1234'

class generateTokens {
    async generateAuthTokens(user){
        const payload = {
            id: user.id,
            name: user.full_name
        }
        const token = jwt.sign(payload, secret, {expiresIn: '1h'});
        console.log('token gerado :', token);
        return token
    }
    async verifyToken(token){
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
        }
    }
}

module.exports = new generateTokens();
