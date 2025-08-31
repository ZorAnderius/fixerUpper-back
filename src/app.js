import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import app from "./serverConfig/initExpress.js";

app.use(notFoundHandler);

app.use(errorHandler);

export default app;