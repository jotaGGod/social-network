require("express-async-errors");
const express = require("express");
const errorHandler = require("./middlewares/error");
const configureUserContainer = require("./features/userContainer");
const configureTargetPublicContainer = require("./features/targetPublicContainer");
const configureReactionTypeContainer = require("./features/reactionTypeContainer");
const configureReactionContainer = require("./features/reactionContainer");
const configurePostContainer = require("./features/postContainer");
const configureFriendshipContainer = require("./features/friendshipContainer");
const configureFileTypeContainer = require("./features/fileTypeContainer");
const configureCommentContainer = require("./features/commentContainer");
const configureAlbumItemContainer = require("./features/albumItemContainer");
const configureAlbumContainer = require("./features/albumContainer");

const app = express();
const { userRoutes } = configureUserContainer();
const { targetPublicRoutes } = configureTargetPublicContainer();
const { reactionTypeRoutes } = configureReactionTypeContainer();
const { reactionRoutes } = configureReactionContainer();
const { postRoutes } = configurePostContainer();
const { friendshipRoutes } = configureFriendshipContainer();
const { fileTypeRoutes } = configureFileTypeContainer();
const { commentRoutes } = configureCommentContainer();
const { albumItemRoutes } = configureAlbumItemContainer();
const { albumRoutes } = configureAlbumContainer();

app.use(express.json());
app.use('/reactions', reactionRoutes);
app.use('/users', userRoutes);
app.use('/friendship',friendshipRoutes);
app.use('/file_type', fileTypeRoutes);
app.use('/target_public', targetPublicRoutes);
app.use('/album', albumRoutes);
app.use('/post', postRoutes);
app.use('/album_item', albumItemRoutes);
app.use('/reactions_type', reactionTypeRoutes);
app.use('/comment', commentRoutes);
app.use('/', userRoutes);

app.use(errorHandler);

app.listen(8080, () => { 
  console.log("Server running at port 8080: http://localhost:8080");
});
