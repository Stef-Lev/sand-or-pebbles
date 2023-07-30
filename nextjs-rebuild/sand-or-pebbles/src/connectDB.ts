import mongoose from "mongoose";
import { IDBConnection } from "./types";

const connectDB = async (): Promise<IDBConnection> => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGODB_URI);

  return {
    connection: mongoose.connection,
    async closeConnection() {
      await mongoose.connection.close();
    },
  };
};

export default connectDB;
