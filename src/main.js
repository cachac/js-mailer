import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(errorHandler);

process.on("uncaughtException", (err) => {
  console.error("AHHHHHHHHHHHHHHHHHHHHHHHHHH! :", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("ERRRRRRRRRRRRRRRRRRRRRRRRRR! :", err);
  process.exit(1);
});

const router = express.Router();

router.post("/", (req, res) => {
  const input = req.body;

  console.log("input", input);

  res.send("ok");
});

app.use(router);

app.listen(3020, () => {
  console.log(`Listening to port ${3020} - Express JS | REST API`);
});
