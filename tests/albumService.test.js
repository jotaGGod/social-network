const AlbumService = require('../src/services/albumService');
const httpStatus = require('../src/utils/statusCodes');
const ApiError = require("../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};
describe('AlbumService', () => {
    let albumService;
    beforeEach(() => {
        albumService = new AlbumService(mockRepository);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createAlbum', () => {
        it('should create an album', async () => {
            const createdAlbum = {
                "id": 1,
                "description": "pascoa",
                "target_id": 1,
                "is_active": true
            };
            mockRepository.create.mockResolvedValueOnce(createdAlbum);
            const album = await albumService.createAlbum("pascoa", 1);
            expect(mockRepository.create).toHaveBeenCalledWith("pascoa", 1);
            expect(album).toEqual(createdAlbum);
        });
    });
    describe('createAlbum', () => {
        it('shouldnt create an album', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating album'));
            await expect(albumService.createAlbum("Skate na rua", 2)).rejects.toThrowError('Error while creating album');
            expect(mockRepository.create).toHaveBeenCalledWith("Skate na rua", 2);
        });
    });
    describe('getAllAlbums', () => {
        it('should get all albums', async () => {
            const albumValues = [
                {
                    "id": 1,
                    "description": "pascoa",
                    "target_id": 1,
                    "is_active": true
                },
                {
                    "id": 2,
                    "description": "Férias nas Maldivas",
                    "target_id": 2,
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(albumValues);
            const result = await albumService.getAllAlbums();
            expect(result).toEqual(albumValues);
        });
    });
    describe('getAlbumById', () => {
        it('should get an album by ID', async () => {
            const albumValue = {
                "id": 1,
                "description": "pascoa",
                "target_id": 1,
                "is_active": true
            };
            const albumId = 1;
            mockRepository.getById.mockResolvedValueOnce(albumValue);
            const result = await albumService.getAlbumById(albumId);
            expect(result).toEqual(albumValue);
        });

        it('should throw an error when album not found by ID', async () => {
            const albumId = 245; // Non-existing album ID
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(albumService.getAlbumById(albumId)).rejects.toThrowError('Album not found!');
            expect(mockRepository.getById).toHaveBeenCalledWith(albumId);
        });
    });
    describe('updateAlbum', () => {
        it('should update an existing album', async () => {
            const existingAlbumId = 1;
            const updatedDescription = "Updated Album Description";
            const updatedTargetId = 2;
            mockRepository.getById.mockResolvedValueOnce({ id: existingAlbumId });
            await albumService.updateAlbum(existingAlbumId, updatedDescription, updatedTargetId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingAlbumId);
            expect(mockRepository.update).toHaveBeenCalledWith(existingAlbumId, updatedDescription, updatedTargetId);
        });
        it('should throw an error when trying to update a non-existing album', async () => {
            const nonExistingAlbumId = 55; // Non-existing album ID
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(albumService.updateAlbum(nonExistingAlbumId, "Updated Description", 2)).rejects.toThrowError('Album not found!');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingAlbumId);
            expect(mockRepository.update).not.toHaveBeenCalled();
        });
    });
    describe('deleteAlbum', () => {
        it('should delete an existing album', async () => {
            const existingAlbumId = 1;
            mockRepository.getById.mockResolvedValueOnce({ id: existingAlbumId });
            await albumService.deleteAlbum(existingAlbumId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingAlbumId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingAlbumId);
        });
        it('should throw an error when trying to delete a non-existing album', async () => {
            const nonExistingAlbumId = 124;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(albumService.deleteAlbum(nonExistingAlbumId)).rejects.toThrowError('Album not found!');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingAlbumId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});
