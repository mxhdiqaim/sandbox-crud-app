import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import users from "./src/routes/users.js";
import auth from "./src/routes/auth.js";
import { connectDB } from "./src/configs/db.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json({ limit: "50mb" }));

dotenv.config();

// disable cors
app.use(cors());

// Define Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use("/upload", express.static("upload"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);
