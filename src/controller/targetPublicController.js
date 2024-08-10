const httpStatus = require('../utils/statusCodes');

class TargetPublicController {
    /**
     * Creates an instance of TargetPublicController.
     * @param {object} targetPublicService - The target public service.
     * @param {object} tokenService - The token service.
     */
    constructor(targetPublicService, tokenService) {
        this.targetPublicService = targetPublicService;
        this.tokenService = tokenService;
    }

    /**
     * Creates a new target public.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created target public.
     */
    async createTargetPublic(req, res) {
        const { type } = req.body;
        const targetPublic = await this.targetPublicService.createTargetPublic(type);
        return res.status(httpStatus.CREATED).json({
            message: 'Target public created successfully!',
            data: targetPublic
        });
    }

    /**
     * Gets all target publics.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of target publics.
     */
    async getTargetPublic(req, res) {
        const targetPublic = await this.targetPublicService.getAllTargetPublic();
        return res.status(httpStatus.OK).json(targetPublic);
    }

    /**
     * Deletes a target public.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deleteTargetPublic(req, res) {
        const { id } = req.params;
        await this.targetPublicService.deleteTargetPublic(id);
        return res.status(httpStatus.OK).json({
            details: "Target public deleted successfully"
        });
    }
}

module.exports = TargetPublicController;
