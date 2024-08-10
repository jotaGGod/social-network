const httpStatus = require('../utils/statusCodes');

class FileTypeController {
    /**
     * Creates an instance of FileTypeController.
     * @param {object} fileTypeService - The file type service.
     */
    constructor(fileTypeService) {
        this.fileTypeService = fileTypeService;
    }

    /**
     * Creates a new file type.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created file type.
     */
    async createFileType(req, res) {
        const { type } = req.body;
        const fileType = await this.fileTypeService.createFileType(type);
        return res.status(httpStatus.CREATED).json({
            message: 'File type created successfully!',
            data: fileType
        });
    }

    /**
     * Gets all file types.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of file types.
     */
    async getFileTypes(req, res) {
        const fileType = await this.fileTypeService.getAllFileType();
        return res.status(httpStatus.OK).json(fileType);
    }

    /**
     * Deletes a file type.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deleteFileType(req, res) {
        const { id } = req.params;
        await this.fileTypeService.deleteFileType(id);
        return res.status(httpStatus.OK).json({
            details: "File type deleted successfully"
        });
    }
}

module.exports = FileTypeController;
