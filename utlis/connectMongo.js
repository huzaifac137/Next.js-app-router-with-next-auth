import mongoose, { Schema } from "mongoose";

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect("mongodb://127.0.0.1:27017"); // replace with your mongodb string
    console.log("CONNECTED TO DB!");
  } catch (error) {
    console.log("ERROR", error);
  }
};

export default connectToDB;
