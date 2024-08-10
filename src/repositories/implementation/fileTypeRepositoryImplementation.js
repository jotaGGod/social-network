const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IFileTypeRepository } = require("../interfaces/fileTypeRepositoryAbstract");

/**
 * Implementation of the file type repository.
 *
 * This class provides the implementation of the methods defined in the `IFileTypeRepository` interface for managing file types in the database.
 */
class FileTypeRepositoryImplementation extends IFileTypeRepository {

    /**
     * Creates a new file type.
     *
     * @param {string} newFileType - The file type to be created.
     * @returns {Promise<number>} - Returns a Promise that resolves to the ID of the created file type.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(newFileType) {
        try {
            const [fileType] = await db.transaction(async (trx) => {
                return db('file_type')
                    .transacting(trx)
                    .insert({
                        type: newFileType,
                        is_active: true
                    });
            });
            return fileType;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a new file type');
        }
    }

    /**
     * Retrieves all file types.
     *
     * @returns {Promise<Array<Object>>} - A list of all file types.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    getAll() {
        return db('file_type')
            .select('id', 'type', 'is_active');
    }

    /**
     * Retrieves a file type by ID.
     *
     * @param {number} fileTypeId - The ID of the file type to be retrieved.
     * @returns {Promise<Object>} - The file type object corresponding to the provided ID.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    getById(fileTypeId) {
        return db('file_type')
            .where({ id: fileTypeId })
            .select('id', 'type', 'is_active')
            .first();
    }

    /**
     * Deletes a file type.
     *
     * @param {number} fileTypeId - The ID of the file type to be deleted.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(fileTypeId) {
        try {
            await db.transaction(async (trx) => {
                await db('file_type')
                    .where({ id: fileTypeId })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting a file type');
        }
    }
}

module.exports = FileTypeRepositoryImplementation;
