const UserService = require('../src/services/userServices');
const httpStatus = require('../src/utils/statusCodes');
const ApiError = require("../src/utils/ApiError");

const mockUserRepository = {
    getByEmail: jest.fn(),
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getFeedNews: jest.fn(),
    getPostStatistics: jest.fn(),
};
const mockHashService = {
    hash: jest.fn(),
};
let userService;
let inputUser;
describe('UserService', () => {
    beforeEach(() => {
        userService = new UserService(mockUserRepository, mockHashService);
        inputUser = {
            "full_name": "pedro",
            "email": "pedro2002@hotmail.com",
            "password": "1234"
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('create', () => {
        it('should create a user', async () => {
            const expectedUser = {
                "created_at": "2024-03-13T21:06:22.629Z",
                "updated_at": "2024-03-13T21:06:22.629Z",
                "id": 32,
                "full_name": "pedro",
                "email": "pedro2002@hotmail.com"
            };
            mockUserRepository.getByEmail.mockResolvedValueOnce(false);
            mockHashService.hash.mockResolvedValueOnce("$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.10");
            mockUserRepository.create.mockResolvedValueOnce(expectedUser);
            const user = await userService.create(inputUser.full_name, inputUser.email, inputUser.password);
            expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(inputUser.email);
            expect(mockHashService.hash).toHaveBeenCalledWith(inputUser.password);
            expect(mockUserRepository.create).toHaveBeenCalledWith(inputUser.full_name, inputUser.email, "$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.10");
            expect(user).toEqual(expectedUser);
        });
        it('should throw an error if email is already taken', async () => {
            mockUserRepository.getByEmail.mockResolvedValueOnce(true);
            expect(userService.create(inputUser.full_name, inputUser.email, inputUser.password)).rejects.toThrow(new ApiError(httpStatus.CONFLICT,'Email already taken'));
            expect(mockUserRepository.create).not.toHaveBeenCalled();
        });
    });
    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const users = [{
                "id": 3,
                "full_name": "Fernanda Oliveira",
                "email": "fernanda@gmail.com"
            }, {
                "id": 4,
                "full_name": "Lucas Silva",
                "email": "lucas@gmail.com"
            }];
            mockUserRepository.getAll.mockResolvedValueOnce(users);
            const allUsers = await userService.getAllUsers();
            expect(mockUserRepository.getAll).toHaveBeenCalled();
            expect(allUsers).toEqual(users);
        });
        it('should throw an error if no users found', async () => {
            mockUserRepository.getAll.mockResolvedValueOnce(null);
            expect(userService.getAllUsers()).rejects.toThrow(ApiError);
        });
    });
    describe('getUserById', () => {
        it('should return user by id', async () => {
            const expectUserValue = {
                "id": 3,
                "full_name": "Fernanda Oliveira",
                "email": "fernanda@gmail.com"
            }
            const userId = 3
            mockUserRepository.getById.mockResolvedValueOnce(expectUserValue);
            const calledMethodGetById = await userService.getUserById(userId);
            expect(calledMethodGetById).toEqual(expectUserValue);
        });
        it('should return user by id', async () => {
            const userId = 123
            mockUserRepository.getById.mockResolvedValueOnce(null);
            expect(userService.getUserById(userId)).rejects.toThrowError('User not found');
            expect(mockUserRepository.getById).toHaveBeenCalledWith(userId);
        });
    });
    describe('updateUser', () => {
        it('should return updating user', async () => {
            const user = {
                "id": 3,
                "full_name": "Fernanda Oliveira",
                "email": "fernanda@gmail.com"
            };
            const newUser = {
                "full_name": "Roberto",
                "email": "Roberto@gmail.com"
            };
            mockUserRepository.getById.mockResolvedValueOnce(user);
            mockUserRepository.getByEmail.mockResolvedValueOnce(false);
            await userService.updateUserById(user.id, newUser.full_name, newUser.email);
            expect(mockUserRepository.update).toHaveBeenCalledWith(user.id, newUser.full_name, newUser.email);
            expect(mockUserRepository.getById).toHaveBeenCalledWith(user.id);
            expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(newUser.email);
        });
        it('should throw an error if email is already taken', async () => {
            const id = 1;
            const full_name = "Roberto";
            const email = "Roberto@gmail.com";
            mockUserRepository.getById.mockResolvedValueOnce({id: id});
            mockUserRepository.getByEmail.mockResolvedValueOnce(true);
            expect(userService.updateUserById(id, full_name, email)).rejects.toThrow(new ApiError(httpStatus.CONFLICT, 'Email already taken'));
        });
        it('should throw an error if user does not exist', async () => {
            const id = 1;
            const full_name = "Roberto";
            const email = "Roberto@gmail.com";
            mockUserRepository.getById.mockResolvedValueOnce(null);
            await expect(userService.updateUserById(id, full_name, email)).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'User not found'));
            expect(mockUserRepository.getById).toHaveBeenCalledWith(id);
        });
    });
    describe('deleteUser', () => {
        it('should deleting user', async () => {
            const id = 1;
            mockUserRepository.getById.mockResolvedValueOnce(id);
            await userService.deleteUser(id);
            expect(mockUserRepository.getById).toHaveBeenCalledWith(id);
            expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
        });
        it('should throw an error when trying to delete a non-existing user', async () => {
            const nonExistingUserId = 222;
            mockUserRepository.getById.mockResolvedValueOnce(null);
            expect(userService.deleteUser(nonExistingUserId)).rejects.toThrowError(new ApiError(httpStatus.NOT_FOUND, 'User not found'));
            expect(mockUserRepository.getById).toHaveBeenCalledWith(nonExistingUserId);
            expect(mockUserRepository.delete).not.toHaveBeenCalled();
        });
    });
    describe('getFeedNews', () => {
        it('should getting feed News', async () =>{
            const userFeedId = 1;
            mockUserRepository.getFeedNews.mockResolvedValueOnce(userFeedId);
            userService.getFeedNews(userFeedId);
            expect(mockUserRepository.getFeedNews).toHaveBeenCalledWith(userFeedId);
        });
    });
    describe('getPostStatistics', () => {
        it('should get Post Statistics', async () => {
            const mockStatistics = { };
            mockUserRepository.getPostStatistics.mockResolvedValueOnce(mockStatistics);
            userService.getPostStatistics();
            expect(mockUserRepository.getPostStatistics).toHaveBeenCalledWith();
        });
        it('shouldnt get Post Statistics', async () => {
            const mockStatistics = true;
            mockUserRepository.getPostStatistics.mockResolvedValueOnce(mockStatistics);
            userService.getPostStatistics();
            expect(userService.getPostStatistics(mockStatistics)).rejects.toThrowError(new ApiError(httpStatus.NOT_FOUND, 'No post statistics was found!'));
            expect(mockUserRepository.getPostStatistics).toHaveBeenCalledWith();
        });
    });
});
