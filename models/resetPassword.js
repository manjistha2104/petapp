import mongoose, { Schema } from "mongoose";

const resetPasswordSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpiration: { type: Date, required: true },
});

const resetPasswordModel =
  mongoose.models.resetPassword ||
  mongoose.model("resetPassword", resetPasswordSchema);

export default resetPasswordModel;
