import express from "express";
import dotenv from "dotenv";
import { apiRouter } from "./routes/apiRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {corsOptions} from "./utils/corsConfig.js";
import corsMiddleWare from "./middleware/coresMiddleWare.js";


//Express Stuff
const app = express();
app.use(express.json());


//Cookie Stuff
app.use(cookieParser());


//.env Stuff
dotenv.config();

//Cors Stuff
app.use(cors(corsOptions));
app.use(corsMiddleWare);

//Routes
app.use("/api", apiRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server Running on: http://localhost:${process.env.SERVER_PORT}/\n\n\n`
  );
});
