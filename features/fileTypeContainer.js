const FileTypeRepositoryImplementation = require("../repositories/mySql/fileTypeRepositoryImplementation");
const FileTypeRepository = require("../repositories/fileTypeRepository");
const FileTypeService = require("../services/fileTypeService");
const FileTypeController = require("../controller/fileTypeController");
const createFileTypeRoutes = require("../routes/fileTypeRoutes");


function configureFileTypeContainer() {
    const fileTypeRepositoryImplementation = new FileTypeRepositoryImplementation();
    const fileTypeRepository = new FileTypeRepository(fileTypeRepositoryImplementation);
    const fileTypeService = new FileTypeService(fileTypeRepository);
    const fileTypeController = new FileTypeController(fileTypeService);
    const fileTypeRoutes = createFileTypeRoutes(fileTypeController);
    return { fileTypeRoutes }
}

module.exports = configureFileTypeContainer;
