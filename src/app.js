import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import userRouter from "./routes/userRouter.js";
import app from "./serverConfig/initExpress.js";

app.use('/api/users', userRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;