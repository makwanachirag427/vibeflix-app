import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("Database connected successfully with", conn.connection.host);
  } catch (error) {
    console.log("Error while connection with database ", error.message);
    process.exit(1);
  }
};
