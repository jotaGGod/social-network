const httpStatus = require('../utils/statusCodes');
const FileTypeService  = require('../services/fileTypeService');

class FileTypeController {
    async createFileType(req, res) {
        const { type } = req.body;
        const fileType = await FileTypeService.createFileType(type);
        return res.status(httpStatus.CREATED).json({
            message: 'File type created successfully!',
            data: fileType
        });
    }
    async getFileTypes(req, res) {
        const fileType = await FileTypeService.getAllFileType();
        return res.status(httpStatus.OK).json(fileType);
    }
    async deleteFileType(req, res) {
        const { id } = req.params;
        await FileTypeService.deleteFileType(id);
        return res.status(httpStatus.OK).json({
            details: "File type deleted successfully"
        });
    }
}

module.exports = new FileTypeController();
