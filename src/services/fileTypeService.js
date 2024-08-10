const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing file types.
 */
class FileTypeService {
    /**
     * Creates an instance of FileTypeService.
     * @param {Object} fileTypeRepository - The repository for file type data.
     */
    constructor(fileTypeRepository) {
        this.fileTypeRepository = fileTypeRepository;
    };

    /**
     * Creates a new file type.
     * @param {Object} newFileType - The file type data to create.
     * @returns {Promise<Object>} A promise that resolves to the created file type.
     */
    createFileType(newFileType) {
        return this.fileTypeRepository.create(newFileType);
    };

    /**
     * Retrieves a file type by its ID.
     * @param {number} fileTypeId - The ID of the file type to retrieve.
     * @throws {ApiError} If the file type is not found.
     * @returns {Promise<Object>} A promise that resolves to the file type with the specified ID.
     */
    async getById(fileTypeId) {
        const fileType = await this.fileTypeRepository.getById(fileTypeId);
        if (!fileType) throw new ApiError(httpStatus.NOT_FOUND, 'File type not found!');
        return fileType;
    }

    /**
     * Retrieves all file types.
     * @returns {Promise<Array>} A promise that resolves to an array of all file types.
     */
    getAllFileType() {
        return this.fileTypeRepository.getAll();
    };

    /**
     * Deletes a file type by its ID.
     * @param {number} fileTypeId - The ID of the file type to delete.
     * @throws {ApiError} If the file type is not found.
     * @returns {Promise<void>}
     */
    async deleteFileType(fileTypeId) {
        const fileType = await this.fileTypeRepository.getById(fileTypeId);
        if (!fileType) throw new ApiError(httpStatus.NOT_FOUND, 'File type not found!');
        await this.fileTypeRepository.delete(fileTypeId);
    };
}

module.exports = FileTypeService;
