import mongoose, { Schema } from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = await mongoose.connect("mongodb://127.0.0.1:27017/nextjs");
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;
