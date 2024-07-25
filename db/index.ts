import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI || "");

    connection.isConnected = db.connections[0].readyState;
    console.log("DB is connected");
  } catch (error) {
    console.log("DB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
