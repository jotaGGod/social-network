const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

/**
 * Service class for managing albums.
 */
class AlbumService {
    /**
     * Creates an instance of AlbumService.
     * @param {Object} albumRepository - The repository for albums.
     */
    constructor(albumRepository) {
        this.albumRepository = albumRepository;
    };

    /**
     * Creates a new album.
     * @param {string} description - The description of the album.
     * @param {number} targetId - The ID of the target associated with the album.
     * @returns {Promise<Object>} The created album.
     */
    createAlbum(description, targetId) {
        return this.albumRepository.create(description, targetId);
    };

    /**
     * Retrieves an album by its ID.
     * @param {number} albumId - The ID of the album to retrieve.
     * @throws {ApiError} If the album is not found.
     * @returns {Promise<Object>} The album.
     */
    async getAlbumById(albumId) {
        const album = await this.albumRepository.getById(albumId);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        return album;
    };

    /**
     * Retrieves all albums associated with a given ID.
     * @param {number} albumId - The ID of the album to retrieve associated items for.
     * @returns {Promise<Array>} A list of albums.
     */
    getAllAlbums(albumId) {
        return this.albumRepository.getAll(albumId);
    };

    /**
     * Updates an existing album.
     * @param {number} albumId - The ID of the album to update.
     * @param {string} description - The new description of the album.
     * @param {number} targetId - The new target ID associated with the album.
     * @throws {ApiError} If the album is not found.
     * @returns {Promise<void>}
     */
    async updateAlbum(albumId, description, targetId) {
        const album = await this.albumRepository.getById(albumId);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        await this.albumRepository.update(albumId, description, targetId);
    };

    /**
     * Deletes an album by its ID.
     * @param {number} albumId - The ID of the album to delete.
     * @throws {ApiError} If the album is not found.
     * @returns {Promise<void>}
     */
    async deleteAlbum(albumId) {
        const album = await this.albumRepository.getById(albumId);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        await this.albumRepository.delete(albumId);
    };
}

module.exports = AlbumService;
