import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import route from "./routes/userRoute.js";

const app = express();
dotenv.config();

// midddlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

// calling routes

app.use("/api", route);

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URI;

mongoose
  .connect(URL)
  .then(() => {
    console.log(`DB Connected Successfully `);

    app.listen(PORT, () => {
      console.log(`Server is running successfully @ ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
