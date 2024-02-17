require("express-async-errors");
const express = require("express");
const friendshipRouter = require("./routes/friendshipRoutes");
const fileTypeRouter = require("./routes/fileTypeRoutes");
const albumRouter = require("./routes/albumRoutes");
const postRouter = require("./routes/postRoutes");
const albumItemRouter = require("./routes/albumItemRoutes");
const reactionsTypeRouter = require("./routes/reactionsTypeRoutes");
const reactionsRouter = require("./routes/reactionsRoutes");
const commentsRouter = require("./routes/commentsRoutes");
const errorHandler = require("./middlewares/error");
const configureUserContainer = require("./features/userContainer");
const configureTargetPublicContainer = require("./features/targetPublicContainer");

const app = express();
const { userRoutes } = configureUserContainer();
const { targetPublicRoutes } = configureTargetPublicContainer();

app.use(express.json());
app.use('/reactions', reactionsRouter);
app.use('/users', userRoutes);
app.use('/friendship',friendshipRouter);
app.use('/file_type', fileTypeRouter);
app.use('/target_public', targetPublicRoutes);
app.use('/album', albumRouter);
app.use('/post', postRouter);
app.use('/album_item', albumItemRouter);
app.use('/reactions_type', reactionsTypeRouter);
app.use('/comments', commentsRouter);
app.use('/', userRoutes);

app.use(errorHandler);

app.listen(8080, () => { 
  console.log("Server running at port 8080: http://localhost:8080");
});
