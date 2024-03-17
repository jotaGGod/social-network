const CommentsService = require('../src/services/commentService');
const httpStatus = require('../src/utils/statusCodes');
const ApiError = require("../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};
describe('CommentsService', () => {
    let commentsService;
    beforeEach(() => {
        commentsService = new CommentsService(mockRepository);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createComment', () => {
        it('should create a comment', async () => {
            const createdComment = {
                "id": 2,
                "description": "Essa montanha russa é braba",
                "user_id": 5,
                "post_id": 2,
                "is_active": true
            };
            mockRepository.create.mockResolvedValueOnce(createdComment);
            const comment = await commentsService.create("Essa montanha russa é braba", 5, 2);
            expect(mockRepository.create).toHaveBeenCalledWith("Essa montanha russa é braba", 5, 2);
            expect(comment).toEqual(createdComment);
        });
    });
    describe('createComment', () => {
        it('shouldnt create a comment', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating comment'));
            await expect(commentsService.create("Essa montanha russa é braba", 5, 2)).rejects.toThrowError('Error while creating comment');
            expect(mockRepository.create).toHaveBeenCalledWith("Essa montanha russa é braba", 5, 2);
        });
    });
    describe('getAllComments', () => {
        it('should get all comments', async () => {
            const commentValues = [
                {
                    "id": 2,
                    "description": "Essa montanha russa é braba",
                    "user_id": 5,
                    "post_id": 2,
                    "is_active": true
                },
                {
                    "id": 3,
                    "description": "Já teve vários acidentes com jacaré aí",
                    "user_id": 4,
                    "post_id": 3,
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(commentValues);
            const result = await commentsService.getAllComments();
            expect(result).toEqual(commentValues);
        });
    });
    describe('getCommentById', () => {
        it('should get a comment by ID', async () => {
            const commentValue = {
                "id": 3,
                "description": "Já teve vários acidentes com jacaré aí",
                "user_id": 4,
                "post_id": 3,
                "is_active": true
            };
            const commentId = 1;
            mockRepository.getById.mockResolvedValueOnce(commentValue);
            const result = await commentsService.getCommentById(commentId);
            expect(result).toEqual(commentValue);
        });
        it('should throw an error when comment not found by ID', async () => {
            const commentId = 125; // Non-existing comment ID
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(commentsService.getCommentById(commentId)).rejects.toThrowError('Comment not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(commentId);
        });
    });
    describe('updateComment', () => {
        it('should update an existing comment', async () => {
            const existingCommentId = 1;
            const updatedDescription = "Andando por New York";
            const updatedUserId = 2;
            const updatedPostId = 3;
            mockRepository.getById.mockResolvedValueOnce({ id: existingCommentId });
            await commentsService.updateComment(existingCommentId, updatedDescription, updatedUserId, updatedPostId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingCommentId);
            expect(mockRepository.update).toHaveBeenCalledWith(existingCommentId, updatedDescription, updatedUserId, updatedPostId);
        });
        it('should throw an error when trying to update a non-existing comment', async () => {
            const nonExistingCommentId = 134;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(commentsService.updateComment(nonExistingCommentId, "Andando por New York", 2, 3)).rejects.toThrowError('Comment not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingCommentId);
            expect(mockRepository.update).not.toHaveBeenCalled();
        });
    });
    describe('deleteComment', () => {
        it('should delete an existing comment', async () => {
            const existingCommentId = 1;
            mockRepository.getById.mockResolvedValueOnce({ id: existingCommentId });
            await commentsService.deleteComment(existingCommentId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingCommentId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingCommentId);
        });
        it('should throw an error when trying to delete a non-existing comment', async () => {
            const nonExistingCommentId = 222; // Non-existing comment ID
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(commentsService.deleteComment(nonExistingCommentId)).rejects.toThrowError('Comment not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingCommentId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});
