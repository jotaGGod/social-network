const PostRepositoryImplementation = require("../repositories/mySql/postRepositoryImplementation");
const PostRepository = require("../repositories/postRepository");
const PostService = require("../services/postService");
const PostController = require("../controller/postController");
const createPostRoutes = require("../routes/postRoutes");


function configurePostContainer() {
    const postRepositoryImplementation = new PostRepositoryImplementation();
    const postRepository = new PostRepository(postRepositoryImplementation);
    const postService = new PostService(postRepository);
    const postController = new PostController(postService);
    const postRoutes = createPostRoutes(postController);
    return { postRoutes }
}

module.exports = configurePostContainer;
