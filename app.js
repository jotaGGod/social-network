require("express-async-errors");

/* essa lib permite que você use funções assíncronas diretamente 
facilitando o tratamento de erros assíncronos
*/
const express = require("express");
const userRouter = require("./routes/userRoutes");
const friendshipRouter = require("./routes/friendshipRoutes");
const fileTypeRouter = require("./routes/fileTypeRoutes");
const targetPublicRouter = require("./routes/targetPublicRoutes");
const albumRouter = require("./routes/albumRoutes");
const errorHandler = require("./middlewares/error");
const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/friendship', friendshipRouter);
app.use('/file_type', fileTypeRouter);
app.use('/target_public', targetPublicRouter);
app.use('/album', albumRouter);
app.use(errorHandler);


// server
app.listen(8080, () => { 
  console.log("Server running at port 8080: http://localhost:8080");
});
