const CommentRepositoryImplementation = require("../repositories/mySql/commentRepositoryImplementation");
const CommentRepository = require("../repositories/commentRepository");
const CommentService = require("../services/commentService");
const CommentController = require("../controller/commentController");
const createCommentRoutes = require("../routes/commentRoutes");
const {ICommentRepository} = require("../repositories/interfaces/commentRepositoryAbstract");


function configureCommentContainer() {
    const commentRepositoryImplementation = new CommentRepositoryImplementation();
    const commentRepository = new CommentRepository(commentRepositoryImplementation, contract=ICommentRepository);
    const commentService = new CommentService(commentRepository);
    const commentController = new CommentController(commentService);
    const commentRoutes = createCommentRoutes(commentController);
    return { commentRoutes }
}

module.exports = configureCommentContainer;
