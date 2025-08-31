import express from "express";
import cors from 'cors';
import morgan from "./config/morganConfig.js";
import corsOptions from "./config/corsConfig.js";

const app = express();

app.use(morgan("tiny-colored"));
app.use(cors(corsOptions));

export default app;