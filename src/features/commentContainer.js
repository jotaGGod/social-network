const CommentRepositoryImplementation = require("../repositories/implementation/commentRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const CommentRepository = require("../repositories/commentRepository");
const CommentService = require("../services/commentService");
const CommentController = require("../controller/commentController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createCommentRoutes = require("../routes/commentRoutes");
const { ICommentRepository } = require("../repositories/interfaces/commentRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

/**
 * Configures the comment container.
 * @returns {object} The configured comment routes.
 */
function configureCommentContainer() {
    // Instantiate the comment repository implementation
    const commentRepositoryImplementation = new CommentRepositoryImplementation();

    // Create the comment repository instance
    const commentRepository = new CommentRepository(commentRepositoryImplementation, ICommentRepository);

    // Instantiate the token repository implementation
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();

    // Create the token repository instance
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);

    // Create the token service instance
    const tokenService = new TokenService(tokenRepository);

    // Create the comment service instance
    const commentService = new CommentService(commentRepository);

    // Create the comment controller instance
    const commentController = new CommentController(commentService, tokenService);

    // Create the comment routes
    const commentRoutes = createCommentRoutes(commentController);

    return { commentRoutes };
}

module.exports = configureCommentContainer;
