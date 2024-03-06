const PostRepositoryImplementation = require("../repositories/mySql/postRepositoryImplementation");
const PostRepository = require("../repositories/postRepository");
const PostService = require("../services/postService");
const PostController = require("../controller/postController");
const createPostRoutes = require("../routes/postRoutes");
const {IPostRepository} = require("../repositories/Interfaces/postRepositoryAbstract");


function configurePostContainer() {
    const postRepositoryImplementation = new PostRepositoryImplementation();
    const postRepository = new PostRepository(postRepositoryImplementation, contract=IPostRepository);
    const postService = new PostService(postRepository);
    const postController = new PostController(postService);
    const postRoutes = createPostRoutes(postController);
    return { postRoutes }
}

module.exports = configurePostContainer;
