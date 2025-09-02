import express from "express";
import cors from 'cors';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "./config/morganConfig.js";
import corsOptions from "./config/corsConfig.js";
import helmetOption from "./config/helmetConfig.js";
import csrfHeaderCheck from "./config/csrfHeaderCheck.js";
import sanitizeRequest from "../middlewares/security/sanitizeRequest.js";

const app = express();

app.use(morgan("tiny-colored"));
app.use(cors(corsOptions));
app.use(helmet(helmetOption));
app.use(csrfHeaderCheck);
app.use(cookieParser());
app.use(express.json({
  type: ['application/json'],
}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static('public'));

app.use(sanitizeRequest());

export default app;