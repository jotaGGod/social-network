const { jest } = require("jest");
const UserService = require("../../src/services/userServices");
const ApiError = require("../../src/utils/ApiError");

// Defina uma fábrica para criar um mock da UserRepository
const mockUserRepository = () => ({
    create: jest.fn(),
    getByEmail: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getFeedNews: jest.fn(),
    getPostStatistics: jest.fn()
});

describe('UserService', () => {
    let userService;
    let userRepositoryMock;

    beforeEach(() => {
        // Crie um novo mock da UserRepository antes de cada teste
        userRepositoryMock = mockUserRepository();
        userService = new UserService(userRepositoryMock, /* insira o seu hashService mock aqui, se necessário */);
    });

    test('create - email já existe', async () => {
        // Simule que o getByEmail retorne true
        userRepositoryMock.getByEmail.mockResolvedValue(true);

        // Teste se o método create lança uma ApiError com a mensagem apropriada
        await expect(userService.create('Nome', 'email@test.com', 'senha')).rejects.toThrow(ApiError);

        // Verifique se o getByEmail foi chamado com o email correto
        expect(userRepositoryMock.getByEmail).toHaveBeenCalledWith('email@test.com');
    });

    // Adicione outros testes conforme necessário
});
