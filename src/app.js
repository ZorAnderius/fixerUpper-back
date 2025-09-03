import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import productsRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import app from "./serverConfig/initExpress.js";

app.use('/api/users', userRouter);

app.use('/api/products', productsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;