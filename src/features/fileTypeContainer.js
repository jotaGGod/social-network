const FileTypeRepositoryImplementation = require("../repositories/implementation/fileTypeRepositoryImplementation");
const FileTypeRepository = require("../repositories/fileTypeRepository");
const FileTypeService = require("../services/fileTypeService");
const FileTypeController = require("../controller/fileTypeController");
const createFileTypeRoutes = require("../routes/fileTypeRoutes");
const { IFileTypeRepository } = require("../repositories/interfaces/fileTypeRepositoryAbstract");

/**
 * Configures the file type container.
 * @returns {object} The configured file type routes.
 */
function configureFileTypeContainer() {
    // Instantiate the file type repository implementation
    const fileTypeRepositoryImplementation = new FileTypeRepositoryImplementation();

    // Create the file type repository instance
    const fileTypeRepository = new FileTypeRepository(fileTypeRepositoryImplementation, IFileTypeRepository);

    // Create the file type service instance
    const fileTypeService = new FileTypeService(fileTypeRepository);

    // Create the file type controller instance
    const fileTypeController = new FileTypeController(fileTypeService);

    // Create the file type routes
    const fileTypeRoutes = createFileTypeRoutes(fileTypeController);

    return { fileTypeRoutes };
}

module.exports = configureFileTypeContainer;
