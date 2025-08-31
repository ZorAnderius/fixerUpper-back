import express from "express";
import morgan from "./morganConfig.js";

const app = express();

app.use(morgan("tiny-colored"));

export default app;