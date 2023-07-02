import express from "express";
import dotenv from "dotenv";
import { connect } from "./utils/connect.js";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js"

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connect();
  console.log(`server is running in port ${PORT}`);
});
