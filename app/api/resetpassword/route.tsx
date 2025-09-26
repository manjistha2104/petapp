import connectDB from "@/config/database";
import resetPasswordModel from "@/models/resetPassword";
import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

// Utility function to generate a 4-digit OTP
function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Utility function to send email via SMTP
async function sendEmail(to: string, otp: string) {
  if (!to) {
    throw new Error("No recipient email address provided");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: "causeforpaws24@gmail.com", // Your email
      pass: "hcvrbeapiwvybopp", // Your email password
    },
  });

  const mailOptions = {
    from: "causeforpaws24@gmail.com", // Sender address
    to: to, // Recipient email address
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 1 hour.`,
  };

  // Logging the mail options to debug
  console.log("Sending email to:", mailOptions.to);

  return transporter.sendMail(mailOptions);
}

// POST: Generate OTP and send email (Password Reset Request)
export async function POST(request: Request) {
  try {
    const { email } = await request.json(); // Extract email from request body

    // Log email for debugging
    console.log("Email received:", email);

    // Basic validation for required fields
    if (!email) {
      return setCORSHeaders(
        NextResponse.json({ message: "Email is required" }, { status: 400 })
      );
    }

    await connectDB();

    // Generate a 4-digit OTP
    const otp = generateOTP();

    // Set OTP expiration time (1 hour from now)
    const otpExpiration = new Date();
    otpExpiration.setHours(otpExpiration.getHours() + 1);

    // Save the email and OTP to the database
    await resetPasswordModel.create({
      email,
      otp,
      otpExpiration,
    });

    // Send the OTP to the user's email
    await sendEmail(email, otp); // Pass the email as the 'to' parameter

    // Successful response
    const response = NextResponse.json(
      { message: "OTP sent to your email" },
      { status: 200 }
    );
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Error in reset password:", error);

    // Internal server error handling
    const response = NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    setCORSHeaders(response);
    return response;
  }
}
