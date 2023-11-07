const httpStatus = require('../utils/statusCodes');
const TargetPublicService = require('../services/targetPublicService');

class TargetPublicController {
    async createTargetPublic(req, res) {
        const { type } = req.body;
        const targetPublic = await TargetPublicService.createTargetPublic(type);
        return res.status(httpStatus.CREATED).json({
            message: 'Target public created successfully!',
            data: targetPublic
        });
    }
    async getTargetPublics(req, res) {
        const targetPublic = await TargetPublicService.getAllTargetPublic();
        return res.status(httpStatus.OK).json(targetPublic);
    }
    async deleteTargetPublic(req, res) {
        const { id } = req.params;
        await TargetPublicService.deleteTargetPublic(id);
        return res.status(httpStatus.OK).json({
            details: "Target public deleted successfully"
        });
    }
}

module.exports = new TargetPublicController();
