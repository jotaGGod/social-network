const httpStatus = require('../utils/statusCodes');

class TargetPublicController {
    constructor(targetPublicService, tokenService) {
        this.targetPublicService = targetPublicService;
        this.tokenService = tokenService;
    }
    async createTargetPublic(req, res) {
        const { type } = req.body;
        await this.targetPublicService.createTargetPublic(type);
        return res.status(httpStatus.CREATED).json({
            message: 'Target public created successfully!'
        });
    }
    async getTargetPublics(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const targetPublic = await this.targetPublicService.getAllTargetPublic();
        return res.status(httpStatus.OK).json(targetPublic);
    }
    async deleteTargetPublic(req, res) {
        const { id } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        await this.targetPublicService.deleteTargetPublic(id);
        return res.status(httpStatus.OK).json({
            details: "Target public deleted successfully"
        });
    }
}

module.exports = TargetPublicController;
