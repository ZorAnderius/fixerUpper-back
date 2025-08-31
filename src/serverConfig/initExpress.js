import express from "express";
import cors from 'cors';
import morgan from "./config/morganConfig.js";
import corsOptions from "./config/corsConfig.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("tiny-colored"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({
  type: ['application/json'],
}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static('public'));

export default app;