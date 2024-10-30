import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/users";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", router);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});