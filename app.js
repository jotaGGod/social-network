require("express-async-errors");
const express = require("express");
const friendshipRouter = require("./routes/friendshipRoutes");
const fileTypeRouter = require("./routes/fileTypeRoutes");
const albumRouter = require("./routes/albumRoutes");
const albumItemRouter = require("./routes/albumItemRoutes");
const commentsRouter = require("./routes/commentsRoutes");
const errorHandler = require("./middlewares/error");
const configureUserContainer = require("./features/userContainer");
const configureTargetPublicContainer = require("./features/targetPublicContainer");
const configureReactionTypeContainer = require("./features/reactionTypeContainer");
const configureReactionContainer = require("./features/reactionContainer");
const configurePostContainer = require("./features/postContainer");
const configureFriendshipContainer = require("./features/friendshipContainer");

const app = express();
const { userRoutes } = configureUserContainer();
const { targetPublicRoutes } = configureTargetPublicContainer();
const { reactionTypeRoutes } = configureReactionTypeContainer();
const { reactionRoutes } = configureReactionContainer();
const { postRoutes } = configurePostContainer();
const { friendshipRoutes } = configureFriendshipContainer();

app.use(express.json());
app.use('/reactions', reactionRoutes);
app.use('/users', userRoutes);
app.use('/friendship',friendshipRoutes);
app.use('/file_type', fileTypeRouter);
app.use('/target_public', targetPublicRoutes);
app.use('/album', albumRouter);
app.use('/post', postRoutes);
app.use('/album_item', albumItemRouter);
app.use('/reactions_type', reactionTypeRoutes);
app.use('/comments', commentsRouter);
app.use('/', userRoutes);

app.use(errorHandler);

app.listen(8080, () => { 
  console.log("Server running at port 8080: http://localhost:8080");
});
