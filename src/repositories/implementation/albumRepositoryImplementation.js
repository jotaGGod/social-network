const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IAlbumRepository } = require("../interfaces/albumRepositoryAbstract");

/**
 * Implementation of the album repository.
 *
 * This class provides the implementation of the methods defined in the `IAlbumRepository` interface for managing albums in the database.
 */
class AlbumRepositoryImplementation extends IAlbumRepository {

    /**
     * Creates a new album.
     *
     * @param {string} description - The description of the album.
     * @param {number} targetId - The ID of the target related to the album.
     * @returns {Promise<Object>} - Returns a Promise that resolves to the created album object.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(description, targetId) {
        try {
            const [album] = await db('album')
                .insert({
                    description: description,
                    target_id: targetId
                })
                .returning('*');
            return album;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a new album');
        }
    };

    /**
     * Retrieves an album by ID.
     *
     * @param {number} albumId - The ID of the album to be retrieved.
     * @returns {Promise<Object>} - Returns a Promise that resolves to the album object corresponding to the provided ID.
     */
    getById(albumId) {
        return db('album')
            .where({ id: albumId })
            .select('id', 'description', 'target_id', 'is_active')
            .first();
    };

    /**
     * Retrieves all albums related to a specific ID.
     *
     * @param {number} albumId - The ID related to the albums to be retrieved.
     * @returns {Promise<Array<Object>>} - Returns a list of albums corresponding to the provided ID.
     */
    getAll(albumId) {
        return db('album')
            .where({ id: albumId })
            .select('id', 'description', 'target_id', 'is_active');
    };

    /**
     * Updates an existing album.
     *
     * @param {number} albumId - The ID of the album to be updated.
     * @param {string} description - The new description of the album.
     * @param {number} targetId - The new ID of the target related to the album.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if the update fails.
     */
    async update(albumId, description, targetId) {
        try {
            await db.transaction(async (trx) => {
                await db('album')
                    .where({ id: albumId })
                    .update({
                        description,
                        target_id: targetId
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while updating album');
        }
    };

    /**
     * Deletes an album.
     *
     * @param {number} albumId - The ID of the album to be deleted.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(albumId) {
        try {
            await db.transaction(async (trx) => {
                await db('album')
                    .where({ id: albumId })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting album');
        }
    };
}

module.exports = AlbumRepositoryImplementation;
