import connectDB from "@/config/database";
import resetPasswordModel from "@/models/resetPassword";
import { NextResponse } from "next/server";

// Utility function to set CORS headers
const setCORSHeaders = (response: NextResponse) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, GET, DELETE, PUT, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
};

// POST: Verify OTP and check expiration
export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json(); // Extract email and OTP from request body

    // Basic validation for required fields
    if (!email || !otp) {
      return setCORSHeaders(
        NextResponse.json(
          { message: "Email and OTP are required" },
          { status: 400 }
        )
      );
    }

    await connectDB();

    // Find the OTP record in the database for the provided email
    const otpRecord = await resetPasswordModel.findOne({ email, otp });

    if (!otpRecord) {
      return setCORSHeaders(
        NextResponse.json({ message: "Invalid OTP or email" }, { status: 404 })
      );
    }

    // Check if the OTP has expired
    const currentTime = new Date();
    if (currentTime > otpRecord.otpExpiration) {
      return setCORSHeaders(
        NextResponse.json({ message: "OTP has expired" }, { status: 401 })
      );
    }

    // If OTP is valid and not expired, proceed with password reset (or other logic)
    const response = NextResponse.json(
      { message: "OTP is valid, proceed with password reset" },
      { status: 200 }
    );
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Error in verifying OTP:", error);

    // Internal server error handling
    const response = NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    setCORSHeaders(response);
    return response;
  }
}
