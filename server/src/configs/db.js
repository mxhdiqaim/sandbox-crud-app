import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_connection = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(db_connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
