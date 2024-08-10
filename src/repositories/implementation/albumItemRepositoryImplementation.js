const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IAlbumItemRepository } = require("../interfaces/albumItemRepositoryAbstract");

/**
 * Implementation of the album item repository.
 *
 * This class provides the implementation of the methods defined in the `IAlbumItemRepository` interface for managing album items in the database.
 */
class AlbumItemRepositoryImplementation extends IAlbumItemRepository {

    /**
     * Creates a new album item.
     *
     * @param {number} postId - The ID of the post to be added to the album.
     * @param {number} albumItemId - The ID of the album to which the post will be added.
     * @returns {Promise<Object>} - Returns a Promise that resolves to the created album item object.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(postId, albumItemId) {
        try {
            return await db.transaction(async (trx) => {
                const [createdItem] = await db('Album_Item')
                    .insert({
                        post_id: postId,
                        album_id: albumItemId
                    })
                    .transacting(trx);
                return createdItem;
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    /**
     * Retrieves an album item by ID.
     *
     * @param {number} albumItemId - The ID of the album item to be retrieved.
     * @returns {Promise<Object>} - Returns a Promise that resolves to the album item object corresponding to the provided ID.
     * @throws {Error} - Throws an error if retrieval fails.
     */
    getById(albumItemId) {
        try {
            return db('Album_Item')
                .where({ id: albumItemId })
                .select(['id', 'post_id', 'album_id', 'is_active'])
                .first();
        } catch (err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while retrieving album item');
        }
    }

    /**
     * Retrieves all album items based on the album ID.
     *
     * @param {number} albumItemId - The ID of the album to filter items.
     * @returns {Promise<Array<Object>>} - A list of album items belonging to the provided album ID.
     * @throws {Error} - Throws an error if retrieval fails.
     */
    getAll(albumItemId) {
        return db('Album_Item')
            .where({ album_id: albumItemId })
            .select(['id', 'post_id', 'album_id', 'is_active']);
    }

    /**
     * Deletes an album item.
     *
     * @param {number} albumItemId - The ID of the album item to be deleted.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(albumItemId) {
        try {
            await db.transaction(async (trx) => {
                await db('Album_Item')
                    .update({ is_active: false })
                    .where({ id: albumItemId })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting album item');
        }
    }
}

module.exports = AlbumItemRepositoryImplementation;
