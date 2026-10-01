import mongoose from "mongoose";
import env from "./env.js";

export default async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB error:", error);
  });

  await mongoose.connect(env.MONGO_URI);
}