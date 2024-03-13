const AlbumItemService = require('../../src/services/albumItemService');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn()
};
describe('AlbumItemService', () => {
    let albumItemService;
    beforeEach(() => {
        albumItemService = new AlbumItemService(mockRepository);
    });
    afterEach(() => {
        jest.clearAllMocks(); //garante que seja resetado os registros apos finalizar cada teste
    });
    describe('createAlbumItem', () => {
        it('should create an album item', async () => {
            const createdAlbumItem = {
                "created_at": "2024-03-13T14:05:40.422Z",
                "updated_at": "2024-03-13T14:05:40.422Z",
                "is_active": true,
                "id": 17,
                "post_id": 1,
                "album_id": 2
            };
            mockRepository.create.mockResolvedValueOnce(createdAlbumItem);
            const albumItem = await albumItemService.createAlbumItem(1, 2);
            expect(mockRepository.create).toHaveBeenCalledWith(1, 2);
            expect(albumItem).toEqual(createdAlbumItem);
        });
    });
    describe('createAlbumItem', () => {
        it('shouldnt create an album item', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating album item'));
            await expect(albumItemService.createAlbumItem(1, 2)).rejects.toThrowError('Error while creating album item');
            expect(mockRepository.create).toHaveBeenCalledWith(1, 2);
        });
    });
    describe('getAllAlbumItem', () => {
        it('should get all album items', async () => {
            mockRepository.getAll.mockResolvedValueOnce([{  }]);
            const result = await albumItemService.getAllAlbumItem();
            expect(mockRepository.getAll).toHaveBeenCalled();
            expect(result).toEqual([{  }]);
        });
    });
    describe('deleteAlbumItem', () => {
        it('should delete an existing album item', async () => {
            const existingItemId = 'existing_id';
            mockRepository.getById.mockResolvedValueOnce({  });
            await albumItemService.deleteAlbumItem(existingItemId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingItemId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingItemId);
        });
        it('should throw an error when trying to delete a non-existing album item', async () => {
            const nonExistingItemId = 'non_existing_id';
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(albumItemService.deleteAlbumItem(nonExistingItemId)).rejects.toThrowError('Album item not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingItemId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});
