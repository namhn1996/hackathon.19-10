import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import categoryRoute from "./routes/categories.routes";
import questionsRoute from "./routes/questions.routes";

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api/v1/categories", categoryRoute);
server.use("/api/v1/questions",questionsRoute)

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
