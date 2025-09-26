import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
  {
    privacyPolicy: { type: String, required: false },
    termsConditions: { type: String, required: false },
    refundPolicy: { type: String, required: false },
  },
  { timestamps: true } // ✅ This adds `createdAt` and `updatedAt`
);

export default mongoose.models.Page || mongoose.model("Page", PageSchema);
