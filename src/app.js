import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import cartsRouter from "./routes/cartsRouter.js";
import ordersRouter from "./routes/ordersRouter.js";
import otherRoutes from "./routes/otherRoutes.js";
import productsRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import app from "./serverConfig/initExpress.js";

app.use('/api/users', userRouter);

app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter);

app.use('/api/orders', ordersRouter);

app.use('/api', otherRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;