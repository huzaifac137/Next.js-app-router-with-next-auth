import mongoose, { Schema, models } from "mongoose";

const userSChema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const productModal = models.user || mongoose.model("user", userSChema);

export default productModal;
