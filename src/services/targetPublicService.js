const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing target publics.
 */
class TargetPublicService {
    /**
     * Creates an instance of TargetPublicService.
     * @param {Object} targetPublicRepository - The repository for target public data.
     */
    constructor(targetPublicRepository) {
        this.targetPublicRepository = targetPublicRepository;
    }

    /**
     * Creates a new target public.
     * @param {Object} newTargetPublicType - The data for the new target public.
     * @returns {Promise<Object>} A promise that resolves to the created target public.
     */
    createTargetPublic(newTargetPublicType) {
        return this.targetPublicRepository.create(newTargetPublicType);
    }

    /**
     * Retrieves all target publics.
     * @returns {Promise<Array>} A promise that resolves to an array of all target publics.
     */
    getAllTargetPublic() {
        return this.targetPublicRepository.getAll();
    }

    /**
     * Retrieves a target public by its ID.
     * @param {number} targetPublicId - The ID of the target public to retrieve.
     * @throws {ApiError} If the target public is not found.
     * @returns {Promise<Object>} A promise that resolves to the target public with the specified ID.
     */
    async getById(targetPublicId) {
        const targetPublic = await this.targetPublicRepository.getById(targetPublicId);
        if (!targetPublic) throw new ApiError(httpStatus.NOT_FOUND, 'Target public not found.');
        return targetPublic;
    }

    /**
     * Deletes a target public by its ID.
     * @param {number} targetPublicId - The ID of the target public to delete.
     * @throws {ApiError} If the target public is not found.
     * @returns {Promise<void>} A promise that resolves when the target public is deleted.
     */
    async deleteTargetPublic(targetPublicId) {
        const targetPublic = await this.targetPublicRepository.getById(targetPublicId);
        if (!targetPublic) throw new ApiError(httpStatus.NOT_FOUND, 'Target public not found.');
        await this.targetPublicRepository.delete(targetPublicId);
    }
}

module.exports = TargetPublicService;
