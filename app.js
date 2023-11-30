require("express-async-errors");
const express = require("express");
const userRouter = require("./routes/userRoutes");
const friendshipRouter = require("./routes/friendshipRoutes");
const fileTypeRouter = require("./routes/fileTypeRoutes");
const targetPublicRouter = require("./routes/targetPublicRoutes");
const albumRouter = require("./routes/albumRoutes");
const postRouter = require("./routes/postRoutes");
const albumItemRouter = require("./routes/albumItemRoutes");
const reactionsTypeRouter = require("./routes/reactionsTypeRoutes");
const reactionsRouter = require("./routes/reactionsRoutes");
const commentsRouter = require("./routes/commentsRoutes");
const errorHandler = require("./middlewares/error");
const app = express();

app.use(express.json());
app.use('/reactions', reactionsRouter);
app.use('/users', userRouter);
app.use('/friendship',friendshipRouter);
app.use('/file_type', fileTypeRouter);
app.use('/target_public', targetPublicRouter);
app.use('/album', albumRouter);
app.use('/post', postRouter);
app.use('/album_item', albumItemRouter);
app.use('/reactions_type', reactionsTypeRouter);
app.use('/comments', commentsRouter);
app.use('/', userRouter);

app.use(errorHandler);

app.listen(8080, () => { 
  console.log("Server running at port 8080: http://localhost:8080");
});
