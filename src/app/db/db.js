import mongoose from "mongoose";

export const createConnection = async () => {
  try {
    console.log("server connected to db",process.env.DB_URL);
    return await mongoose.connect(process.env.DB_URL);
  } catch {
    throw Error("something Went Wrong");
  }
};
