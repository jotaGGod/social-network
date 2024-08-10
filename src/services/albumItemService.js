const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing album items.
 */
class AlbumItemService {
    /**
     * Creates an instance of AlbumItemService.
     * @param {Object} albumItemRepository - The repository for album items.
     */
    constructor(albumItemRepository) {
        this.albumItemRepository = albumItemRepository;
    };

    /**
     * Creates a new album item.
     * @param {number} postId - The ID of the post to associate with the album item.
     * @param {number} albumItemId - The ID of the album item to create.
     * @returns {Promise<Object>} The created album item.
     */
    createAlbumItem(postId, albumItemId) {
        return this.albumItemRepository.create(postId, albumItemId);
    };

    /**
     * Retrieves all album items associated with a given album item ID.
     * @param {number} albumItemId - The ID of the album item to retrieve associated items for.
     * @returns {Promise<Array>} A list of album items.
     */
    getAllAlbumItem(albumItemId) {
        return this.albumItemRepository.getAll(albumItemId);
    };

    /**
     * Deletes an album item by its ID.
     * @param {number} albumItemId - The ID of the album item to delete.
     * @throws {ApiError} If the album item is not found.
     * @returns {Promise<void>}
     */
    async deleteAlbumItem(albumItemId) {
        const albumItem = await this.albumItemRepository.getById(albumItemId);
        if (!albumItem) throw new ApiError(httpStatus.NOT_FOUND, 'Album item not found');
        await this.albumItemRepository.delete(albumItemId);
    };
}

module.exports = AlbumItemService;
